import { Form, Input } from 'antd';
import withConfigForm from '@/components/Nodes/withConfigForm';

const title = 'Output';
const description = '输出节点定义了神经网络的输出点';

const NetworkOutputFormContent = ({ form, config }) => {
  return (
    <>
      <Form.Item
        label="名称"
        name="name"
      >
        <Input
          id="output_name"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </>
  );
};

const NetworkOutputConfigForm = withConfigForm(
  title, 
  description, 
  NetworkOutputFormContent
);

export default NetworkOutputConfigForm;