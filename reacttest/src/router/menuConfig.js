import Games from "../pages/Games";
import News from "../pages/News";
import My from "../pages/my";

let menuConfig = [
  {
    path: "/", //首页默认加载的页面
    component: Games,
    name: "游戏",
    exact: true //是否为严格模式
  },
  {
    path: "/news", //后面是传递的参数id
    component: News,
    name: "新闻"
  },
  {
    path: "/my", //后面是传递的参数id
    component: My,
    name: "我的"
  }
];

export default menuConfig;
