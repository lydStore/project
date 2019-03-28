import Games from "../pages/Games";
import News from "../pages/News";

let menuConfig = [
  {
    path: "/", //首页默认加载的页面
    component: Games,
    name: "首页",
    exact: true //是否为严格模式
  },
  {
    path: "/news", //后面是传递的参数id
    component: News,
    name: "新闻"
  }
];

export default menuConfig;
