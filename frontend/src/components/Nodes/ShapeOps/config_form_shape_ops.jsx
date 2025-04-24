import { Form, InputNumber, Select } from 'antd';
import InputNumberArray from '@/components/common/InputNumberArray';
import withConfigForm from '@/components/Nodes/withConfigForm';
const { Option } = Select;

const title = 'Shape Operations';
const description = '形状操作允许你改变张量的维度，包括重塑、视图变换、压缩和扩展维度等操作。';

const ShapeOpsFormContent = ({ form, config }) => {
  const operation = Form.useWatch('operation', form);

  return (
    <>
      <Form.Item
        label="Operation Type"
        name="operation"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="reshape">Reshape</Option>
          <Option value="view">View</Option>
          <Option value="squeeze">Squeeze</Option>
          <Option value="unsqueeze">Unsqueeze</Option>
        </Select>
      </Form.Item>

      {/* Different input params for various shape operations */}
      {['reshape', 'view'].includes(operation) && (
        <Form.Item
          label="Target Shape"
          name="targetShape"
          rules={[
            { required: true, message: '请输入目标形状'}
          ]}
        >
          <InputNumberArray 
            placeholder="Seperate dim by ','(2, -1, 64)" 
            style={{ width: '100%' }}
          />
        </Form.Item>
      )}

      {['squeeze', 'unsqueeze'].includes(operation) && (
        <Form.Item
          label="Dimension"
          name="dim"
          rules={[{ required: true }]}
        >
          <InputNumber 
            min={-1}
            placeholder="输入维度索引(-1表示最后维度)"
            style={{ width: '100%' }} 
          />
        </Form.Item>
      )}
    </>
  );
};

const ShapeOpsConfigForm = withConfigForm(
  title,
  description,
  ShapeOpsFormContent,
);

export default ShapeOpsConfigForm;