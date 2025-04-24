import { useCallback, useEffect, useRef } from "react";
import { shallow } from 'zustand/shallow';

import { useFlowStore } from "@/stores/useFlowStore";
import { ConnectionValidator } from "@/services/ConnectionValidator";
import { DimensionCalculator } from "@/services/DimensionCalculator";

export const useDimensionCalculation = () => {
  const updateNodeConfig = useFlowStore(state => state.updateNodeConfig);
  
  const calculating = useRef(false);

  const calculateDimensions = useCallback(() => {
    if (calculating.current) return;
    calculating.current = true;

    setTimeout(() => {
      try {
        const nodes = useFlowStore.getState().nodes;
        const edges = useFlowStore.getState().edges;

        const validator = new ConnectionValidator();
        const calculator = new DimensionCalculator();

        // 计算并校验所有节点的维度
        calculator.calculate(nodes, edges, validator, false);

        // 更新每个节点的维度信息
        nodes.forEach(node => {      
          // 使用更新后的 updateNodeConfig 函数更新节点维度信息
          updateNodeConfig(node.id, {
            dimensions: {
              input: calculator.getInputDimension(node.id),
              output: calculator.getOutputDimension(node.id)
            }
          });
        });
      } finally {
        // 确保计算完成后重置标志
        calculating.current = false;
      }
    }, 0);
  }, [updateNodeConfig]);

  useEffect(() => {
    // 订阅节点与边的变化
    const subscriptions = ['nodes', 'edges'].map(key =>
      useFlowStore.subscribe(
        state => state[key],
        () => calculateDimensions(),
        { equalityFn: shallow }
      )
    );

    return () => subscriptions.forEach(unsubscribe => unsubscribe());
  }, [calculateDimensions]);
};