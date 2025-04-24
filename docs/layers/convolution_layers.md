# PyTorch 卷积层参数文档

本文档整理了PyTorch v2.3.0版本中`torch.nn`模块下的卷积层相关参数信息，用于NeuroFlow Builder的节点配置文件创建参考。

## 目录

- [一维卷积层 (Conv1d)](#一维卷积层-conv1d)
- [二维卷积层 (Conv2d)](#二维卷积层-conv2d)
- [三维卷积层 (Conv3d)](#三维卷积层-conv3d)
- [一维转置卷积层 (ConvTranspose1d)](#一维转置卷积层-convtranspose1d)
- [二维转置卷积层 (ConvTranspose2d)](#二维转置卷积层-convtranspose2d)
- [三维转置卷积层 (ConvTranspose3d)](#三维转置卷积层-convtranspose3d)

## 一维卷积层 (Conv1d)

官方文档：[torch.nn.Conv1d](https://pytorch.org/docs/stable/generated/torch.nn.Conv1d.html)

`torch.nn.Conv1d`对由多个输入平面组成的输入信号应用一维卷积。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入信号的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple/str | 0 | 输入的两侧添加隐式零填充。可以是字符串{'valid', 'same'}、单个数字或元组 |
| dilation | int/tuple | 1 | 卷积核元素之间的间距，也称为空洞算法 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| padding_mode | str | 'zeros' | 填充模式，可选值：'zeros', 'reflect', 'replicate', 'circular' |

### 示例

```python
# 使用方形卷积核和相等的步长
m = nn.Conv1d(16, 33, 3, stride=2)

# 非方形卷积核、不等步长和填充
m = nn.Conv1d(16, 33, 5, stride=1, padding=2)

input = torch.randn(20, 16, 50)
output = m(input)
```

## 二维卷积层 (Conv2d)

官方文档：[torch.nn.Conv2d](https://pytorch.org/docs/stable/generated/torch.nn.Conv2d.html)

`torch.nn.Conv2d`对由多个输入平面组成的输入信号应用二维卷积。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入图像的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple/str | 0 | 输入的两侧添加隐式零填充。可以是字符串{'valid', 'same'}、单个数字或元组(padH, padW) |
| dilation | int/tuple | 1 | 卷积核元素之间的间距，也称为空洞算法 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| padding_mode | str | 'zeros' | 填充模式，可选值：'zeros', 'reflect', 'replicate', 'circular' |

### 示例

```python
# 使用方形卷积核和相等的步长
m = nn.Conv2d(16, 33, 3, stride=2)

# 非方形卷积核、不等步长和填充
m = nn.Conv2d(16, 33, (3, 5), stride=(2, 1), padding=(4, 2))

# 非方形卷积核、不等步长、填充和扩张
m = nn.Conv2d(16, 33, (3, 5), stride=(2, 1), padding=(4, 2), dilation=(3, 1))

input = torch.randn(20, 16, 50, 100)
output = m(input)
```

## 三维卷积层 (Conv3d)

官方文档：[torch.nn.Conv3d](https://pytorch.org/docs/stable/generated/torch.nn.Conv3d.html)

`torch.nn.Conv3d`对由多个输入平面组成的输入信号应用三维卷积。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入图像的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple/str | 0 | 输入的两侧添加隐式零填充。可以是字符串{'valid', 'same'}、单个数字或元组(padT, padH, padW) |
| dilation | int/tuple | 1 | 卷积核元素之间的间距，也称为空洞算法 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| padding_mode | str | 'zeros' | 填充模式，可选值：'zeros', 'reflect', 'replicate', 'circular' |

### 示例

```python
# 使用方形卷积核和相等的步长
m = nn.Conv3d(16, 33, 3, stride=2)

# 非方形卷积核、不等步长和填充
m = nn.Conv3d(16, 33, (3, 5, 2), stride=(2, 1, 1), padding=(4, 2, 0))

input = torch.randn(20, 16, 10, 50, 100)
output = m(input)
```

## 一维转置卷积层 (ConvTranspose1d)

官方文档：[torch.nn.ConvTranspose1d](https://pytorch.org/docs/stable/generated/torch.nn.ConvTranspose1d.html)

`torch.nn.ConvTranspose1d`可以看作是Conv1d相对于其输入的梯度。也称为分数步长卷积或反卷积（尽管它不是真正的反卷积操作）。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入信号的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple | 0 | 控制添加到输入两侧的零填充量，实际填充为`dilation * (kernel_size - 1) - padding` |
| output_padding | int/tuple | 0 | 添加到输出形状一侧的额外大小 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| dilation | int/tuple | 1 | 卷积核元素之间的间距 |
| padding_mode | str | 'zeros' | 填充模式，对于ConvTranspose1d，只支持'zeros' |

### 说明

`padding`参数有效地向输入的两侧添加了`dilation * (kernel_size - 1) - padding`数量的零填充。这样设置是为了当Conv1d和ConvTranspose1d使用相同参数初始化时，它们在输入和输出形状方面互为逆运算。

当`stride > 1`时，Conv1d将多个输入形状映射到相同的输出形状。`output_padding`用于解决这种歧义，通过有效地增加计算出的输出形状的一侧。

## 二维转置卷积层 (ConvTranspose2d)

官方文档：[torch.nn.ConvTranspose2d](https://pytorch.org/docs/stable/generated/torch.nn.ConvTranspose2d.html)

`torch.nn.ConvTranspose2d`可以看作是Conv2d相对于其输入的梯度。也称为分数步长卷积或反卷积（尽管它不是真正的反卷积操作）。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入信号的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple | 0 | 控制添加到输入两侧的零填充量，实际填充为`dilation * (kernel_size - 1) - padding` |
| output_padding | int/tuple | 0 | 添加到输出形状一侧的额外大小 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| dilation | int/tuple | 1 | 卷积核元素之间的间距 |
| padding_mode | str | 'zeros' | 填充模式，对于ConvTranspose2d，只支持'zeros' |

### 示例

```python
# 使用方形卷积核和相等的步长
m = nn.ConvTranspose2d(16, 33, 3, stride=2)

# 非方形卷积核、不等步长和填充
m = nn.ConvTranspose2d(16, 33, (3, 5), stride=(2, 1), padding=(4, 2))

input = torch.randn(20, 16, 50, 100)
output = m(input)

# 也可以指定精确的输出大小
input = torch.randn(1, 16, 12, 12)
downsample = nn.Conv2d(16, 16, 3, stride=2, padding=1)
upsample = nn.ConvTranspose2d(16, 16, 3, stride=2, padding=1)
h = downsample(input)
output = upsample(h, output_size=input.size())
```

## 三维转置卷积层 (ConvTranspose3d)

官方文档：[torch.nn.ConvTranspose3d](https://pytorch.org/docs/stable/generated/torch.nn.ConvTranspose3d.html)

`torch.nn.ConvTranspose3d`可以看作是Conv3d相对于其输入的梯度。也称为分数步长卷积或反卷积（尽管它不是真正的反卷积操作）。

### 参数

| 参数名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| in_channels | int | 必填 | 输入信号的通道数 |
| out_channels | int | 必填 | 卷积产生的通道数 |
| kernel_size | int/tuple | 必填 | 卷积核的大小 |
| stride | int/tuple | 1 | 卷积的步长 |
| padding | int/tuple | 0 | 控制添加到输入两侧的零填充量，实际填充为`dilation * (kernel_size - 1) - padding` |
| output_padding | int/tuple | 0 | 添加到输出形状一侧的额外大小 |
| groups | int | 1 | 输入通道到输出通道的阻塞连接数 |
| bias | bool | True | 如果为True，则向输出添加可学习的偏置 |
| dilation | int/tuple | 1 | 卷积核元素之间的间距 |
| padding_mode | str | 'zeros' | 填充模式，对于ConvTranspose3d，只支持'zeros' |

### 说明

`padding`参数有效地向输入的两侧添加了`dilation * (kernel_size - 1) - padding`数量的零填充。这样设置是为了当Conv3d和ConvTranspose3d使用相同参数初始化时，它们在输入和输出形状方面互为逆运算。

当`stride > 1`时，Conv3d将多个输入形状映射到相同的输出形状。`output_padding`用于解决这种歧义，通过有效地增加计算出的输出形状的一侧。

## 注意事项

1. 在某些情况下，当在CUDA设备上使用CuDNN时，这些操作可能会选择非确定性算法以提高性能。如果这是不希望的，可以通过设置`torch.backends.cudnn.deterministic = True`来尝试使操作确定性（可能会以性能为代价）。

2. 对于所有转置卷积层，`padding_mode`参数目前只支持'zeros'值。

3. 当`groups == in_channels`且`out_channels == K * in_channels`（其中K是正整数）时，这种操作也被称为"深度卷积"。

4. 对于`padding='same'`，如果权重是偶数长度且在任何维度上扩张是奇数，则可能需要在内部进行完整的pad()操作，这会降低性能。