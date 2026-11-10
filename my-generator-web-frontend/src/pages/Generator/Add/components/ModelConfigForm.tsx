import { CloseOutlined } from '@ant-design/icons';
import { Button, Card, Form, FormListFieldData, Input, Space } from 'antd';

interface Props {
    //父组件传过来的useRef<ProFormInstance>()用来拿表单实例、获取表单值
    formRef: any;
    //回显旧数据
    oldData: any;
}

export default (props: Props) => {
    const { formRef, oldData } = props;

    /**
     * 单个字段表单视图
     * @param field
     * @param remove
     */
    const singleFieldFormView = (
        field: FormListFieldData,
        remove?: (index: number | number[]) => void,
    ) => {
        return (
            //field.key，Form.List给每条数据生成的标识
            //此处key等于这个，是React要求的列表渲染标识
            <Space key={field.key}>
                {/*field.name，Form.List给当前这条分配的表单路径下标*/}
                {/*fieldName是对象属性名，与后端数据对应*/}
                <Form.Item label="字段名称" name={[field.name, 'fieldName']}>
                    <Input />
                </Form.Item>
                <Form.Item label="描述" name={[field.name, 'description']}>
                    <Input />
                </Form.Item>
                <Form.Item label="类型" name={[field.name, 'type']}>
                    <Input />
                </Form.Item>
                <Form.Item label="默认值" name={[field.name, 'defaultValue']}>
                    <Input />
                </Form.Item>
                <Form.Item label="缩写" name={[field.name, 'abbr']}>
                    <Input />
                </Form.Item>
                {/*只有remove存在才渲染这个删除按钮*/}
                {remove && (
                    <CloseOutlined
                        onClick={() => {
                            remove?.(field.name);
                        }}
                    />
                )}
            </Space>
        );
    };

    return (

        //外层分步表单每一步都有一个name，表示这一步里面填的数据划分在这个name下面
        //此处name={['modelConfig', 'models']}，modelConfig就是对应上面哪个name
        //models是为下面的这些数据再起一个key，放在这个key下面
        <Form.List name={['modelConfig', 'models']}>
          {/*(fields, { add, remove })是固定回调，第一个位置是传入这个封装的字段数组数据*/}
          {(fields, { add, remove }) => {
                return (
                    <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                        {fields.map((field) => {
                            //**表单实时内存里的数据（用户已经在页面上输入、修改后的最新值，是动态的）
                            const modelConfig =
                                formRef?.current?.getFieldsValue()?.modelConfig ?? oldData?.modelConfig;
                            const groupKey = modelConfig.models?.[field.name]?.groupKey;

                            return (
                                <Card
                                    size="small"
                                    title={groupKey ? '分组' : '未分组字段'}
                                    key={field.key}
                                    extra={
                                        <CloseOutlined
                                            onClick={() => {
                                                remove(field.name);
                                            }}
                                        />
                                    }
                                >
                                    {groupKey ? (
                                        <Space>
                                            <Form.Item label="分组key" name={[field.name, 'groupKey']}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="组名" name={[field.name, 'groupName']}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="类型" name={[field.name, 'type']}>
                                                <Input />
                                            </Form.Item>
                                            <Form.Item label="条件" name={[field.name, 'condition']}>
                                                <Input />
                                            </Form.Item>
                                        </Space>
                                    ) : (
                                        singleFieldFormView(field)
                                    )}

                                    {/* 组内字段 */}
                                    {groupKey && (
                                        <Form.Item label="组内字段">
                                            <Form.List name={[field.name, 'models']}>
                                                {(subFields, subOpt) => (
                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            rowGap: 16,
                                                        }}
                                                    >
                                                        {subFields.map((subField) =>
                                                            singleFieldFormView(subField, subOpt.remove),
                                                        )}
                                                        <Button type="dashed" onClick={() => subOpt.add()} block>
                                                            添加组内字段
                                                        </Button>
                                                    </div>
                                                )}
                                            </Form.List>
                                        </Form.Item>
                                    )}
                                </Card>
                            );
                        })}

                        <Button type="dashed" onClick={() => add()}>
                            添加字段
                        </Button>
                        <Button
                            type="dashed"
                            onClick={() =>
                                add({
                                    groupName: '分组',
                                    groupKey: 'group',
                                })
                            }
                        >
                            添加分组
                        </Button>
                        <div style={{ marginBottom: 16 }} />
                    </div>
                );
            }}
        </Form.List>
    );
};
