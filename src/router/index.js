import Vue from "vue";
import VueRouter from "vue-router";
import EventCreate from "@/views/EventCreate.vue";
import EventList from "@/views/EventList.vue";
import EventShow from "@/views/EventShow.vue";
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
    path: "/event/:id",
    name: "event-show",
    component: EventShow,
    props: true,
    beforeEnter(to, _from, next) {
      store.dispatch("event/fetchEvent", to.params.id).then((event) => {
        to.params.event = event;
        next();
      });
    },
  },
  {
    path: "/event/create",
    name: "event-create",
    component: EventCreate,
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
