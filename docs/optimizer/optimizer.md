# PyTorch v2.3.0 优化器文档

本文档详细介绍了PyTorch v2.3.0版本中所有可用的优化器，包括其原理和参数配置，为GraphicAIBuilder项目提供参考。

## 目录

- [Adadelta](#adadelta)
- [Adagrad](#adagrad)
- [Adafactor](#adafactor)
- [Adam](#adam)
- [AdamW](#adamw)
- [SparseAdam](#sparseadam)
- [Adamax](#adamax)
- [ASGD](#asgd)
- [LBFGS](#lbfgs)
- [NAdam](#nadam)
- [RAdam](#radam)
- [RMSprop](#rmsprop)
- [Rprop](#rprop)
- [SGD](#sgd)

## Adadelta

官方文档：[torch.optim.Adadelta](https://pytorch.org/docs/stable/generated/torch.optim.Adadelta.html)

### 原理

Adadelta是Adagrad的扩展版本，它使用梯度更新的移动窗口来调整学习率，而不是累积所有先前的梯度。这解决了Adagrad学习率过度减小的问题。Adadelta不需要设置初始学习率，它根据参数的历史梯度自适应调整学习率。

### 参数

```python
torch.optim.Adadelta(params, lr=1.0, rho=0.9, eps=1e-06, weight_decay=0, foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 1.0）
- **rho** (float, 可选): 用于计算平方梯度的移动平均值的系数（默认: 0.9）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-6）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## Adagrad

官方文档：[torch.optim.Adagrad](https://pytorch.org/docs/stable/generated/torch.optim.Adagrad.html)

### 原理

Adagrad（自适应梯度算法）是一种为每个参数自适应调整学习率的优化算法。它对频繁更新的参数使用较小的学习率，对不常更新的参数使用较大的学习率，特别适合处理稀疏数据。

### 参数

```python
torch.optim.Adagrad(params, lr=0.01, lr_decay=0, weight_decay=0, initial_accumulator_value=0, eps=1e-10, foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.01）
- **lr_decay** (float, 可选): 学习率衰减（默认: 0）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **initial_accumulator_value** (float, 可选): 累加器的初始值（默认: 0）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-10）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## Adafactor

官方文档：[torch.optim.Adafactor](https://pytorch.org/docs/stable/generated/torch.optim.Adafactor.html)

### 原理

Adafactor是一种内存高效的优化器，专为大型模型设计，特别是Transformer模型。它通过分解二阶矩估计矩阵来减少内存使用，同时保持与Adam类似的性能。Adafactor避免了为每个参数存储完整的梯度历史，而是使用行和列的因子分解来近似二阶矩矩阵，大大减少了内存需求。

### 参数

```python
torch.optim.Adafactor(params, lr=None, eps2=(1e-30, 1e-3), clip_threshold=1.0, decay_rate=-0.8, beta1=None, weight_decay=0.0, scale_parameter=True, relative_step=True, warmup_init=False, foreach=None, clip_grad_norm=None)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: None，使用相对步长）
- **eps2** (Tuple[float, float], 可选): 用于数值稳定性的系数，第一个值用于梯度，第二个值用于参数（默认: (1e-30, 1e-3)）
- **clip_threshold** (float, 可选): 梯度裁剪阈值（默认: 1.0）
- **decay_rate** (float, 可选): 衰减率（默认: -0.8）
- **beta1** (float, 可选): 一阶矩估计的指数衰减率（默认: None，不使用动量）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0.0）
- **scale_parameter** (bool, 可选): 如果为True，则参数会根据参数规模进行缩放（默认: True）
- **relative_step** (bool, 可选): 如果为True，则使用相对步长而不是绝对学习率（默认: True）
- **warmup_init** (bool, 可选): 如果为True，则使用小的相对步长进行预热（默认: False）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **clip_grad_norm** (float, 可选): 梯度范数裁剪的最大值（默认: None）

## Adam

官方文档：[torch.optim.Adam](https://pytorch.org/docs/stable/generated/torch.optim.Adam.html)

### 原理

Adam（自适应矩估计）结合了动量和RMSprop的优点。它维护每个参数的自适应学习率，同时利用梯度的一阶矩（均值）和二阶矩（未中心化的方差）来调整每个参数的学习率。Adam在实践中表现良好，是深度学习中最常用的优化器之一。

### 参数

```python
torch.optim.Adam(params, lr=0.001, betas=(0.9, 0.999), eps=1e-08, weight_decay=0, amsgrad=False, foreach=None, maximize=False, capturable=False, differentiable=False, fused=None, decoupled_weight_decay=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.001）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **amsgrad** (bool, 可选): 是否使用论文《On the Convergence of Adam and Beyond》中的AMSGrad变体（默认: False）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **capturable** (bool, 可选): 是否可以在CUDA图中捕获（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）
- **fused** (bool, 可选): 是否使用融合实现
- **decoupled_weight_decay** (bool, 可选): 如果为True，则此优化器等同于AdamW，算法不会在动量或方差中累积权重衰减（默认: False）

## AdamW

官方文档：[torch.optim.AdamW](https://pytorch.org/docs/stable/generated/torch.optim.AdamW.html)

### 原理

AdamW是Adam的一个变体，实现了权重衰减的解耦。在标准Adam中，权重衰减被实现为L2正则化，而在AdamW中，权重衰减直接应用于权重更新，而不是梯度。这种解耦可以提高泛化性能，特别是在大型模型中。

### 参数

```python
torch.optim.AdamW(params, lr=0.001, betas=(0.9, 0.999), eps=1e-08, weight_decay=0.01, amsgrad=False, foreach=None, maximize=False, capturable=False, differentiable=False, fused=None)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.001）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减系数（默认: 0.01）
- **amsgrad** (bool, 可选): 是否使用论文《On the Convergence of Adam and Beyond》中的AMSGrad变体（默认: False）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **capturable** (bool, 可选): 是否可以在CUDA图中捕获（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）
- **fused** (bool, 可选): 是否使用融合实现

## SparseAdam

官方文档：[torch.optim.SparseAdam](https://pytorch.org/docs/stable/generated/torch.optim.SparseAdam.html)

### 原理

SparseAdam是Adam优化器的一个变体，专为处理稀疏张量设计。它只更新梯度中非零元素对应的参数，这在处理大规模稀疏数据（如自然语言处理中的词嵌入）时非常有效。

### 参数

```python
torch.optim.SparseAdam(params, lr=0.001, betas=(0.9, 0.999), eps=1e-08, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.001）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## Adamax

官方文档：[torch.optim.Adamax](https://pytorch.org/docs/stable/generated/torch.optim.Adamax.html)

### 原理

Adamax是Adam优化器的一个变种，基于无穷范数。它使用梯度的最大值而不是二阶矩来调整学习率，这使得它在某些情况下比Adam更稳定，特别是在处理噪声梯度时。

### 参数

```python
torch.optim.Adamax(params, lr=0.002, betas=(0.9, 0.999), eps=1e-08, weight_decay=0, foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.002）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## ASGD

官方文档：[torch.optim.ASGD](https://pytorch.org/docs/stable/generated/torch.optim.ASGD.html)

### 原理

ASGD（平均随机梯度下降）是SGD的一个变种，它在训练过程中对权重进行平均，以获得更好的泛化性能。这种平均可以帮助减少权重的方差，从而提高模型在测试数据上的性能。

### 参数

```python
torch.optim.ASGD(params, lr=0.01, lambd=0.0001, alpha=0.75, t0=1000000.0, weight_decay=0, foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.01）
- **lambd** (float, 可选): 衰减项（默认: 0.0001）
- **alpha** (float, 可选): 幂平均衰减（默认: 0.75）
- **t0** (float, 可选): 开始平均的点（默认: 1000000.0）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## LBFGS

官方文档：[torch.optim.LBFGS](https://pytorch.org/docs/stable/generated/torch.optim.LBFGS.html)

### 原理

LBFGS（有限内存BFGS）是一种拟牛顿法，它使用有限的历史梯度信息来近似Hessian矩阵的逆。这使得它在某些情况下比一阶方法（如SGD）收敛更快，特别是在小到中等规模的数据集上。LBFGS需要多次重新评估函数，因此在大型深度学习模型中使用较少。

### 参数

```python
torch.optim.LBFGS(params, lr=1, max_iter=20, max_eval=None, tolerance_grad=1e-07, tolerance_change=1e-09, history_size=100, line_search_fn=None, foreach=None)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 1）
- **max_iter** (int, 可选): 每步的最大迭代次数（默认: 20）
- **max_eval** (int, 可选): 每步的最大函数评估次数（默认: max_iter * 1.25）
- **tolerance_grad** (float, 可选): 梯度的终止容差（默认: 1e-7）
- **tolerance_change** (float, 可选): 函数值/参数更改的终止容差（默认: 1e-9）
- **history_size** (int, 可选): 更新历史大小（默认: 100）
- **line_search_fn** (str, 可选): 'strong_wolfe'或None（默认: None）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现

## NAdam

官方文档：[torch.optim.NAdam](https://pytorch.org/docs/stable/generated/torch.optim.NAdam.html)

### 原理

NAdam（带有Nesterov动量的Adam）结合了Adam优化器和Nesterov加速梯度（NAG）的优点。它使用Nesterov动量来改进Adam的更新规则，这可以帮助加速收敛并提高性能，特别是在训练深度神经网络时。

### 参数

```python
torch.optim.NAdam(params, lr=0.002, betas=(0.9, 0.999), eps=1e-08, weight_decay=0, momentum_decay=0.004, foreach=None, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.002）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **momentum_decay** (float, 可选): 动量衰减（默认: 0.004）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## RAdam

官方文档：[torch.optim.RAdam](https://pytorch.org/docs/stable/generated/torch.optim.RAdam.html)

### 原理

RAdam（修正的Adam）是Adam优化器的一个变体，它通过引入一个预热和修正的自适应学习率来解决Adam在训练早期可能出现的收敛问题。RAdam可以在不需要预热学习率调度的情况下提供更稳定的训练过程。

### 参数

```python
torch.optim.RAdam(params, lr=0.001, betas=(0.9, 0.999), eps=1e-08, weight_decay=0, foreach=None, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.001）
- **betas** (Tuple[float, float], 可选): 用于计算梯度及其平方的运行平均值的系数（默认: (0.9, 0.999)）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## RMSprop

官方文档：[torch.optim.RMSprop](https://pytorch.org/docs/stable/generated/torch.optim.RMSprop.html)

### 原理

RMSprop（均方根传播）是一种自适应学习率方法，它维持梯度平方的移动平均值，并用它来归一化梯度。这有助于解决Adagrad中学习率过度减小的问题，使其在非凸优化问题中表现良好，特别是在循环神经网络（RNN）中。

### 参数

```python
torch.optim.RMSprop(params, lr=0.01, alpha=0.99, eps=1e-08, weight_decay=0, momentum=0, centered=False, foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.01）
- **alpha** (float, 可选): 平滑常数（默认: 0.99）
- **eps** (float, 可选): 添加到分母以提高数值稳定性的项（默认: 1e-8）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **momentum** (float, 可选): 动量因子（默认: 0）
- **centered** (bool, 可选): 如果为True，计算梯度的中心化方差（默认: False）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## Rprop

官方文档：[torch.optim.Rprop](https://pytorch.org/docs/stable/generated/torch.optim.Rprop.html)

### 原理

Rprop（弹性反向传播）是一种仅使用梯度符号进行更新的优化算法，忽略梯度的实际大小。它为每个参数维护一个自适应的步长，根据连续梯度的符号是否一致来增加或减少步长。这使得Rprop对梯度的规模不敏感，在某些问题上表现良好。

### 参数

```python
torch.optim.Rprop(params, lr=0.01, etas=(0.5, 1.2), step_sizes=(1e-06, 50.0), foreach=None, maximize=False, differentiable=False)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.01）
- **etas** (Tuple[float, float], 可选): 步长调整因子（默认: (0.5, 1.2)）
- **step_sizes** (Tuple[float, float], 可选): 步长的范围（默认: (1e-6, 50.0)）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）

## SGD

官方文档：[torch.optim.SGD](https://pytorch.org/docs/stable/generated/torch.optim.SGD.html)

### 原理

SGD（随机梯度下降）是最基本的优化算法，它使用小批量数据的梯度来更新参数。SGD可以配置动量，这有助于加速收敛并避免局部最小值。尽管简单，但在许多情况下，SGD（特别是带动量的SGD）仍然是一个强大且有效的优化器。

### 参数

```python
torch.optim.SGD(params, lr=0.001, momentum=0, dampening=0, weight_decay=0, nesterov=False, foreach=None, maximize=False, differentiable=False, fused=None)
```

- **params** (iterable): 要优化的参数或者定义参数组的字典
- **lr** (float, 可选): 学习率（默认: 0.001）
- **momentum** (float, 可选): 动量因子（默认: 0）
- **dampening** (float, 可选): 动量的阻尼（默认: 0）
- **weight_decay** (float, 可选): 权重衰减（L2惩罚）（默认: 0）
- **nesterov** (bool, 可选): 是否使用Nesterov动量（默认: False）
- **foreach** (bool, 可选): 是否使用优化器的foreach实现
- **maximize** (bool, 可选): 最大化目标函数而不是最小化（默认: False）
- **differentiable** (bool, 可选): 是否允许通过优化器步骤进行自动微分（默认: False）
- **fused** (bool, 可选): 是否使用融合实现