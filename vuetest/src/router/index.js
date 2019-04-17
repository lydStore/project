import Vue from "vue";
import Router from "vue-router";
import Index from "@/pages/Index";
import News from "@/pages/News";
import Games from "@/pages/Games";
import My from "@/pages/My";
import GamesDetail from "@/pages/GamesDetail";

Vue.use(Router);

export default new Router({
  linkActiveClass: "current",
  mode: "history", //去掉url中的#
  routes: [
    {
      path: "/",
      name: "Index",
      redirect: "/index",
      component: Index
    },
    {
      path: "/index",
      name: "Index",
      component: Index
    },
    {
      path: "/game",
      name: "Games",
      component: Games
    },
    {
      path: "/game/detail/:id",
      name: "GamesDetail",
      component: GamesDetail
    },
    {
      path: "/news",
      name: "News",
      component: News
    },
    {
      path: "/my",
      name: "My",
      component: My
    }
  ]
});
