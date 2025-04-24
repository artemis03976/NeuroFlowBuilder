import withConfigForm from '@/components/Nodes/withConfigForm';

const title = 'nn.ReLU';
const description = 'ReLU激活函数将所有负值置为0，保持正值不变。';

const ReluFormContent = ({ form, config }) => {
  return null;
};

const ReluConfigForm = withConfigForm(
  title, 
  description, 
  ReluFormContent
);

export default ReluConfigForm;