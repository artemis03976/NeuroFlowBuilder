# PyTorch v2.3.0 学习率调度器文档

本文档详细介绍了PyTorch v2.3.0版本中所有可用的学习率调度器，包括其原理、参数和使用示例。

## 目录

- [学习率调度器概述](#学习率调度器概述)
- [基础调度器](#基础调度器)
  - [LRScheduler](#lrscheduler)
  - [LambdaLR](#lambdalr)
  - [StepLR](#steplr)
  - [MultiStepLR](#multisteplr)
  - [ExponentialLR](#exponentiallr)
  - [CosineAnnealingLR](#cosineannealinglr)
  - [ReduceLROnPlateau](#reducelronplateau)
- [高级调度器](#高级调度器)
  - [CosineAnnealingWarmRestarts](#cosineannealingwarmrestarts)
  - [OneCycleLR](#onecyclelr)
  - [CyclicLR](#cycliclr)
  - [ChainedScheduler](#chainedscheduler)
  - [SequentialLR](#sequentiallr)
- [其他调度器](#其他调度器)
  - [ConstantLR](#constantlr)
  - [LinearLR](#linearlr)
  - [PolynomialLR](#polynomiallr)
  - [SWALR](#swalr)
- [使用最佳实践](#使用最佳实践)

## 学习率调度器概述

学习率调度器是深度学习训练中的重要工具，可以根据训练进程动态调整学习率，帮助模型更好地收敛。在PyTorch中，学习率调度器主要通过`torch.optim.lr_scheduler`模块提供。

学习率调度的一般原则是：在训练初期使用较大的学习率快速接近最优解，随着训练的进行逐渐减小学习率以便更精细地调整模型参数。

## 基础调度器

### LRScheduler

**官方文档**：[torch.optim.lr_scheduler.LRScheduler](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.LRScheduler.html)

**描述**：所有学习率调度器的基类，提供了基本的功能和接口。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**主要方法**：
- `step()`：更新学习率
- `get_last_lr()`：获取上一次计算的学习率
- `state_dict()`：返回调度器的状态字典
- `load_state_dict(state_dict)`：加载调度器的状态

### LambdaLR

**官方文档**：[torch.optim.lr_scheduler.LambdaLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.LambdaLR.html)

**描述**：根据自定义函数调整学习率。学习率会被乘以给定的函数返回的值。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `lr_lambda` (function 或 list)：一个计算乘法因子的函数，接收epoch作为参数，或者一个这样的函数列表，每个函数对应优化器中的一个参数组
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
# 假设优化器有两个参数组
lambda1 = lambda epoch: epoch // 30
lambda2 = lambda epoch: 0.95 ** epoch
scheduler = LambdaLR(optimizer, lr_lambda=[lambda1, lambda2])
```

### StepLR

**官方文档**：[torch.optim.lr_scheduler.StepLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.StepLR.html)

**描述**：按固定间隔调整学习率。每隔`step_size`个epoch，将学习率乘以`gamma`。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `step_size` (int)：学习率衰减的间隔，单位为epoch
- `gamma` (float, 可选)：学习率衰减的乘法因子，默认为0.1
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
# 假设优化器使用lr=0.05
# lr = 0.05, 如果epoch < 30
# lr = 0.005, 如果30 <= epoch < 60
# lr = 0.0005, 如果60 <= epoch < 90
scheduler = StepLR(optimizer, step_size=30, gamma=0.1)
```

### MultiStepLR

**官方文档**：[torch.optim.lr_scheduler.MultiStepLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.MultiStepLR.html)

**描述**：在预设的里程碑处调整学习率。当epoch达到`milestones`中的值时，将学习率乘以`gamma`。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `milestones` (list)：epoch的索引列表，必须是递增的
- `gamma` (float, 可选)：学习率衰减的乘法因子，默认为0.1
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
# 假设优化器使用lr=0.05
# lr = 0.05, 如果epoch < 30
# lr = 0.005, 如果30 <= epoch < 80
# lr = 0.0005, 如果epoch >= 80
scheduler = MultiStepLR(optimizer, milestones=[30, 80], gamma=0.1)
```

### ExponentialLR

**官方文档**：[torch.optim.lr_scheduler.ExponentialLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ExponentialLR.html)

**描述**：指数衰减学习率。每个epoch将学习率乘以`gamma`。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `gamma` (float)：学习率衰减的乘法因子
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
# 每个epoch将学习率乘以0.9
scheduler = ExponentialLR(optimizer, gamma=0.9)
```

### CosineAnnealingLR

**官方文档**：[torch.optim.lr_scheduler.CosineAnnealingLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CosineAnnealingLR.html)

**描述**：余弦退火学习率。学习率按照余弦函数从初始值衰减到`eta_min`，然后重新回到初始值。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `T_max` (int)：最大迭代次数
- `eta_min` (float, 可选)：最小学习率，默认为0
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = CosineAnnealingLR(optimizer, T_max=50, eta_min=0.001)
```

### ReduceLROnPlateau

**官方文档**：[torch.optim.lr_scheduler.ReduceLROnPlateau](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ReduceLROnPlateau.html)

**描述**：当指标停止改善时减少学习率。当监控的指标在`patience`个epoch内没有改善时，将学习率乘以`factor`。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `mode` (str, 可选)：'min'或'max'，在'min'模式下，当监控的指标停止下降时降低学习率；在'max'模式下，当监控的指标停止上升时降低学习率，默认为'min'
- `factor` (float, 可选)：学习率衰减的乘法因子，默认为0.1
- `patience` (int, 可选)：在降低学习率之前等待改善的epoch数，默认为10
- `threshold` (float, 可选)：衡量改善的阈值，默认为1e-4
- `threshold_mode` (str, 可选)：'rel'或'abs'，在'rel'模式下，动态阈值为`best * (1 + threshold)`（'max'模式）或`best * (1 - threshold)`（'min'模式），在'abs'模式下，动态阈值为`best + threshold`（'max'模式）或`best - threshold`（'min'模式），默认为'rel'
- `cooldown` (int, 可选)：在学习率降低后重新开始计算耐心之前等待的epoch数，默认为0
- `min_lr` (float 或 list, 可选)：学习率的下限，默认为0
- `eps` (float, 可选)：应用于lr的最小衰减，如果新旧lr之间的差异小于eps，则忽略更新，默认为1e-8

**示例**：
```python
scheduler = ReduceLROnPlateau(optimizer, mode='min', factor=0.1, patience=10)

# 在训练循环中
for epoch in range(100):
    train(...)
    val_loss = validate(...)
    # 注意，step应该在validate()之后调用
    scheduler.step(val_loss)
```

## 高级调度器

### CosineAnnealingWarmRestarts

**官方文档**：[torch.optim.lr_scheduler.CosineAnnealingWarmRestarts](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CosineAnnealingWarmRestarts.html)

**描述**：带热重启的余弦退火学习率。学习率按照余弦函数从初始值衰减到`eta_min`，然后重新回到初始值，周期性地重复这个过程。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `T_0` (int)：第一次重启的迭代次数
- `T_mult` (int, 可选)：重启后周期长度的乘法因子，默认为1
- `eta_min` (float, 可选)：最小学习率，默认为0
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = CosineAnnealingWarmRestarts(optimizer, T_0=20, T_mult=2)
```

### OneCycleLR

**官方文档**：[torch.optim.lr_scheduler.OneCycleLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.OneCycleLR.html)

**描述**：一个周期的学习率策略。学习率先从`initial_lr`增加到`max_lr`，然后再降低到`final_lr`，遵循一个周期的策略。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `max_lr` (float 或 list)：最大学习率
- `total_steps` (int, 可选)：总步数，与`epochs`和`steps_per_epoch`二选一
- `epochs` (int, 可选)：epoch数，与`total_steps`二选一，需要同时指定`steps_per_epoch`
- `steps_per_epoch` (int, 可选)：每个epoch的步数，与`epochs`一起使用
- `pct_start` (float, 可选)：学习率增加阶段占总步数的百分比，默认为0.3
- `anneal_strategy` (str, 可选)：'cos'或'linear'，学习率变化的策略，默认为'cos'
- `cycle_momentum` (bool, 可选)：是否也循环动量，默认为True
- `base_momentum` (float 或 list, 可选)：最小动量，默认为0.85
- `max_momentum` (float 或 list, 可选)：最大动量，默认为0.95
- `div_factor` (float, 可选)：`initial_lr = max_lr / div_factor`，默认为25
- `final_div_factor` (float, 可选)：`final_lr = initial_lr / final_div_factor`，默认为1e4

**示例**：
```python
scheduler = OneCycleLR(optimizer, max_lr=0.1, total_steps=100)
```

### CyclicLR

**官方文档**：[torch.optim.lr_scheduler.CyclicLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.CyclicLR.html)

**描述**：循环学习率策略。学习率在`base_lr`和`max_lr`之间循环变化。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `base_lr` (float 或 list)：最小学习率
- `max_lr` (float 或 list)：最大学习率
- `step_size_up` (int, 可选)：学习率增加阶段的步数，默认为2000
- `step_size_down` (int, 可选)：学习率减少阶段的步数，默认等于`step_size_up`
- `mode` (str, 可选)：'triangular', 'triangular2'或'exp_range'，学习率变化的模式，默认为'triangular'
- `gamma` (float, 可选)：在'exp_range'模式下学习率衰减的乘法因子，默认为1.0
- `scale_fn` (function, 可选)：自定义缩放函数，接收一个参数（循环迭代）并返回一个缩放因子
- `scale_mode` (str, 可选)：'cycle'或'iterations'，缩放函数应用的模式，默认为'cycle'
- `cycle_momentum` (bool, 可选)：是否也循环动量，默认为True
- `base_momentum` (float 或 list, 可选)：最小动量，默认为0.8
- `max_momentum` (float 或 list, 可选)：最大动量，默认为0.9

**示例**：
```python
scheduler = CyclicLR(optimizer, base_lr=0.001, max_lr=0.1, step_size_up=2000)
```

### ChainedScheduler

**官方文档**：[torch.optim.lr_scheduler.ChainedScheduler](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ChainedScheduler.html)

**描述**：链式调度器，连续调用多个调度器。每个调度器的输出作为下一个调度器的输入。

**参数**：
- `schedulers` (list)：调度器列表

**示例**：
```python
scheduler1 = ConstantLR(optimizer, factor=0.1, total_iters=2)
scheduler2 = ExponentialLR(optimizer, gamma=0.9)
scheduler = ChainedScheduler([scheduler1, scheduler2])
```

### SequentialLR

**官方文档**：[torch.optim.lr_scheduler.SequentialLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.SequentialLR.html)

**描述**：顺序调度器，按里程碑顺序调用多个调度器。在达到里程碑之前使用一个调度器，达到里程碑后切换到下一个调度器。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `schedulers` (list)：调度器列表
- `milestones` (list)：里程碑列表，指定何时切换到下一个调度器
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler1 = ConstantLR(optimizer, factor=0.1, total_iters=2)
scheduler2 = ExponentialLR(optimizer, gamma=0.9)
scheduler = SequentialLR(optimizer, schedulers=[scheduler1, scheduler2], milestones=[2])
```

## 其他调度器

### ConstantLR

**官方文档**：[torch.optim.lr_scheduler.ConstantLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.ConstantLR.html)

**描述**：在指定的迭代次数内保持常数因子的学习率。学习率会乘以一个常数因子，直到达到指定的迭代次数。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `factor` (float)：学习率的乘法因子
- `total_iters` (int)：学习率保持常数因子的迭代次数
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = ConstantLR(optimizer, factor=0.1, total_iters=5)
```

### LinearLR

**官方文档**：[torch.optim.lr_scheduler.LinearLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.LinearLR.html)

**描述**：线性调整学习率。学习率从`start_factor * base_lr`线性变化到`end_factor * base_lr`。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `start_factor` (float, 可选)：初始学习率因子，默认为1/3
- `end_factor` (float, 可选)：最终学习率因子，默认为1.0
- `total_iters` (int, 可选)：学习率变化的总迭代次数，默认为5
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = LinearLR(optimizer, start_factor=0.1, end_factor=1.0, total_iters=10)
```

### PolynomialLR

**官方文档**：[torch.optim.lr_scheduler.PolynomialLR](https://pytorch.org/docs/stable/generated/torch.optim.lr_scheduler.PolynomialLR.html)

**描述**：多项式衰减学习率。学习率按照多项式函数衰减。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `total_iters` (int)：学习率衰减的总迭代次数
- `power` (float, 可选)：多项式的幂，默认为1.0
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = PolynomialLR(optimizer, total_iters=100, power=2.0)
```

### SWALR

**官方文档**：[torch.optim.swa_utils.SWALR](https://pytorch.org/docs/stable/generated/torch.optim.swa_utils.SWALR.html)

**描述**：随机权重平均学习率。将学习率退火到一个固定值，然后保持不变。通常与随机权重平均（SWA）一起使用。

**参数**：
- `optimizer` (Optimizer)：要包装的优化器
- `swa_lr` (float 或 list)：SWA学习率
- `anneal_epochs` (int, 可选)：退火的epoch数，默认为10
- `anneal_strategy` (str, 可选)：'cos'或'linear'，退火策略，默认为'cos'
- `last_epoch` (int, 可选)：最后一个epoch的索引，默认为-1

**示例**：
```python
scheduler = SWALR(optimizer, swa_lr=0.05, anneal_epochs=5)
```

## 使用最佳实践

1. **学习率调度的时机**：学习率调度应该在优化器更新之后应用，例如：
   ```python
   optimizer.step()
   scheduler.step()
   ```

2. **ReduceLROnPlateau的使用**：对于`ReduceLROnPlateau`，应该在验证后调用：
   ```python
   optimizer.step()
   val_loss = validate(...)
   scheduler.step(val_loss)
   ```

3. **组合多个调度器**：可以通过多种方式组合调度器：
   - 直接连续调用多个调度器：
     ```python
     scheduler1.step()
     scheduler2.step()
     ```
   - 使用`ChainedScheduler`：
     ```python
     scheduler = ChainedScheduler([scheduler1, scheduler2])
     scheduler.step()
     ```
   - 使用`SequentialLR`在不同阶段使用不同的调度器：
     ```python
     scheduler = SequentialLR(optimizer, [scheduler1, scheduler2], milestones=[30])
     scheduler.step()
     ```

4. **选择合适的调度器**：
   - 对于一般任务，`StepLR`或`MultiStepLR`通常是不错的选择
   - 对于需要精细控制的任务，`CosineAnnealingLR`或`OneCycleLR`可能更合适
   - 当不确定最佳学习率衰减点时，`ReduceLROnPlateau`是一个好选择

5. **监控学习率变化**：在训练过程中监控学习率的变化，可以帮助理解模型的训练过程：
   ```python
   current_lr = scheduler.get_last_lr()[0]
   print(f"Epoch {epoch}, Learning Rate: {current_lr}")
   ```