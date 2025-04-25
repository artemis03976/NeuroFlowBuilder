# PyTorch 归一化层参数文档

本文档整理了PyTorch v2.3.0版本中`torch.nn`模块下的归一化层相关参数信息，用于NeuroFlow Builder的节点配置文件创建参考。

## 目录

- [批量归一化层 (BatchNorm1d)](#批量归一化层-batchnorm1d)
- [批量归一化层 (BatchNorm2d)](#批量归一化层-batchnorm2d)
- [批量归一化层 (BatchNorm3d)](#批量归一化层-batchnorm3d)
- [组归一化层 (GroupNorm)](#组归一化层-groupnorm)
- [实例归一化层 (InstanceNorm1d)](#实例归一化层-instancenorm1d)
- [实例归一化层 (InstanceNorm2d)](#实例归一化层-instancenorm2d)
- [实例归一化层 (InstanceNorm3d)](#实例归一化层-instancenorm3d)
- [层归一化 (LayerNorm)](#层归一化-layernorm)

## 批量归一化层 (BatchNorm1d)

官方文档：[torch.nn.BatchNorm1d](https://pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html)

### 参数

```python
torch.nn.BatchNorm1d(num_features, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True, device=None, dtype=None)
```

- **num_features** (int): 来自期望输入的特征数，该期望输入的形状为(batch_size, num_features)或(batch_size, num_features, sequence_length)
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: True
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C) 或 (N, C, L)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差

### 示例

```python
# 使用可学习参数
m = nn.BatchNorm1d(100)

# 不使用可学习参数
m = nn.BatchNorm1d(100, affine=False)

input = torch.randn(20, 100)
output = m(input)
```

## 批量归一化层 (BatchNorm2d)

官方文档：[torch.nn.BatchNorm2d](https://pytorch.org/docs/stable/generated/torch.nn.BatchNorm2d.html)

### 参数

```python
torch.nn.BatchNorm2d(num_features, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True, device=None, dtype=None)
```

- **num_features** (int): 来自期望输入的特征数，该期望输入的形状为(batch_size, num_features, height, width)
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: True
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, H, W)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差

### 示例

```python
# 使用可学习参数
m = nn.BatchNorm2d(100)

# 不使用可学习参数
m = nn.BatchNorm2d(100, affine=False)

input = torch.randn(20, 100, 35, 45)
output = m(input)
```

## 批量归一化层 (BatchNorm3d)

官方文档：[torch.nn.BatchNorm3d](https://pytorch.org/docs/stable/generated/torch.nn.BatchNorm3d.html)

### 参数

```python
torch.nn.BatchNorm3d(num_features, eps=1e-05, momentum=0.1, affine=True, track_running_stats=True, device=None, dtype=None)
```

- **num_features** (int): 来自期望输入的特征数，该期望输入的形状为(batch_size, num_features, depth, height, width)
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: True
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, D, H, W)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差

### 示例

```python
# 使用可学习参数
m = nn.BatchNorm3d(100)

# 不使用可学习参数
m = nn.BatchNorm3d(100, affine=False)

input = torch.randn(20, 100, 35, 45, 10)
output = m(input)
```

## 组归一化层 (GroupNorm)

官方文档：[torch.nn.GroupNorm](https://pytorch.org/docs/stable/generated/torch.nn.GroupNorm.html)

### 参数

```python
torch.nn.GroupNorm(num_groups, num_channels, eps=1e-05, affine=True, device=None, dtype=None)
```

- **num_groups** (int): 将通道分成的组数
- **num_channels** (int): 输入通道数
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, *) 其中 * 表示任意数量的附加维度
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_channels)的可学习的缩放参数
- **bias** (torch.Tensor): 形状为(num_channels)的可学习的偏置参数

### 示例

```python
input = torch.randn(20, 6, 10, 10)

# 将6个通道分成3组
m = nn.GroupNorm(3, 6)

# 将6个通道分成6组（等同于InstanceNorm）
m = nn.GroupNorm(6, 6)

# 将所有6个通道放入单个组（等同于LayerNorm）
m = nn.GroupNorm(1, 6)

# 激活模块
output = m(input)
```

## 实例归一化层 (InstanceNorm1d)

官方文档：[torch.nn.InstanceNorm1d](https://pytorch.org/docs/stable/generated/torch.nn.InstanceNorm1d.html)

### 参数

```python
torch.nn.InstanceNorm1d(num_features, eps=1e-05, momentum=0.1, affine=False, track_running_stats=False, device=None, dtype=None)
```

- **num_features** (int): 输入特征数（C）
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: False
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: False
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, L)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数，仅当affine=True时存在
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数，仅当affine=True时存在
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值，仅当track_running_stats=True时存在
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差，仅当track_running_stats=True时存在

### 示例

```python
# 不使用仿射变换
m = nn.InstanceNorm1d(100)

# 使用仿射变换
m = nn.InstanceNorm1d(100, affine=True)

# 使用仿射变换和跟踪运行统计数据
m = nn.InstanceNorm1d(100, affine=True, track_running_stats=True)

input = torch.randn(20, 100, 40)
output = m(input)
```

## 实例归一化层 (InstanceNorm2d)

官方文档：[torch.nn.InstanceNorm2d](https://pytorch.org/docs/stable/generated/torch.nn.InstanceNorm2d.html)

### 参数

```python
torch.nn.InstanceNorm2d(num_features, eps=1e-05, momentum=0.1, affine=False, track_running_stats=False, device=None, dtype=None)
```

- **num_features** (int): 输入特征数（C）
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: False
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: False
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, H, W)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数，仅当affine=True时存在
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数，仅当affine=True时存在
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值，仅当track_running_stats=True时存在
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差，仅当track_running_stats=True时存在

### 示例

```python
# 不使用仿射变换
m = nn.InstanceNorm2d(100)

# 使用仿射变换
m = nn.InstanceNorm2d(100, affine=True)

# 使用仿射变换和跟踪运行统计数据
m = nn.InstanceNorm2d(100, affine=True, track_running_stats=True)

input = torch.randn(20, 100, 35, 45)
output = m(input)
```

## 实例归一化层 (InstanceNorm3d)

官方文档：[torch.nn.InstanceNorm3d](https://pytorch.org/docs/stable/generated/torch.nn.InstanceNorm3d.html)

### 参数

```python
torch.nn.InstanceNorm3d(num_features, eps=1e-05, momentum=0.1, affine=False, track_running_stats=False, device=None, dtype=None)
```

- **num_features** (int): 输入特征数（C）
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **momentum** (float): 用于计算running_mean和running_var的动量值。默认值: 0.1
- **affine** (bool): 如果设置为True，则此模块具有可学习的仿射参数。默认值: False
- **track_running_stats** (bool): 如果设置为True，则此模块跟踪运行均值和方差；如果设置为False，则此模块不跟踪此类统计数据，并且始终在训练和评估模式下使用批处理统计数据。默认值: False
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (N, C, D, H, W)
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(num_features)的可学习的缩放参数，仅当affine=True时存在
- **bias** (torch.Tensor): 形状为(num_features)的可学习的偏置参数，仅当affine=True时存在
- **running_mean** (torch.Tensor): 形状为(num_features)的运行均值，仅当track_running_stats=True时存在
- **running_var** (torch.Tensor): 形状为(num_features)的运行方差，仅当track_running_stats=True时存在

### 示例

```python
# 不使用仿射变换
m = nn.InstanceNorm3d(100)

# 使用仿射变换
m = nn.InstanceNorm3d(100, affine=True)

# 使用仿射变换和跟踪运行统计数据
m = nn.InstanceNorm3d(100, affine=True, track_running_stats=True)

input = torch.randn(20, 100, 10, 35, 45)
output = m(input)
```

## 层归一化 (LayerNorm)

官方文档：[torch.nn.LayerNorm](https://pytorch.org/docs/stable/generated/torch.nn.LayerNorm.html)

### 参数

```python
torch.nn.LayerNorm(normalized_shape, eps=1e-05, elementwise_affine=True, device=None, dtype=None)
```

- **normalized_shape** (int或list或torch.Size): 输入的形状，从最后一维开始归一化。如果是单个整数，则被视为单例列表，此模块将在最后一个维度上进行归一化，该维度应为指定的大小
- **eps** (float): 为数值稳定性而添加到分母的值。默认值: 1e-5
- **elementwise_affine** (bool): 如果设置为True，则此模块具有可学习的每元素仿射参数，初始化为1（对于权重）和0（对于偏置）。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (*, normalized_shape[0], normalized_shape[1], ...) 其中 * 表示任意数量的前导维度
- **输出**: 与输入形状相同

### 变量

- **weight** (torch.Tensor): 形状为(normalized_shape)的可学习的缩放参数
- **bias** (torch.Tensor): 形状为(normalized_shape)的可学习的偏置参数

### 示例

```python
# 归一化最后3个维度，即特征维度，同时学习每个元素的仿射参数
m = nn.LayerNorm([10, 20, 30])

# 归一化最后一个维度，即特征维度，同时学习每个元素的仿射参数
m = nn.LayerNorm(30)

# 归一化最后3个维度，即特征维度，但不学习仿射参数
m = nn.LayerNorm([10, 20, 30], elementwise_affine=False)

input = torch.randn(20, 5, 10, 20, 30)
output = m(input)
```