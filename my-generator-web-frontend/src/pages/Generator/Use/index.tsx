import {
  getGeneratorVoByIdUsingGet,
  useGeneratorUsingPost,
} from '@/services/backend/generatorController';
import { useModel, useParams } from '@@/exports';
import { DownloadOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Collapse,
  Divider,
  Form,
  Image,
  Input,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import { saveAs } from 'file-saver';
import React, { useEffect, useState } from 'react';
import { Link } from 'umi';

/**
 * 生成器使用页面
 * @constructor
 */
//React.FC可以自动添加children?: React.ReactNode
  //允许别人在这个组件的开闭标签中间塞内容，塞进去的全部内容打包放在
  // `props.children` 里面，组件内部可以拿出来渲染
const GeneratorUsePage: React.FC = () => {
  const { id } = useParams();
  //用来拿到表单的**控制器对象**，实现【父组件主动操控表单】，不是单纯收集表单值。
  const [form] = Form.useForm();
  //- `const formRef = useRef<ProFormInstance>()`：
  // 是ProComponents 的 StepsForm / ProForm 专用，是 ProForm 的实例控制器

  // - `const [form] = Form.useForm()`：
  // 是原生 antd Form 的实例控制器，是基础 antd Form 的

  // 底层本质：ProForm 内部封装了 antd Form，
  // 但是对外暴露的实例对象、获取方式不一样，API 大体相似，但不能混用

  const [loading, setLoading] = useState<boolean>(false);
  //这个data是生成器对象的VO类型
  const [data, setData] = useState<API.GeneratorVO>({});
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState ?? {};
  const [downloading, setDownloading] = useState<boolean>(false);
  //从data里获取到modelConfig这个对象，这个对象是模型配置类型
  //模型配置类型里是写与用户交互得到的代码生成器生成代码所需要的数据
  //比如：是否needGit的boolean值、author的需要替换的值
  const models = data?.modelConfig?.models ?? [];
  //上面这个models里面的个体是ModelInfo类型的
  //这个ModelInfo可以是分组的或者是不分组的
  //如果是分组的

  /**
   * 先从数据库差数据到页面中显示
   * 加载数据
   */
  const loadData = async () => {
    if (!id) {
      return;
    }
    setLoading(true);
    try {
      const res = await getGeneratorVoByIdUsingGet({
        id,
      });
      setData(res.data || {});
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  /**
   * 下载按钮
   */
  const downloadButton = data.distPath && currentUser && (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      loading={downloading}
      onClick={async () => {
        //控制下载的加载状态
        setDownloading(true);
        const values = form.getFieldsValue();

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const blob = await useGeneratorUsingPost(
          {
            id: data.id,
            dataModel: values,
          },
          {
            //返回的是要文件，二进制大对象
            responseType: 'blob',
          },
        );
        // 使用 file-saver 来保存文件
        const fullPath = data.distPath || '';
        saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1));
        setDownloading(false);
      }}
    >
      生成代码
    </Button>
  );

  return (
    //Pro组件自带页面外壳，自带面包屑、页面标题栏（非顶部导航栏）、页面内边距

      //会把数据整合到一个{}里，
      // 分组了的在这个{}里是groupkey：{每个字段：输入的值}
      // 未分组的是字段：输入的值
      //最终效果：
      // form.getFieldsValue() 拿到的整体结果
      // {
      //   // 👉 未分组：直接 key = fieldName
      //   basePackage: "com.k123",
      //
      //   // 👉 分组的：key = groupKey，它的值又是一个对象，内部放本组所有字段
      //   post: {
      //     needPost: true,
      //     postTitle: "帖子模板"
      //   }
      // }
    <PageContainer title={<></>} loading={loading}>
      <Card>
        <Row justify="space-between" gutter={[32, 32]}>
          <Col flex="auto">
            <Space size="large" align="center">
              <Typography.Title level={4}>{data.name}</Typography.Title>
            </Space>
            <Typography.Paragraph>{data.description}</Typography.Paragraph>
            {/*分割线，一条横线，隔开描述和下面表单*/}
            <Divider />
            <Form form={form}>
              {/*JSX里的return，只能返回一个根节点，不能返回平级多个*/}
              {models.map((model, index) => {
                // 是分组
                if (model.groupKey) {
                  if (!model.models) {
                    return <></>;
                  }

                  //`model` 只是**渲染用的元数据（说明书）**，
                  // antd Form 根本不会自动读取这个 model 对象去挂载值！
                  // antd Form 是**完全独立的仓库**，它只认你写在 `name` 上的路径，
                  // 不会自动绑定到你遍历的 `model` 变量！
                  return (
                    //Collapse折叠框
                    <Collapse
                      key={index}
                      style={{
                        marginBottom: 24,
                      }}
                      items={[
                        {
                          key: index,
                          label: model.groupName + '（分组）',
                          children: model.models.map((subModel, index) => {
                            return (
                              <Form.Item
                                  //这个key写在这里只是为了防止列表渲染错乱，**不是表单字段标识**
                                key={index}
                                label={subModel.fieldName}

                                // @ts-ignore
                                  //antd Form传数组[a,b]的含义，a是外层对象key，b是这个对象里面的属性key
                                name={[model.groupKey, subModel.fieldName]}
                              >
                                <Input placeholder={subModel.description} />
                              </Form.Item>
                            );
                          }),
                        },
                      ]}
                      bordered={false}
                      defaultActiveKey={[index]}
                    />
                  );
                }

                // 上面的如果return了就直接结束，不会有到这里的机会，不需要else
                return (
                    //name字段是表单字段的唯一标识，相当于这个输入框的“变量名”
                    //会把输入的内容当value，放在name这个key后面
                  <Form.Item key={index} label={model.fieldName} name={model.fieldName}>
                    <Input placeholder={model.description} />
                  </Form.Item>
                );
              })}
            </Form>

            <div style={{ marginBottom: 24 }} />
            <Space size="middle">
              {downloadButton}
              <Link to={`/generator/detail/${id}`}>
                <Button>查看详情</Button>
              </Link>
            </Space>
          </Col>
          <Col flex="320px">
            <Image src={data.picture} />
          </Col>
        </Row>
      </Card>
    </PageContainer>
  );
};

export default GeneratorUsePage;
