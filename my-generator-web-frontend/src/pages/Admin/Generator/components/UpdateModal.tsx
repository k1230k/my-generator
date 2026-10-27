import { updateGeneratorUsingPost } from '@/services/backend/generatorController';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { message, Modal } from 'antd';
import React from 'react';

interface Props {
  oldData?: API.Generator;
  visible: boolean;
  columns: ProColumns<API.Generator>[];
  onSubmit: (values: API.GeneratorAddRequest) => void;
  onCancel: () => void;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.GeneratorUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    // 解析 fileConfig，捕获JSON错误
    try {
      fields.fileConfig = JSON.parse((fields.fileConfig || '{}') as string);
    } catch {
      hide();
      message.error('fileConfig JSON格式不正确！');
      return false;
    }
    // 解析 modelConfig，捕获JSON错误
    try {
      fields.modelConfig = JSON.parse((fields.modelConfig || '{}') as string);
    } catch {
      hide();
      message.error('modelConfig JSON格式不正确！');
      return false;
    }

    await updateGeneratorUsingPost(fields);
    hide();
    message.success('更新成功');
    return true;
  } catch (error: any) {
    hide();
    message.error('更新失败，' + error.message);
    return false;
  }
};

/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {

  const { oldData, visible, columns, onSubmit, onCancel } = props;

  if (!oldData) {
    return <></>;
  }

  return (
    <Modal
      destroyOnClose
      title={'更新'}
      open={visible}
      footer={null}
      onCancel={() => {
        onCancel?.();
      }}
    >
      <ProTable
        type="form"
        columns={columns}
        form={{
          initialValues: {
            ...oldData,
            tags: JSON.parse(oldData.tags || '[]'),
          }
        }}
        onSubmit={async (values: API.GeneratorUpdateRequest) => {
          const success = await handleUpdate({
            ...values,
            id: oldData.id as any,
          });
          if (success) {
            onSubmit?.(values);
          }
        }}
      />
    </Modal>
  );
};
export default UpdateModal;
