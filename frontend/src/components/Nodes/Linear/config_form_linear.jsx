import { Form, InputNumber, Switch} from 'antd';
import { useFlowStore } from '@/stores/useFlowStore';


const LinearConfigForm = ({ config }) => {
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
      <h3> nn.Linear </h3>
      <p> put description here </p>

      <Form
        form={form}
        layout="vertical"
        initialValues={config}
        onValuesChange={handleChange}
        autoComplete="off"
      >
        <Form.Item
          label="Input Features"
          name="in_features"
        >
          <InputNumber
            id="input_features"
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item
          label="Output Features"
          name="out_features"
        >
          <InputNumber
            id="output_features"
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

export default LinearConfigForm;
