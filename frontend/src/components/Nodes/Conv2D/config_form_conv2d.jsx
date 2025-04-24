import { Form, InputNumber, Switch } from 'antd';
import InputNumberArray from '@/components/common/InputNumberArray';
import withConfigForm from '@/components/Nodes/withConfigForm';

const title = 'nn.Conv2D';
const description = '二维卷积层，用于处理图像等二维数据。';

const Conv2DFormContent = ({ form, config }) => {
  return (
    <>
      <Form.Item
        label="Input Channels"
        name="in_channels"
      >
        <InputNumber
          id="input_channels"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Output Channels"
        name="out_channels"
      >
        <InputNumber
          id="output_channels"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="Kernel Size"
        name="kernel_size"
      >
        <InputNumberArray
          id="kernel_size"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item label="Bias" name="bias">
        <Switch />
      </Form.Item>
    </>
  );
};

const Conv2DConfigForm = withConfigForm(
  title, 
  description, 
  Conv2DFormContent
);

export default Conv2DConfigForm;