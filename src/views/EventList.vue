<template>
  <div>
    <h1>Events for {{ user.name }}</h1>
    <EventCard v-for="event in event.events" :key="event.id" :event="event" />
    <template v-if="page !== 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link>
    </template>
    <template v-if="page !== 1 && isFinalPage"> | </template>
    <template v-if="isFinalPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link>
    </template>
  </div>
</template>

<script>
import EventCard from "@/components/EventCard.vue";
import { mapState } from "vuex";
import store from "@/store";

const getPageEvents = (to, next) => {
  const currentPage = parseInt(to.query.page) || 1;
  store
    .dispatch("event/fetchEvents", {
      page: currentPage,
    })
    .then(() => {
      to.params.page = currentPage;
      next();
    });
};

export default {
  components: {
    EventCard,
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  beforeRouteEnter(to, _from, next) {
    getPageEvents(to, next);
  },
  beforeRouteUpdate(to, _from, next) {
    getPageEvents(to, next);
  },
  computed: {
    ...mapState({
      event: (state) => state.event,
      user: (state) => state.user.user,
    }),
    isFinalPage() {
      const { event, page } = this;
      return event.eventTotal > page * event.perPage;
    },
  },
};
</script>
