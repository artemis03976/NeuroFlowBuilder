import React from "react";
import { Divider, Form, InputNumber, Select, Switch } from "antd";
import { OPTIMIZER_TYPE, OPTIMIZER_META } from "@optimizer-configs";


export const basicInitValues = {
  epochs: 10,
  batch_size: 32,
  optimizer: OPTIMIZER_TYPE.ADAM,
  dataset_type: 'mnist',
  dataset_path: ''
}


export const BasicConfig = ({ form }) => {
  const selectedOptimizer = Form.useWatch('optimizer', form);
  const currentOptimizer = OPTIMIZER_META[selectedOptimizer];
  const datasetType = Form.useWatch('dataset_type', form);

  return (
    <>
      {/* Basic Settings */}
      <Form.Item label="Epochs" name="epochs" rules={[{ required: true }]}>
        <InputNumber min={1} max={1000} />
      </Form.Item>

      <Form.Item label="Batch Size" name="batch_size" rules={[{ required: true }]}>
        <InputNumber min={1} max={1024} />
      </Form.Item>

      {/* Optimizer Settings */}
      <Divider orientation="left">Optimizer</Divider>
      <Form.Item label="Type" name="optimizer" rules={[{ required: true }]}>
        <Select>
          {Object.values(OPTIMIZER_TYPE).map(opt => (
            <Select.Option key={opt} value={opt}>{OPTIMIZER_META[opt].label}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {currentOptimizer && (
        <Form.Item label="Params">
          <div style={{ paddingLeft: 16, borderLeft: '2px solid #f0f0f0' }}>
            {currentOptimizer.params.map(param => (
              <Form.Item
                key={param.name}
                label={param.label}
                name={["optimizer_params", param.name]}
                initialValue={param.defaultValue}
                rules={[{ required: true }]}
              >
                {param.type === 'number' ? (
                  <InputNumber min={param.min} max={param.max} step={param.step}/>
                ) : (
                  <Switch />
                )}
              </Form.Item>
            ))}
          </div>
        </Form.Item>
      )}

      {/* DatasetSettings */}
      <Divider orientation="left">Dataset</Divider>
      <Form.Item label="Type" name="dataset_type" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="mnist">MNIST</Select.Option>
          <Select.Option value="cifar10">CIFAR-10</Select.Option>
          <Select.Option value="custom">Custom</Select.Option>
        </Select>
      </Form.Item>

      {datasetType === 'custom' && (
        <Form.Item
          label="Dataset Path"
          name="dataset_path"
          rules={[{ required: true, message: 'Please enter dataset path' }]}
        >
          <Input/>
        </Form.Item>
      )}
    </>
)};