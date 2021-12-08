import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  totalData: 0,
  event: {},
  perPage: 3,
}

export const mutations = {
  addEvent(state, payload) {
    state.events.push(payload)
  },
  addTotalData(state, payload) {
    state.totalData = payload
  },
  setEvents(state, payload) {
    state.events = payload
  },
  setEvent(state, payload) {
    state.event = payload
  },
}

export const actions = {
  createEvent({ commit, dispatch }, payload) {
    return EventService.postEvent(payload)
      .then(() => {
        commit('addEvent', payload)
        const notification = {
          type: 'success',
          message: 'Your event has been created',
        }
        dispatch('notification/add', notification, { root: true })
        // call other module actions
        // dispatch('moduleName/actionToCall', payload, { root: true })
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message:
            'There is a a problem when creating events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
        throw error
      })
  },
  fetchEvents({ commit, dispatch, state }, { page }) {
    return EventService.getEvents(state.perPage, page)
      .then((response) => {
        commit('addTotalData', response.headers['x-total-count'])
        commit('setEvents', response.data)
      })
      .catch((error) => {
        const notification = {
          type: 'error',
          message: 'There was a problem when fetching events: ' + error.message,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  fetchEvent({ commit, getters, dispatch }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('setEvent', event)
      return event
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit('setEvent', response.data)
          return response.data
        })
        .catch((error) => {
          const notification = {
            type: 'error',
            message:
              'There was a problem when fetching event: ' + error.message,
          }
          dispatch('notification/add', notification, { root: true })
        })
    }
  },
}

export const getters = {
  catLength: (state) => state.categories.length,
  getEventById: (state) => (id) => {
    return state.events.find((event) => event.id === id)
  },
}
