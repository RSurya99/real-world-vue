export const namespace = true

export const state = {
  notifications: [],
}

let nextId = 1

export const mutations = {
  push(state, notification) {
    state.notifications.push({
      ...notification,
      id: nextId++,
    })
  },
  delete(state, notificationToRemove) {
    state.notifications = state.notifications.filter(
      (notification) => notification.id !== notificationToRemove.id
    )
  },
}

export const actions = {
  add({ commit }, payload) {
    commit('push', payload)
  },
  remove({ commit }, payload) {
    commit('delete', payload)
  },
}
