export enum OPTIMIZER_TYPE {
  ADAM = 'adam',
  SGD = 'sgd',
  RMSPROP = 'rmsprop'
}

export interface OptimizerParam {
  name: string;
  label: string;
  type: 'number' | 'boolean';
  defaultValue: number | boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface BaseOptimizerConfig<T extends OPTIMIZER_TYPE> {
  type: T;
  label: string;
  params: OptimizerParam[];
}

export type OptimizerMeta = {
  [Type in OPTIMIZER_TYPE]: BaseOptimizerConfig<Type>;
};