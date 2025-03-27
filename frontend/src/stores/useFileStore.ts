import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { CanvasFile, FileVersion } from '@/systems/file-system/type';
import { IndexedDBStorage } from '@/systems/file-system/core/storage';

interface FileState {
  currentFile: CanvasFile | null;
  recentFiles: CanvasFile[];
  storage: IndexedDBStorage;
  autoSaveInterval?: NodeJS.Timeout;
    
  // 核心文件操作
  createFile: (name: string) => Promise<CanvasFile>; // 创建文件
  loadFile: (id: string) => Promise<void>; // 加载文件
  saveCurrentFile: (comment?: string) => Promise<void>; // 保存当前文件
  closeCurrentFile: () => void; // 关闭当前文件

  // 最近文件管理
  addToRecentFiles: (file: CanvasFile) => void; // 添加到最近文件
  clearRecentFiles: () => void; // 清除最近文件
  
  // 版本控制
  revertToVersion: (versionHash: string) => Promise<void>; // 回退到指定版本
  
  // 自动保存
  startAutoSave: (interval?: number) => void; // 启动自动保存
  stopAutoSave: () => void; // 停止自动保存
}

export const useFileStore = create<FileState>()(
  immer((set, get) => ({
    currentFile: null,
    recentFiles: [],
    storage: new IndexedDBStorage(),

    createFile: async (name) => {
      const newFile: CanvasFile = {
        id: generateULID(),
        versionSchema: 'v1.0',
        meta: {
          name,
          created: new Date().toISOString(),
          lastModified: new Date().toISOString(),
          tags: [],
          dependencies: {
            toolVersion: process.env.APP_VERSION,
            plugins: []
          },
          permissions: {
            visibility: 'private',
            editable: true
          }
        },
        snapshot: { nodes: [], edges: [] },
        versions: [],
        extensions: {}
      };
    
      await get().storage.save(newFile);
      set((state) => {
        state.currentFile = newFile;
        state.recentFiles = [newFile, ...state.recentFiles].slice(0, 10); // 保留最近10个
      });
      return newFile;
    },
    
    loadFile: async (id) => {
      try {
        const file = await get().storage.load(id);
          
        // 更新画布状态
        useFlowStore.setState({
          nodes: file.snapshot.nodes,
          edges: file.snapshot.edges
        });
          
        // 更新训练状态
        if (file.snapshot.training) {
          useTrainingStore.getState().loadTrainingSnapshot(file.snapshot.training);
        }
          
        set((state) => {
          state.currentFile = file;
          state.recentFiles = [
            file,
            ...state.recentFiles.filter(f => f.id !== id)
          ].slice(0, 10);
        });
      } catch (error) {
        console.error('文件加载失败:', error);
        throw new Error(`无法加载文件: ${(error as Error).message}`);
      }
    },

    saveCurrentFile: async (comment) => {
      const { currentFile, storage } = get();
      if (!currentFile) return;
        
      // 生成当前画布快照
      const snapshot = {
        nodes: useFlowStore.getState().nodes,
        edges: useFlowStore.getState().edges,
        modelId: useExportStore.getState().modelId,
        training: useTrainingStore.getState().currentTask
      };

      const newVersion: FileVersion = {
        hash: generateSHA256(snapshot),
        created: new Date().toISOString(),
        comment,
        changeType: 'update'
      };

      const updatedFile: CanvasFile = {
        ...currentFile,
        meta: {
          ...currentFile.meta,
          modified: newVersion.created,
          thumbnail: await generateThumbnail() // 缩略图生成函数
        },
        snapshot,
        versions: [...currentFile.versions, newVersion]
      };

      await storage.save(updatedFile);
      set((state) => {
        state.currentFile = updatedFile;
      });
    },

    closeCurrentFile: () => {
      set((state) => {
        state.currentFile = null;
      });
      useFlowStore.getState().reset();
      useTrainingStore.getState().clear();
    },
    
    addToRecentFiles: (file) => {
      set((state) => {
        state.recentFiles = [
          file,
          ...state.recentFiles.filter(f => f.id !== file.id)
        ].slice(0, 10);
      });
    },
    
    clearRecentFiles: () => {
      set({ recentFiles: [] });
    },
    
    revertToVersion: async (versionHash) => {
      const { currentFile, storage } = get();
      if (!currentFile) return;
  
      try {
        const snapshot = await storage.loadVersionSnapshot(currentFile.id, versionHash);
          
        // 更新画布状态
        useFlowStore.setState({
          nodes: snapshot.nodes,
          edges: snapshot.edges
        });
          
        // 生成新版本记录
        const newVersion: FileVersion = {
          hash: generateSHA256(snapshot),
          created: new Date().toISOString(),
          changeType: 'revert',
          comment: `恢复到版本 ${versionHash.slice(0, 6)}`
        };
  
        const updatedFile: CanvasFile = {
          ...currentFile,
          snapshot,
          versions: [...currentFile.versions, newVersion]
        };
  
        await storage.save(updatedFile);
        set({ currentFile: updatedFile });
          
      } catch (error) {
        console.error('版本恢复失败:', error);
        throw error;
      }
    },
  
    startAutoSave: (interval = 300_000) => {
      const intervalId = setInterval(() => {
        get().saveCurrentFile('自动保存');
      }, interval);
    
      set({ autoSaveInterval: intervalId });
    },
  
    stopAutoSave: () => {
      const interval = get().autoSaveInterval;
      if (interval) {
        clearInterval(interval);
        set({ autoSaveInterval: undefined });
      }
    }
  }))
);

// 自动保存初始化
if (typeof window !== 'undefined') {
    const store = useFileStore.getState();
    store.startAutoSave();
  }