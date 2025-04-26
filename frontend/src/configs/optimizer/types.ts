export enum OPTIMIZER_TYPE {
  ADADELTA = 'adadelta',
  ADAGRAD = 'adagrad',
  ADAFACTOR = 'adafactor',
  ADAM = 'adam',
  ADAMW = 'adamw',
  SPARSEADAM = 'sparseadam',
  ADAMAX = 'adamax',
  ASGD = 'asgd',
  LBFGS = 'lbfgs',
  NADAM = 'nadam',
  RADAM = 'radam',
  RMSPROP = 'rmsprop',
  RPROP = 'rprop',
  SGD = 'sgd'
}

export interface OptimizerParam {
  name: string;
  label: string;
  type: 'number' | 'boolean' | 'number_array';
  defaultValue: number | boolean | number[];
  min?: number | number[];
  max?: number | number[];
  step?: number | number[];
}

export interface BaseOptimizerConfig<T extends OPTIMIZER_TYPE> {
  type: T;
  label: string;
  params: OptimizerParam[];
}

export type OptimizerMeta = {
  [Type in OPTIMIZER_TYPE]: BaseOptimizerConfig<Type>;
};