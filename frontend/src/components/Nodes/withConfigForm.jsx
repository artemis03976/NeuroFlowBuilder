import React from 'react';
import { useFlowStore } from '@/stores/useFlowStore';
import { Form } from 'antd';

/**
 * 高阶组件，用于封装节点配置表单的通用逻辑
 * @param {string} title - 节点标题
 * @param {string} description - 节点描述
 * @param {React.ComponentType} FormContent - 表单内容组件
 * @param {Object} options - 可选配置项
 * @returns {React.ComponentType} - 包装后的组件
 */

const withConfigForm = (title, description, FormContent, options = {}) => {
  const EnhancedConfigForm = ({ config }) => {
    const updateNodeConfig = useFlowStore(state => state.updateNodeConfig);
    const selectedElementId = useFlowStore(state => state.selectedElementId);
    const [form] = Form.useForm(); // 创建 form 实例

    // 获取初始值
    const getInitialValues = () => {
      if (options.getInitialValues) {
        return options.getInitialValues(config);
      }
      return config;
    };

    // 定义通用的 handleChange 函数
    const handleChange = (newValues) => {
      if (!selectedElementId) return; // 确保有选中的节点

      // 处理值
      let processedValues = { ...newValues };
      if (options.processValues) {
        processedValues = options.processValues(newValues, config);
      }

      updateNodeConfig(selectedElementId, {
        ...config,
        ...newValues
      });
    };

    // 渲染被包装的组件，并传入必要的 props
    return (
      <div className="config-form">
        <h3>{title}</h3>
        <p>{description}</p>

        <Form
          form={form}
          layout="vertical"
          initialValues={getInitialValues()}
          onValuesChange={handleChange}
          autoComplete="off"
        >
          <FormContent form={form} config={config} />
        </Form>
      </div>
    );
  };

  return EnhancedConfigForm;
};

export default withConfigForm;