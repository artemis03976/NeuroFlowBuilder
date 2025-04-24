import { Form, InputNumber, Switch} from 'antd';
import withConfigForm from '@/components/Nodes/withConfigForm';

const title = 'nn.Linear';
const description = '线性层将输入数据与权重矩阵相乘，并可选择性地加上偏置项。';

const LinearFormContent = ({ form, config }) => {
  return (
    <>
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
    </>
  );
};

const LinearConfigForm = withConfigForm(
  title, 
  description, 
  LinearFormContent
);

export default LinearConfigForm;
