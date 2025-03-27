import { Form, Switch} from 'antd';
import { useFlowStore } from '@/stores/useFlowStore';


const ReluConfigForm = ({ config }) => {
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
      <h3> nn.ReLU </h3>
      <p> put description here </p>
    </div>
  );
};

export default ReluConfigForm;