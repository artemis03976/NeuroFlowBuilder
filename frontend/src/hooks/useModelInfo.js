import { useEffect, useMemo, useCallback } from "react";
import { ParameterCalculator } from "@/services/ParameterCalculator";
import { useFlowStore } from "@/stores/useFlowStore";
import { throttle } from "lodash-es"
import { shallow } from "zustand/shallow";


export const useModelInfo = () => {
  const nodes = useFlowStore(state => state.nodes);

  // Cache result
  const modelInfo = useMemo(() => {
    return ParameterCalculator.calculate(nodes);
  }, [nodes]);

  // Throttled update
  const throttledSetModelInfo = useCallback(
    throttle(
      (newNodes) => ParameterCalculator.calculate(newNodes),
      200,
      { leading: true, trailing: true }
    ), []
  );

  // Subscribe node changes
  useEffect(() => {
    const unsubscribe = useFlowStore.subscribe(
      (state) => state.nodes,
      (currNodes, prevNodes) => {
        throttledSetModelInfo(currNodes);
      }, { equalityFn: shallow }
    );

    return () => {
      unsubscribe();
      throttledSetModelInfo.cancel();
    };
  }, [throttledSetModelInfo]);

  return modelInfo;
};