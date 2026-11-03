// @ 等价于 src/
import {downloadGeneratorByIdUsingGet, getGeneratorVoByIdUsingGet,} from '@/services/backend/generatorController';
import {Link, useModel, useParams} from '@@/exports';
import {PageContainer} from '@ant-design/pro-components';
import {Card, message, Row, Col, Space, Typography, Button, Tag, Image, Tabs} from 'antd';
import React, {useEffect, useState} from 'react';
import moment from "moment";
import {DownloadOutlined, EditOutlined} from "@ant-design/icons";
import ModelConfig from "@/pages/Generator/Detail/components/ModelConfig";
import AuthorInfo from "@/pages/Generator/Detail/components/AuthorInfo";
import FileConfig from "@/pages/Generator/Detail/components/FileConfig";
import {testDownloadFileUsingGet} from "@/services/backend/fileController";
import {COS_HOST} from "@/constants";
import {saveAs} from "file-saver";
/**
 * 生成器详情页面
 * @constructor
 */
const GeneratorDetailPage: React.FC = () => {
  const {id} = useParams();
  //是这个const params = useParams();
  // const id = params.id;的简写，useParams拿到的是{}包裹数据对的对象
  //需要.id或者直接{id}拿到id的值
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<API.GeneratorVO>({});
  const {initialState} = useModel('@@initialState');
  const {currentUser} = initialState ?? {};
  const my = data?.userId === currentUser?.id;
  /**
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

      setData(res.data ?? {});

    } catch (error: any) {
      message.error('加载数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadData();
    }
  }, [id]);

  const tagListView = (tags?: string[]) => {
    if (!tags) {
      return <></>;
    }

    //{}是打通JS和HTML的口子，里面可以写原生JS代码
    return (
      <div style={{ marginBottom: 8 }}>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    );
  };

  /**
   * 下载按钮
   */
  //A&&B&&，可以看成左结合，（A&&B）&&C，对于A&&B，A真则返回B
  const downloadButton = data.distPath && currentUser && (
      <Button
          icon={<DownloadOutlined />}
          onClick={async () => {
            const blob = await downloadGeneratorByIdUsingGet(
                {
                  id: data.id,
                },
                {
                  //浏览器里的二进制大对象类型
                  responseType: 'blob',
                },
            );
            // 使用 file-saver 来保存文件
            // 前端||不是返布尔值的，是返值的，A || B，A真直接返A······
            const fullPath = data.distPath || '';
            saveAs(blob, fullPath.substring(fullPath.lastIndexOf('/') + 1));
          }}
      >
        下载
      </Button>
  );

  /**
   * 编辑按钮
   */
  const editButton = my && (
      <Link to={`/generator/update?id=${data.id}`}>
        <Button icon={<EditOutlined />}>编辑</Button>
      </Link>
  );


  //JSX里调用JS函数需要{}
  return (
    <PageContainer>
      <Card>
        <Row justify="space-between" gutter={[32, 32]}>
          <Col flex="auto">
            <Space size="large" align="center">
              <Typography.Title level={4}>{data.name}</Typography.Title>
              {tagListView(data.tags)}
            </Space>
            <Typography.Paragraph>{data?.description}</Typography.Paragraph>
            {/*type=secondary把文字变成浅灰色弱化显示*/}
            <Typography.Paragraph type="secondary">
              创建时间：{moment(data.createTime).format('YYYY-MM-DD hh:mm:ss')}
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">基础包：{data.basePackage}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">版本：{data.version}</Typography.Paragraph>
            <Typography.Paragraph type="secondary">作者：{data.author}</Typography.Paragraph>
            <div style={{ marginBottom: 24 }} />
            <Space size="middle">
              <Button type="primary">立即使用</Button>
              {downloadButton}
              {editButton}
            </Space>
          </Col>
          <Col flex="320px">
            <Image src={data.picture} />
          </Col>
        </Row>
      </Card>
      {/*marginBottom是JS对象里的一个key，如CSS的margin-top被改造为marginTop*/}
      {/*因为-会被识别为减号*/}
      {/*外层括号是JSX里写JS所需，内层括号是JS样式对象{key:value}*/}
      <div style={{ marginBottom: 8 }}>
        <Card>
          <Tabs
              size="large"
              // 默认选中哪个标签页，是Tabs组件的初始激活项
              defaultActiveKey={'fileConfig'}
              onChange={() => {}}
              items={[
                {
                  key: 'fileConfig',
                  label: '文件配置',
                  children: <FileConfig data={data} />,
                },
                {
                  key: 'modelConfig',
                  label: '模型配置',
                  children: <ModelConfig data={data} />,
                },
                {
                  key: 'userInfo',
                  label: '作者信息',
                  children: <AuthorInfo data={data} />,
                },
              ]}
          />
        </Card>
      </div>
    </PageContainer>
  );
};

export default GeneratorDetailPage;
