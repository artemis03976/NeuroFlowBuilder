// Node type enum
export enum NODE_TYPES {
  LINEAR = 'linear',
  CONV2D = 'conv2d',
  RELU = 'relu',
  SHAPE_OPS = 'shape_ops',
  MERGE_OPS = 'merge_ops',
}

// Node meta config definition
export interface BaseNodeConfig<T extends NODE_TYPES, Params = object> {
  type: T;
  label: string | ((params: Params) => string);
  parameters: Params;
  dimensionRules?: DimensionRules<Params>;
  parameterCalculator?: ParameterCalculator<Params>;
}

export type DimensionContext<P> = {
  // Parameters of the current node
  params: P;
  // Inputs of the current node
  inputs: number[][];
};

// Dimension Calculation and Validation Rules
export type DimensionRules<P> = {
  // Validate the inputs with the expected input dimension
  validate: (context: DimensionContext<P>)=> {
    isValid: boolean;
    message?: string;
    fixSuggestion?: Partial<P>;
  };
  // Compute the expected output dimension from inputs
  compute: (context: DimensionContext<P>) => number[];
};

// Parameter Calculation
export type ParameterCalculator<P> = (params: P) => {
  params: number;
  flops: number;
};

// Meta Config for all nodes
export type NodeMeta = {
  [Type in NODE_TYPES]: BaseNodeConfig<Type, any>;
};