import { Form, InputNumber, Switch, Input } from 'antd';
import { useFlowStore } from '@/stores/useFlowStore';


const Conv2DConfigForm = ({ config }) => {
  const updateNodeConfig = useFlowStore(state => state.updateNodeConfig);
  const [form] = Form.useForm();

  const handleChange = (newValues) => {
    updateNodeConfig({
      ...config,
      ...newValues
    });
  };

  return (
    <div className="config-form">
      <h3> nn.Conv2D </h3>
      <p> put description here </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={config}
        onValuesChange={handleChange}
        autoComplete="off"
      >
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
          <Input
            id="kernel_size"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item label="Bias" name="bias">
          <Switch />
        </Form.Item>
      </Form>
    </div>
  );
};

export default Conv2DConfigForm;