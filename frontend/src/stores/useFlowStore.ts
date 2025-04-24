import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { debounce } from 'lodash-es';
import { applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { NODE_META, NODE_TYPE } from "@node-configs";
import type { NodeChange, EdgeChange } from '@xyflow/react';


// Undo history buffer
const MAX_HISTORY_STEPS = 20;
// Debounce setting
const DEBOUNCE_TIME = 500;

// Basic Node type
export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: Record<string, unknown>;
}
  
// Basic Edge type
export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  [key: string]: unknown;
}
  
export interface FlowStore {
  nodes: FlowNode[];
  edges: FlowEdge[];
  selectedElementId: string | null;
  history: { nodes: FlowNode[]; edges: FlowEdge[] }[];
  currentHistoryIndex: number;
  setSelectedElement: (id: string | null) => void;
  onNodesChange: (changes: NodeChange<FlowNode>[]) => void;
  onEdgesChange: (changes: EdgeChange<FlowEdge>[]) => void;
  updateNodeConfig: (nodeId: string, newConfig: Record<string, unknown>) => void;
  addNode: (nodeData: Omit<FlowNode, 'id'>) => void;
  deleteNode: (nodeId: string) => void;
  addEdge: (connection: Omit<FlowEdge, 'id'>) => void;
  deleteEdge: (edgeId: string) => void;
  addHistory: () => void;
  undo: () => void;
  redo: () => void;
}

// Initial Nodes data
const initialNodes: FlowNode[] = [
  {
    id: 'node-1',
    type: NODE_TYPE.INPUT,
    position: { x: 0, y: 0 },
    data: {
      ...NODE_META[NODE_TYPE.INPUT].parameters,
      label: NODE_META[NODE_TYPE.INPUT].label
    },
  },
  {
    id: 'node-2',
    type: NODE_TYPE.LINEAR,
    position: { x: 0, y: 100 },
    data: {
      ...NODE_META[NODE_TYPE.LINEAR].parameters,
      label: NODE_META[NODE_TYPE.LINEAR].label
    },
  },
  {
    id: 'node-3',
    type: NODE_TYPE.LINEAR,
    position: { x: 0, y: 200 },
    data: {
      ...NODE_META[NODE_TYPE.LINEAR].parameters,
      label: NODE_META[NODE_TYPE.LINEAR].label
    },
  },
  {
    id: 'node-4',
    type: NODE_TYPE.OUTPUT,
    position: { x: 0, y: 300 },
    data: {
      ...NODE_META[NODE_TYPE.OUTPUT].parameters,
      label: NODE_META[NODE_TYPE.OUTPUT].label
    },
  },
];

// Initial Edges data
const initialEdges: FlowEdge[] = [
  {
    id: 'edge-1',
    source: 'node-1',
    target: 'node-2',
  },
  {
    id: 'edge-2',
    source: 'node-2',
    target: 'node-3',
  },
  {
    id: 'edge-3',
    source: 'node-3',
    target: 'node-4',
  },
];

// Use `subscribeWithSelector` to add subscribe function
export const useFlowStore = create<FlowStore>()(
  subscribeWithSelector((set, get) => ({
    // Nodes list
    nodes: initialNodes,
    // Edges list
    edges: initialEdges,
    // Selected element ID
    selectedElementId: null,
    // History state
    history: [{ nodes: initialNodes, edges: initialEdges }],
    currentHistoryIndex: 0,
    
    // Set selected element
    setSelectedElement: (id) => set({ selectedElementId: id }),
    
    // handle nodes changes
    onNodesChange: (changes: NodeChange<FlowNode>[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes)
      });
      const debouncedSave = debounce(() => {
        get().addHistory();
      }, DEBOUNCE_TIME);
      
      debouncedSave();
    },
    
    // handle edges changes
    onEdgesChange: (changes: EdgeChange<FlowEdge>[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges)
      });
      const debouncedSave = debounce(() => {
        get().addHistory();
      }, DEBOUNCE_TIME);
      
      debouncedSave();
    },
    
    // Update nodes data
    updateNodeConfig: (nodeId, newConfig) => set(state => ({
      nodes: state.nodes.map(node =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newConfig } }
          : node
      )
    })),

    // Add new node
    addNode: (nodeData) => {
      const newNode = {
        id: `node-${(get().nodes.length + 1).toString()}`,
        ...nodeData
      };

      set(state => ({
        nodes: [...state.nodes, newNode]
      }));
    },

    // Delete node
    deleteNode: (nodeId) => {
      const currentNodes = get().nodes;
      set({
        nodes: currentNodes.filter(node => node.id !== nodeId),
        selectedElementId: null // 清除选中状态
      });
    },
    
    // Add new edge
    addEdge: (connection: Omit<FlowEdge, 'id'>) => {
      const newEdge: FlowEdge = {
        id: `edge-${(get().edges.length + 1).toString()}`,
        source: connection.source as string,
        target: connection.target as string,
        ...connection,
      };

      set(state => ({
        ...state,
        edges: [...state.edges, newEdge]
      }));
    },

    // delete edge
    deleteEdge: (edgeId) => {
      const currentEdges = get().edges;
      set({
        edges: currentEdges.filter(edge => edge.id !== edgeId),
        selectedElementId: null // 清除选中状态
      });
    },

    // Add history state
    addHistory: () => {
      const { nodes, edges, history, currentHistoryIndex } = get();
      const newHistory = [
        ...history.slice(0, currentHistoryIndex + 1),
        { nodes: [...nodes], edges: [...edges] }
      ].slice(-MAX_HISTORY_STEPS); 

      set({
        history: newHistory,
        currentHistoryIndex: newHistory.length - 1
      });
    },

    // Undo
    undo: () => {
      const { currentHistoryIndex, history } = get();
      if (currentHistoryIndex > 0) {
        const prevIndex = currentHistoryIndex - 1;
        set({
          nodes: [...history[prevIndex].nodes],
          edges: [...history[prevIndex].edges],
          currentHistoryIndex: prevIndex
        });
      }
    },

    // Redo
    redo: () => {
      const { currentHistoryIndex, history } = get();
      if (currentHistoryIndex < history.length - 1) {
        const nextIndex = currentHistoryIndex + 1;
        set({
          nodes: [...history[nextIndex].nodes],
          edges: [...history[nextIndex].edges],
          currentHistoryIndex: nextIndex
        });
      }
    },
})));