import { useCallback, memo } from "react";
import { useModelAnalyzer } from "@/hooks/useModelAnalyzer";

import './InfoPanel.css';

export const InfoPanel = memo(() => {
  const { totalParams, totalFlops } = useModelAnalyzer();

  const formatNumber =  useCallback((num) => {
    if (typeof num !== 'number') return '-';
    return num >= 1e9 ? `${(num / 1e9).toFixed(2)}B` :
           num >= 1e6 ? `${(num / 1e6).toFixed(2)}M` :
           num >= 1e3 ? `${(num / 1e3).toFixed(2)}K` :
           num.toLocaleString();
  }, []);

  return (
    <div className="info-panel floating">
      <div className="info-item">
        <span>Total Params:</span>
        <span>{formatNumber(totalParams)}</span>
      </div>
      <div className="info-item">
        <span>FLOPs:</span>
        <span>{formatNumber(totalFlops)}</span>
      </div>
    </div>
  );
});