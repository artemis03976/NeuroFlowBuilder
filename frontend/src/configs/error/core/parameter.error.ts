import { ERROR_LEVEL, ERROR_TYPE } from '@error-configs/types';
import type { BaseErrorConfig } from '@error-configs/types';

// Meta Config
const PARAMETER_ERROR_META: BaseErrorConfig<typeof ERROR_TYPE.PARAMETER, typeof ERROR_LEVEL.ERROR> = {
  type: ERROR_TYPE.PARAMETER,
  title: "ParameterError",
  defaultLevel: ERROR_LEVEL.ERROR,
  description: "模型配置参数校验未通过"
};

export default PARAMETER_ERROR_META;