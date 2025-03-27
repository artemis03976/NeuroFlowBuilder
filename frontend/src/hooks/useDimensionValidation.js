import { useCallback, useEffect } from "react";
import { shallow } from 'zustand/shallow';

import { ERROR_TYPES, ERROR_LEVELS } from "@/configs/ErrorConfig";
import { useFlowStore } from "@/stores/useFlowStore";
import { useErrorStore } from "@/stores/useErrorStore";
import { DimensionManager } from "@/services/DimensionManager";


export const useDimensionValidation = () => {
  const { clearAllErrors, addError } = useErrorStore();

  const checkDimensions = useCallback(() => {
    const nodes = useFlowStore.getState().nodes;
    const edges = useFlowStore.getState().edges;
    const dimensionManager = new DimensionManager();

    // 清除旧错误
    clearAllErrors();

    // 更新节点维度
    nodes.forEach(node => dimensionManager.updateNode(node));

    // 检查所有连接
    edges.forEach(edge => {
      const isValid = dimensionManager.checkConnection(edge.source, edge.target);

      if (!isValid) {
        addError(ERROR_TYPES.DIMENSION, edge.target, {
          message: `维度不匹配: ${edge.source} → ${edge.target}`,
          level: ERROR_LEVELS.CRITICAL,
          context: {
            source: edge.source,
            target: edge.target
          }
        });
      }
    });
  }, [addError, clearAllErrors]);

  useEffect(() => {
    // 订阅节点与边的变化
    const subscriptions = ['nodes', 'edges'].map(key =>
      useFlowStore.subscribe(
        state => state[key],
        () => checkDimensions(),
        { equalityFn: shallow }
      )
    );

    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, [checkDimensions]);
};