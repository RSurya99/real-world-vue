<template>
  <div>
    <h1>Create an event, {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <label>Select a category</label>
      <select v-model="event.category">
        <option v-for="cat in categories" :key="cat">{{ cat }}</option>
      </select>
      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        placeholder="Title"
        v-model="event.title"
        class="field"
      />
      <BaseInput
        label="Description"
        type="text"
        placeholder="Description"
        v-model="event.description"
        class="field"
      />
      <BaseInput
        label="Location"
        type="text"
        placeholder="Location"
        v-model="event.location"
        class="field"
      />
      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker v-model="event.date" placeholder="Select a date" />
      </div>
      <div class="field">
        <label>Select a time</label>
        <select v-model="event.time">
          <option v-for="time in times" :key="time">{{ time }}</option>
        </select>
      </div>
      <input type="submit" class="button -fill-gradient" value="Submit" />
    </form>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
import { mapState } from 'vuex'
import NProgress from 'nprogress'

export default {
  components: {
    Datepicker,
  },
  computed: {
    ...mapState(['user']),
  },
  data() {
    const times = []
    for (let i = 1; i <= 24; i++) {
      times.push(i + ':00')
    }
    return {
      event: this.createFreshEvent(),
      times,
      categories: this.$store.state.categories,
    }
  },
  methods: {
    createFreshEvent() {
      const user = this.$store.state.user.user
      const id = Math.floor(Math.random() * 10000000)
      return {
        id: id,
        category: '',
        organizer: user,
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        attendees: [],
      }
    },
    createEvent() {
      NProgress.start()
      this.$store
        .dispatch('event/createEvent', this.event)
        .then(() => {
          this.$router.push({
            name: 'event-show',
            params: { id: this.event.id },
          })
          this.event = this.createFreshEvent()
        })
        .catch(() => {
          NProgress.done()
        })
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
