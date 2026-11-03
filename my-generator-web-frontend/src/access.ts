/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 *
 * src/access.ts中导出access函数，Umi 插件就会自动识别、自动调用
 * 自动把 `getInitialState` 的结果塞进来当参数
 * */
//接收全局初始状态（initialState，里面放登录用户 currentUser），返回一堆权限标记。
export default function access(initialState: { currentUser?: API.LoginUserVO } | undefined) {
  //`{ currentUser?: API.LoginUserVO }`
  // 这是**对象类型**：是一个对象，里面可以有 `currentUser` 这个属性
  const { currentUser } = initialState ?? {};
  return {
    canUser: currentUser,
    canAdmin: currentUser && currentUser.userRole === 'admin',
  };
}
