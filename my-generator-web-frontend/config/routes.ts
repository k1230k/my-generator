//Umi框架的路由配置文件
//url- 页面对照表，控制浏览器地址栏路径对应显示哪个页面
export default [
  {
    //父级路径（user相关的路径都带这个
    path: '/user',
    //layout:false关闭全局布局（不显示左侧菜单栏、顶部导航栏，页面全局展示
    layout: false,
    //子路由对应关系（前端地址+path -> ./是/src/pages +后面的
    //（Umi约定pages下面一个文件夹 = 一个页面
    routes: [
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
    ],
  },
  //欢迎页，icon、name左侧菜单栏的图标和文字
  { path: '/', icon: 'home', component: './Index', name: '主页' },
  //管理后台模块
  {
    path: '/admin',
    icon: 'crown',
    name: '管理页',
    //权限拦截（权限标记）
    //ProLayout组件内部自带的内置逻辑会读取全局initialState.currentUser
    //遇到access自动拿值做权限判断（全局信息在app.tsx里生成
    access: 'canAdmin',
    routes: [
      { path: '/admin', redirect: '/admin/user' },
      { icon: 'user', path: '/admin/user', component: './Admin/User', name: '用户管理' },
      { icon: 'tools', path: '/admin/generator', component: './Admin/Generator', name: '生成器管理'},
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
