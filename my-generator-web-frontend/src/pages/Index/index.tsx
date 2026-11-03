import { listGeneratorVoByPageUsingPost } from '@/services/backend/generatorController';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer, ProFormSelect, ProFormText, QueryFilter } from '@ant-design/pro-components';
import { Avatar, Card, Flex, Image, Input, List, message, Tabs, Tag, Typography } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { history } from "@umijs/max";

/**
 * 默认分页参数
 */
const DEFAULT_PAGE_PARAMS: PageRequest = {
  current: 1,
  pageSize: 4,
  sortField: 'createTime',
  sortOrder: 'descend',
};

/**
 * 主页
 * @constructor
 */
const IndexPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [dataList, setDataList] = useState<API.GeneratorVO[]>([]);
  const [total, setTotal] = useState<number>(0);
  // 搜索条件
  const [searchParams, setSearchParams] = useState<API.GeneratorQueryRequest>({
    ...DEFAULT_PAGE_PARAMS,
  });

  /**
   * 搜索
   */
  const doSearch = async () => {
    setLoading(true);
    try {
      const res = await listGeneratorVoByPageUsingPost(searchParams);
      //xx?.xx如果xx是null则返回undefined，不是则继续
      //xx?.xx.xx ?? A 如果是空，返回 A，否则返回 值
      setDataList(res.data?.records ?? []);
      setTotal(Number(res.data?.total) ?? 0);
    } catch (error: any) {
      message.error('获取数据失败，' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    doSearch();
  }, [searchParams]);

  /**
   * 标签列表
   * @param tags
   */
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

  return (
    <PageContainer title={<></>}>
        <div style={{ maxWidth: 1150, margin: '0 auto', padding: '0 16px' }}>
          <Flex justify="center">
            <Input.Search
              style={{
                width: '40vw',
                minWidth: 320,
              }}
              placeholder="搜索代码生成器"
              allowClear
              enterButton="搜索"
              size="large"
              //这个onChange是点表单查询时带上搜索框里内容的关键
              onChange={(e) => {
                searchParams.searchText = e.target.value;
              }}
              onSearch={(value: string) => {
                setSearchParams({
                  ...DEFAULT_PAGE_PARAMS,
                  searchText: value,
                });
              }}
            />
          </Flex>
          <div style={{ marginBottom: 16 }} />

          <Tabs
            size="large"
            defaultActiveKey="newest"
            items={[
              {
                key: 'newest',
                label: '最新',
              },
              {
                key: 'recommend',
                label: '推荐',
              },
            ]}
            onChange={() => {}}
          />

          <QueryFilter
            span={12}
            labelWidth="auto"
            labelAlign="left"
            defaultCollapsed={false}
            style={{ padding: '16px 0' }}
            onFinish={async (values: API.GeneratorQueryRequest) => {
              setSearchParams({
                ...DEFAULT_PAGE_PARAMS,
                // @ts-ignore
                ...values,
                searchText: searchParams.searchText,
              });
            }}
          >
            <ProFormSelect label="标签" name="tags" mode="tags" />
            <ProFormText label="名称" name="name" />
            <ProFormText label="描述" name="description" />
          </QueryFilter>

          <div style={{ marginBottom: 24 }} />

          <List<API.GeneratorVO>
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 16,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 4,
              xxl: 4,
            }}
            dataSource={dataList}

            pagination={{
              current: searchParams.current,
              pageSize: searchParams.pageSize,
              total,
              onChange(current: number, pageSize: number) {
                setSearchParams({
                  ...searchParams,
                  current,
                  pageSize,
                });
              },
            }}
            //data是自动取自dataList的，填充位置自己确定
            renderItem={(data) => (
              <List.Item>
                {/*想让点击Card跳转详情页面可以包一个Link路由组件*/}
                <Card hoverable cover={<Image alt={data.name} src={data.picture}/>}>
                  <Card.Meta
                    title={<a>{data.name}</a>}
                    description={
                      <Typography.Paragraph ellipsis={{ rows: 2 }} style={{ height: 44 }}>
                        {data.description}
                      </Typography.Paragraph>
                    }
                    onClick = {
                      () => {history.push(`/generator/detail/${data.id}`);}
                    }
                  />
                  {tagListView(data.tags)}
                  <Flex justify="space-between" align="center">
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {moment(data.createTime).fromNow()}
                    </Typography.Text>
                    <div>
                      <Avatar src={data.user?.userAvatar ?? <UserOutlined />} />
                    </div>
                  </Flex>
                </Card>
              </List.Item>
            )}
          />
        </div>
    </PageContainer>
  );
};

export default IndexPage;
