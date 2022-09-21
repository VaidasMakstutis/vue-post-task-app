import Vue from "vue";
import Router from "vue-router";
import posts from "@/views/posts";
import notFound from "@/views/notFound";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "posts-list",
      component: posts,
    },
    {
      path: "*",
      name: "not-found",
      component: notFound,
    },
  ],
});
