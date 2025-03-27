import { Divider, Form, Select, Switch } from "antd";
import React from "react";

// Scheduler Config (TODO: move to /configs)
const schedulers = [
  'StepLR', 'CosineAnnealing', 'ReduceLROnPlateau', 'OneCycleLR'
];

export const advancedInitValues = {
  scheduler: 'ReduceLROnPlateau',
  use_amp: false,
  early_stopping: false
}

export const AdvancedConfig = () => (
  <>
    {/* 高级配置 */}
    <Form.Item label="Learning Rate Scheduler" name="scheduler">
      <Select allowClear>
        {schedulers.map(s => (
          <Select.Option key={s} value={s}>{s}</Select.Option>
        ))}
      </Select>
    </Form.Item>

    <Form.Item label="Auto Mixed Precision" name="use_amp" valuePropName="checked">
      <Switch />
    </Form.Item>

    <Form.Item label="Early Stopping" name="early_stopping" valuePropName="checked">
      <Switch />
    </Form.Item>
  </>
);