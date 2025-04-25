import { useCallback, useEffect, useRef, useState } from "react";
import { shallow } from 'zustand/shallow';
import { throttle } from "lodash-es";
import { useFlowStore } from "@/stores/useFlowStore";
import { ModelAnalyzer } from "@/services/analyzer/ModelAnalyzer";

export const useModelAnalyzer = () => {
  const updateNodeConfig = useFlowStore(state => state.updateNodeConfig);
  
  // 创建 ModelAnalyzer 实例的引用
  const analyzerRef = useRef<ModelAnalyzer | null>(null);
  
  // 标记是否正在计算的状态
  const calculating = useRef(false);

  // 添加状态来存储计算结果
  const [results, setResults] = useState({ totalParams: 0, totalFlops: 0 });

  // 初始化分析器
  if (!analyzerRef.current) {
    analyzerRef.current = new ModelAnalyzer();
  }

  // 计算模型维度和参数的函数
  const calculateModel = useCallback(() => {
    if (calculating.current) return;
    calculating.current = true;

    setTimeout(() => {
      try {
        const nodes = useFlowStore.getState().nodes;
        const edges = useFlowStore.getState().edges;
        const analyzer = analyzerRef.current;

        if (!analyzer) return;

        // 执行分析
        analyzer.analyze(nodes, edges);

        // 更新每个节点的维度信息
        nodes.forEach(node => {
          updateNodeConfig(node.id, {
            dimensions: analyzer.getNodeDimension(node.id)
          });
        });

        // 更新计算结果状态
        setResults(analyzer.getParameterResults());
      } finally {
        // 确保计算完成后重置标志
        calculating.current = false;
      }
    }, 0);
  }, [updateNodeConfig]);

  // 节流处理的模型计算函数
  const throttledCalculateModel = useCallback(
    throttle(calculateModel, 200, { leading: true, trailing: true }),
    [calculateModel]
  );

  // 订阅节点与边的变化
  useEffect(() => {
    const subscriptions = (['nodes', 'edges'] as const).map(key =>
      useFlowStore.subscribe(
        state => state[key],
        () => throttledCalculateModel(),
        { equalityFn: shallow }
      )
    );

    // 组件卸载时清理订阅和取消节流函数
    return () => {
      subscriptions.forEach(unsubscribe => unsubscribe());
      throttledCalculateModel.cancel();
    };
  }, [throttledCalculateModel]);

  // 返回模型分析结果
  return results;
};