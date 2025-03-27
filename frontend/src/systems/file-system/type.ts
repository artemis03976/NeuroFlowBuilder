import type { FlowNode, FlowEdge } from '@/stores/useFlowStore';


export type ISO8601 = string; // 时间格式
export type ULID = string; // 唯一标识


// 画布文件
export interface CanvasFile {
  // 核心标识
  id: ULID; // 文件ID
  versionSchema: 'v1.0'; // 结构版本
  
  // 文件元数据
  meta: FileMeta;
  // 数据层
  snapshot: CanvasSnapshot;
  versions: FileVersion[];
  
  // 扩展能力
  extensions: {
    [key: string]: unknown; // 插件扩展数据
  };
}


// 文件元数据
export interface FileMeta {
  name: string; // 文件名
  description?: string; // 文件描述
  tags: string[]; // 文件标签
  created: ISO8601; // 创建时间
  lastModified: ISO8601; // 最后修改时间
  thumbnail?: string; // 画布缩略图base64
  dependencies: {
    toolVersion: string;
    plugins: string[];
  };
  permissions: {
    visibility: 'private' | 'team' | 'public';
    editable: boolean;
  };
}


// 画布快照
export interface CanvasSnapshot {
  nodes: FlowNode[];
  edges: FlowEdge[];
  modelId?: string;
}


// 文件版本
export interface FileVersion {
  hash: string; // 内容哈希（SHA-256）
  created: ISO8601; // 创建时间
  author?: string; // 未来协作支持
  comment?: string; // 备注
  changeType?: 'create' | 'update' | 'revert'; // 变更类型
}
