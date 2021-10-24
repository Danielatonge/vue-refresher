import Service from "@/service";

export const namespaced = true;

export const state = {
  events: [],
  event: {},
  eventTotal: 0,
  perPage: 3,
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_EVENT_TOTAL(state, total) {
    state.eventTotal = total;
  },
};

export const actions = {
  createEvent({ commit, dispatch }, event) {
    return Service.postEvent(event)
      .then(() => {
        const notification = {
          type: "success",
          message: "Event Created",
        };
        dispatch("notification/add", notification, { root: true });
        commit("ADD_EVENT", event);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was a problem Creating your event: " + error.message,
        };
        dispatch("notification/add", notification, { root: true });
        throw error;
      });
  },

  fetchEvents({ commit, dispatch, state }, { page }) {
    return Service.getEvents(state.perPage, page)
      .then((response) => {
        commit("SET_EVENTS", response.data);
        commit("SET_EVENT_TOTAL", response.headers["x-total-count"]);
      })
      .catch((error) => {
        const notification = {
          type: "error",
          message: "There was an error fetching events:" + error.message,
        };
        dispatch("notification/add", notification, { root: true });
      });
  },
  fetchEvent({ commit, getters }, eventId) {
    const event = getters.getEventById(eventId);
    if (event) {
      commit("SET_EVENT", event);
      return event;
    } else {
      return Service.getEvent(eventId)
        .then((response) => {
          commit("SET_EVENT", response.data);
          return response.data;
        })
        
    }
  },
};

export const getters = {
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id);
  },
};
