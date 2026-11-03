import { Avatar, Card } from 'antd';
import React from 'react';

//约定可以传入什么参数
interface Props {
  data: API.GeneratorVO;
}

/**
 * 作者信息
 * @constructor
 */
//React.FC表示这个组件参数props受Props类型管控
const AuthorInfo: React.FC<Props> = (props) => {
  const { data } = props;

  const user = data?.user;

  if (!user) {
    return <></>;
  }

  return (
    <div style={{ marginTop: 16 }}>
      <Card.Meta
        //虽然{}里是写JS的，但JSX本身就是JS的表达式，可以写进去，
        avatar={<Avatar size={64} src={user.userAvatar} />}
        //上面这个如果是在<Card.Meta></Card.Meta>标签中间的话就不用写{}了
        //但如果是在xxx = 右边，并且本身普通文本就需要{}
        title={user.userName}
        description={user.userProfile}
      />
    </div>
  );
};

export default AuthorInfo;
