import React from 'react';
import { Form, Button, Alert, Collapse } from 'antd';
import { ThunderboltOutlined, SaveOutlined } from '@ant-design/icons';
import { BasicConfig, basicInitValues } from "./configs/BasicConfig";
import { AdvancedConfig, advancedInitValues } from "./configs/AdvancedConfig";
import { useTrainingStore } from "@/stores/useTrainingStore";
import { useExportStore } from "@/stores/useExportStore";


const TrainingPanel = () => {
  const [ form ] = Form.useForm();
  const { submitting, onStartTraining } = useTrainingStore();

  const collapseItems = [
    {
      key: 'basic',
      label: 'Basic Training Settings',
      children: <BasicConfig form={form}/>
    },
    {
      key: 'advanced',
      label: 'Advanced Training Settings',
      children: <AdvancedConfig />
    }
  ];

  const initialValues = {
    ...basicInitValues,
    ...advancedInitValues
  };

  const handleSubmit = async (values) => {
    try {
      const modelId = useExportStore.getState().modelId;
      await onStartTraining({ modelId, ...values });
    } catch {}
  };

  return (
    <div className="training-panel">
      <h2><ThunderboltOutlined /> Training Settings </h2>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={initialValues}
      >
        <Collapse
          items={collapseItems}
          defaultActiveKey={['basic']}
          forceRender={true}
          accordion
          ghost
        />

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            block
            loading={submitting}
            disabled={submitting}
          >
            {submitting ? 'Constructing...' : 'Start'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TrainingPanel;
