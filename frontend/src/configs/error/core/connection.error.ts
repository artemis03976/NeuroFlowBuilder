import { ERROR_LEVEL, ERROR_TYPE } from '@error-configs/types';
import type { BaseErrorConfig } from '@error-configs/types';

// Meta Config
const CONNECTION_ERROR_META: BaseErrorConfig<typeof ERROR_TYPE.CONNECTION, typeof ERROR_LEVEL.ERROR> = {
  type: ERROR_TYPE.CONNECTION,
  title: "ConnectionError",
  defaultLevel: ERROR_LEVEL.ERROR,
  description: "节点之间的连接不符合拓扑规则"
};

export default CONNECTION_ERROR_META;