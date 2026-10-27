import { addGeneratorUsingPost } from '@/services/backend/generatorController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  visible: boolean;
  columns: ProColumns<API.Generator>[];
  onSubmit: (values: API.GeneratorAddRequest) => void;
  onCancel: () => void;
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.GeneratorAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    // 单独解析、捕获JSON格式错误
    if (fields.fileConfig) {
      try {
        fields.fileConfig = JSON.parse(fields.fileConfig as string);
      } catch {
        hide();
        message.error('fileConfig JSON格式不正确！');
        return false;
      }
    } else {
      fields.fileConfig = {};
    }

    if (fields.modelConfig) {
      try {
        fields.modelConfig = JSON.parse(fields.modelConfig as string);
      } catch {
        hide();
        message.error('modelConfig JSON格式不正确！');
        return false;
      }
    } else {
      fields.modelConfig = {};
    }

    await addGeneratorUsingPost(fields);
    hide();
    message.success('创建成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('创建失败，' + error.message);
    return false;
  }
};

/**
 * 创建弹窗
 * @param props
 * @constructor
 */
const CreateModal: React.FC<Props> = (props) => {
  const { visible, columns, onSubmit, onCancel } = props;

  return (
    <Modal
      destroyOnClose
      title={'创建'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.GeneratorAddRequest) => {
          const success = await handleAdd(values);
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default CreateModal;
