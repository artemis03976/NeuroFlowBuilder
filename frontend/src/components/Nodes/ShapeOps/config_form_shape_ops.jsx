import { Form, InputNumber, Select, Input} from 'antd';
import { useFlowStore } from '@/stores/useFlowStore';
const { Option } = Select;


const ShapeOpsConfigForm = ({ config }) => {
  const updateNodeConfig = useFlowStore(state => state.updateNodeConfig);
  const [form] = Form.useForm();
  const operation = Form.useWatch('operation', form);

  const handleChange = (newValues) => {
    // Transfer targetShape to number[]
    if (newValues.targetShapeStr) {
      newValues.targetShape = newValues.targetShapeStr
        .split(',')
        .map(Number)
        .filter(n => !isNaN(n));
      delete newValues.targetShapeStr;
    }

    updateNodeConfig({
      ...config,
      ...newValues
    });
  };

  return (
    <div className="config-form">
      <h3> Shape Operations </h3>
      <p> put description here </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={{
          ...config,
          targetShapeStr: config.targetShape?.join(',') // Transfer number[] to string when initialize
        }}
        onValuesChange={handleChange}
        autoComplete="off"
      >
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

        {/* Shape operation params */}
        {['reshape', 'view'].includes(operation) && (
          <Form.Item
            label="Target Shape"
            name="targetShapeStr"
            rules={[
              { 
                validator: (_, value) => {
                  const nums = value.split(',').map(Number);
                  const valid = nums.every(n => !isNaN(n));
                  return valid ? Promise.resolve() : Promise.reject('Please enter valid number');
                }
              }
            ]}
          >
            <Input placeholder="Seperate dim by ','（2,-1,64）" />
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
              placeholder="输入维度索引（-1表示最后维度）" 
            />
          </Form.Item>
        )}
        
      </Form>
    </div>
  );
};

export default ShapeOpsConfigForm;