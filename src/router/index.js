import Vue from "vue";
import Router from "vue-router";
import posts from "@/views/posts";
import notFound from "@/views/notFound";
import details from "@/views/details";

Vue.use(Router);

const ROUTE_NAME = {
  DETAILS: "details",
};

export default new Router({
  routes: [
    {
      path: "/",
      name: "posts-list",
      component: posts,
    },
    {
      path: "/" + ROUTE_NAME.DETAILS + "/:id",
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

export { ROUTE_NAME };
