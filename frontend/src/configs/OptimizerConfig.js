// Optimizer type enums
export const OPTIMIZER_TYPE = {
  ADAM: 'Adam',
  SGD: 'SGD',
  RMSPROP: 'Rmsprop'
}

// Optimizer Meta Config
export const OPTIMIZER_META = {
  [OPTIMIZER_TYPE.ADAM]: {
    label: 'Adam',
    params: [
      {
        name: 'lr',
        label: 'Learning rate',
        type: 'number',
        defaultValue: 0.001,
        min: 0.00001,
        step: 0.0001
      },
      {
        name: 'weight_decay',
        label: 'Weight Decay',
        type: 'number',
        defaultValue: 0,
        min: 0,
        max: 1,
        step: 0.001
      }
    ]
  },

  [OPTIMIZER_TYPE.SGD]: {
    name: 'sgd',
    label: 'SGD',
    params: [
      {
        name: 'lr',
        label: 'Learning rate',
        type: 'number',
        defaultValue: 0.01,
        min: 0.00001,
        step: 0.0001
      },
      {
        name: 'momentum',
        label: 'Momentum',
        type: 'number',
        defaultValue: 0.9,
        min: 0,
        max: 1,
        step: 0.01
      }
    ]
  },

  [OPTIMIZER_TYPE.RMSPROP]: {
    name: 'rmsprop',
    label: 'RMSprop',
    params: [
      {
        name: 'lr',
        label: 'Learning Rate',
        type: 'number',
        defaultValue: 0.01,
        min: 0.00001,
        step: 0.0001
      },
      {
        name: 'alpha',
        label: 'Alpha',
        type: 'number',
        defaultValue: 0.99,
        min: 0,
        max: 1,
        step: 0.01
      }
    ]
  }
};