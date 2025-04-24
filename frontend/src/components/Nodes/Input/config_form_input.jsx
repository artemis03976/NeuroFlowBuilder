import { Form, Input } from 'antd';
import InputNumberArray from '@/components/common/InputNumberArray';
import withConfigForm from '@/components/Nodes/withConfigForm';

const title = 'Input';
const description = '输入节点定义了神经网络的输入张量形状';

const NetworkInputFormContent = ({ form, config }) => {
  return (
    <>
      <Form.Item
        label="名称"
        name="name"
      >
        <Input
          id="input_name"
          style={{ width: '100%' }}
        />
      </Form.Item>

      <Form.Item
        label="输入形状"
        name="shape"
        tooltip="输入张量的形状，例如 3, 224, 224 表示一个 3 通道、224x224 的图像"
      >
        <InputNumberArray
          id="input_shape"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

const NetworkInputConfigForm = withConfigForm(
  title, 
  description, 
  NetworkInputFormContent
);

export default NetworkInputConfigForm;