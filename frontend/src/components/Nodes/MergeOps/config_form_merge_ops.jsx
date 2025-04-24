import { Form, InputNumber, Select } from 'antd';
import withConfigForm from '@/components/Nodes/withConfigForm';
const { Option } = Select;

const title = 'Merge Operations';
const description = '合并操作允许你将多个张量合并成一个张量，包括连接(cat)和堆叠(stack)等操作。';

const MergeOpsFormContent = ({ form, config }) => {
  const operation = Form.useWatch('operation', form);

  return (
    <>
      <Form.Item
        label="Operation Type"
        name="operation"
        rules={[{ required: true }]}
      >
        <Select>
          <Option value="cat">Concatenate (cat)</Option>
          <Option value="stack">Stack</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Dimension"
        name="dim"
        rules={[{ required: true }]}
        tooltip="指定在哪个维度上进行合并操作，-1表示最后一个维度"
      >
        <InputNumber 
          min={-1}
          placeholder="输入维度索引(-1表示最后维度)"
          style={{ width: '100%' }} 
        />
      </Form.Item>
    </>
  );
};

const MergeOpsConfigForm = withConfigForm(
  title,
  description,
  MergeOpsFormContent,
);

export default MergeOpsConfigForm;