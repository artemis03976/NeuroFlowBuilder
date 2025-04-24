import { ERROR_LEVEL, ERROR_TYPE } from '@error-configs/types';
import type { BaseErrorConfig } from '@error-configs/types';

// Meta Config
const SYSTEM_ERROR_META: BaseErrorConfig<typeof ERROR_TYPE.SYSTEM, typeof ERROR_LEVEL.ERROR> = {
  type: ERROR_TYPE.SYSTEM,
  title: "SystemError",
  defaultLevel: ERROR_LEVEL.ERROR,
  description: "运行时发生的意外异常"
};

export default SYSTEM_ERROR_META;