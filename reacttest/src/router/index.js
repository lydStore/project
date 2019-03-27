import Games from "../pages/Games";
import News from "../pages/News";

let router = [
  {
    path: "/", //首页默认加载的页面
    component: Games,
    exact: true //是否为严格模式
  },
  {
    path: "/news/:id", //后面是传递的参数id
    component: News
  }
];

export default router;
