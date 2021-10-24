import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "@/views/EventCreate.vue";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
import NotFound from "@/views/NotFound.vue";
import NetworkIssue from "@/views/NetworkIssue.vue";
import Example from "@/views/Example.vue";

import store from "@/store";
import nProgress from "nprogress";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
    props: true,
  },
  {
    path: "/example",
    name: "example",
    component: Example,
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
  },
  {
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(to, _from, next) {
      store
        .dispatch("event/fetchEvent", to.params.id)
        .then((event) => {
          to.params.event = event;
          next();
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            next({ name: "404", params: { resource: "event" } }); // Passing in the missen resource
          } else {
            next({ name: "network-issue" });
          }
        });
    },
  },

  {
    path: "/404",
    name: "404",
    component: NotFound,
    props: true,
  },
  {
    path: "*",
    redirect: { name: "404", params: { resource: "page" } }, // Passing in the missen resource
    props: true,
  },
  {
    path: "/network-issue",
    name: "network-issue",
    component: NetworkIssue,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((_to, _from, next) => {
  nProgress.start();
  next();
});

router.afterEach(() => {
  nProgress.done();
});

export default router;
