import Vue from "vue";
import Router from "vue-router";
import posts from "@/views/posts";
import notFound from "@/views/notFound";
import details from "@/views/details";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "posts-list",
      component: posts,
    },
    {
      path: "/" + "details" + "/:id",
      name: "details",
      component: details,
      props: true,
    },
    {
      path: "*",
      name: "not-found",
      component: notFound,
    },
  ],
});
