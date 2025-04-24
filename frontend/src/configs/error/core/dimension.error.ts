import { ERROR_LEVEL, ERROR_TYPE } from '@error-configs/types';
import type { BaseErrorConfig } from '@error-configs/types';

// Meta Config
const DIMENSION_ERROR_META: BaseErrorConfig<typeof ERROR_TYPE.DIMENSION, typeof ERROR_LEVEL.ERROR> = {
  type: ERROR_TYPE.DIMENSION,
  title: "DimensionError",
  defaultLevel: ERROR_LEVEL.ERROR,
  description: "神经网络层之间的维度不匹配"
};

export default DIMENSION_ERROR_META;