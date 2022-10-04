import Vue from "vue";
import Router from "vue-router";
import Posts from "@/views/Posts";
import PageNotFound from "@/views/PageNotFound";
import Details from "@/views/Details";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "posts-list",
      component: Posts
    },
    {
      path: "/details/:id",
      name: "details",
      component: Details,
      props: true
    },
    {
      path: "*",
      name: "not-found",
      component: PageNotFound
    }
  ]
});
