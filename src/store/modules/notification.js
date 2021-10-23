export const namespaced = true;

export const state = {
  notifications: [],
};

let nextId = 1;
export const mutations = {
  PUSH(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    });
  },
  REMOVE(state, notificationToRemove) {
    state.notifications = state.notifications.filter((notifitication) => {
      notifitication.id !== notificationToRemove.id;
    });
  },
};

export const actions = {
  add({ commit }, notification) {
    commit("PUSH", notification);
  },
  remove({ commit }, notificationToRemove) {
    commit("REMOVE", notificationToRemove);
  },
};
