import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  events: [],
  totalData: 0,
  event: {},
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
  createEvent({ commit }, payload) {
    return EventService.postEvent(payload).then(() => {
      commit('addEvent', payload)
      // call other module actions
      // dispatch('moduleName/actionToCall', payload, { root: true })
    })
  },
  fetchEvents({ commit, dispatch }, { perPage, page }) {
    EventService.getEvents(perPage, page)
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
  fetchEvent({ commit, getters }, id) {
    var event = getters.getEventById(id)
    if (event) {
      commit('setEvent', event)
    } else {
      EventService.getEvent(id)
        .then((response) => {
          commit('setEvent', response.data)
        })
        .catch((error) => {
          console.log('There was an error ' + error)
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
