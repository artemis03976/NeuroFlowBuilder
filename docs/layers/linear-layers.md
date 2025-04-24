# PyTorch 线性层参数文档

本文档整理了PyTorch v2.3.0版本中`torch.nn`模块下的线性层相关参数信息，用于NeuroFlow Builder的节点配置文件创建参考。

## 目录

- [线性层 (Linear)](#线性层-linear)
- [双线性层 (Bilinear)](#双线性层-bilinear)
- [恒等层 (Identity)](#恒等层-identity)

## 线性层 (Linear)

官方文档：[torch.nn.Linear](https://pytorch.org/docs/stable/generated/torch.nn.Linear.html)

### 参数

```python
torch.nn.Linear(in_features, out_features, bias=True, device=None, dtype=None)
```

- **in_features** (int): 每个输入样本的大小
- **out_features** (int): 每个输出样本的大小
- **bias** (bool): 如果设置为False，该层将不会学习加性偏置。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入**: (*, H_in)，其中*表示任意数量的维度，包括无，且H_in = in_features
- **输出**: (*, H_out)，其中除最后一个维度外，所有维度与输入形状相同，且H_out = out_features

### 变量

- **weight** (torch.Tensor): 形状为(out_features, in_features)的可学习权重
- **bias** (torch.Tensor): 形状为(out_features)的可学习偏置

### 示例

```python
# 创建一个线性层，输入特征数为20，输出特征数为30
m = nn.Linear(20, 30)

# 创建一个输入张量，批量大小为128，每个样本有20个特征
input = torch.randn(128, 20)

# 通过线性层进行前向传播
output = m(input)

# 打印输出张量的形状
print(output.size())  # 输出: torch.Size([128, 30])
```

## 双线性层 (Bilinear)

官方文档：[torch.nn.Bilinear](https://pytorch.org/docs/stable/generated/torch.nn.Bilinear.html)

### 参数

```python
torch.nn.Bilinear(in1_features, in2_features, out_features, bias=True, device=None, dtype=None)
```

- **in1_features** (int): 第一个输入样本的大小
- **in2_features** (int): 第二个输入样本的大小
- **out_features** (int): 输出样本的大小
- **bias** (bool): 如果设置为False，该层将不会学习加性偏置。默认值: True
- **device** (torch.device): 指定张量存放的设备
- **dtype** (torch.dtype): 指定张量的数据类型

### 形状

- **输入1**: (*, H_in1)，其中*表示任意数量的维度，且H_in1 = in1_features
- **输入2**: (*, H_in2)，其中*表示任意数量的维度，且H_in2 = in2_features
- **输出**: (*, H_out)，其中除最后一个维度外，所有维度与输入形状相同，且H_out = out_features

### 变量

- **weight** (torch.Tensor): 形状为(out_features, in1_features, in2_features)的可学习权重
- **bias** (torch.Tensor): 形状为(out_features)的可学习偏置

### 示例

```python
# 创建一个双线性层，第一个输入特征数为20，第二个输入特征数为30，输出特征数为40
m = nn.Bilinear(20, 30, 40)

# 创建两个输入张量，批量大小为128
input1 = torch.randn(128, 20)
input2 = torch.randn(128, 30)

# 通过双线性层进行前向传播
output = m(input1, input2)

# 打印输出张量的形状
print(output.size())  # 输出: torch.Size([128, 40])
```

## 恒等层 (Identity)

官方文档：[torch.nn.Identity](https://pytorch.org/docs/stable/generated/torch.nn.Identity.html)

### 参数

```python
torch.nn.Identity(*args, **kwargs)
```

- **args**: 任何参数（未使用）
- **kwargs**: 任何关键字参数（未使用）

### 形状

- **输入**: (*)，其中*表示任意形状
- **输出**: 与输入形状相同

### 示例

```python
# 创建一个恒等层
m = nn.Identity()

# 创建一个输入张量
input = torch.randn(128, 20)

# 通过恒等层进行前向传播
output = m(input)

# 打印输出张量的形状
print(output.size())  # 输出: torch.Size([128, 20])
```