<template>
  <div>
    <div class="event-header">
      <span class="eyebrow">@{{ event.time }} on {{ event.date | date }}</span>
      <h1 class="title">{{ event.title }}</h1>
      <h5>Organized by {{ event.organizer ? event.organizer.name : '' }}</h5>
      <h5>Category: {{ event.category }}</h5>
    </div>

    <BaseIcon name="map"><h2>Location</h2></BaseIcon>

    <address>{{ event.location }}</address>

    <h2>Event details</h2>
    <p>{{ event.description }}</p>

    <h2>
      Attendees
      <span class="badge -fill-gradient">{{
        event.attendees ? event.attendees.length : 0
      }}</span>
    </h2>
    <ul class="list-group">
      <li
        v-for="(attendee, index) in event.attendees"
        :key="index"
        class="list-item"
      >
        <b>{{ attendee.name }}</b>
      </li>
    </ul>
  </div>
</template>
<script>
// import { mapState } from 'vuex'
// import NProgress from 'nprogress'
// import store from '@/store'

export default {
  props: {
    id: {
      type: Number,
    },
    event: {
      type: Object,
      required: true,
    },
  },
  // beforeRouteEnter(routeTo, routeFrom, next) {
  //   // Called before component is created
  //   // Doesn't have access to "this"
  //   NProgress.start()
  //   store.dispatch('event/fetchEvent', routeTo.params.id).then(() => {
  //     NProgress.done()
  //     next()
  //   })
  // },
  // beforeRouteUpdate(routeTo, routeFrom, next) {
  //   // Called when the route changes, but still using the same component
  //   // Has access to "this"
  // },
  // beforeRouteLeave(routeTo, routeFrom, next) {
  //   // Called when this component is navigated away from
  //   // Has access to "this"
  // },
  // computed: {
  //   ...mapState({
  //     event: (state) => state.event.event,
  //   }),
  // },
}
</script>
<style scoped>
.location {
  margin-bottom: 0;
}
.location > .icon {
  margin-left: 10px;
}
.event-header > .title {
  margin: 0;
}
.list-group {
  margin: 0;
  padding: 0;
  list-style: none;
}
.list-group > .list-item {
  padding: 1em 0;
  border-bottom: solid 1px #e5e5e5;
}
</style>
