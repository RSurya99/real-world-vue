<template>
  <div>
    <h1>Create an event, {{ user.name }}</h1>
    <form @submit.prevent="createEvent">
      <BaseSelect
        label="Select a category"
        :options="categories"
        v-model="event.category"
        :class="{ error: $v.event.category.$error }"
        @blur="$v.event.category.$touch()"
      />
      <template v-if="$v.event.category.$error">
        <span class="-text-error" v-if="!$v.event.category.required">
          Category is required
        </span>
      </template>

      <h3>Name & describe your event</h3>
      <BaseInput
        label="Title"
        type="text"
        placeholder="Title"
        v-model="event.title"
        class="field"
        :class="{ error: $v.event.title.$error }"
        @blur="$v.event.title.$touch()"
      />
      <template v-if="$v.event.title.$error">
        <span class="-text-error" v-if="!$v.event.title.required">
          title is required
        </span>
      </template>

      <BaseInput
        label="Description"
        type="text"
        placeholder="Description"
        v-model="event.description"
        class="field"
        :class="{ error: $v.event.description.$error }"
        @blur="$v.event.description.$touch()"
      />
      <template v-if="$v.event.description.$error">
        <span class="-text-error" v-if="!$v.event.description.required">
          description is required
        </span>
      </template>

      <BaseInput
        label="Location"
        type="text"
        placeholder="Location"
        v-model="event.location"
        class="field"
        :class="{ error: $v.event.location.$error }"
        @blur="$v.event.location.$touch()"
      />
      <template v-if="$v.event.location.$error">
        <span class="-text-error" v-if="!$v.event.location.required">
          location is required
        </span>
      </template>

      <h3>When is your event?</h3>
      <div class="field">
        <label>Date</label>
        <datepicker
          v-model="event.date"
          placeholder="Select a date"
          @opened="$v.event.date.$touch()"
          :input-class="{ error: $v.event.date.$error }"
        />
      </div>
      <template v-if="$v.event.date.$error">
        <span class="-text-error" v-if="!$v.event.date.required">
          date is required
        </span>
      </template>

      <BaseSelect
        label="Select a time"
        :options="times"
        v-model="event.time"
        class="field"
        :class="{ error: $v.event.time.$error }"
        @blur="$v.event.time.$touch()"
      />
      <template v-if="$v.event.time.$error">
        <span class="-text-error" v-if="!$v.event.time.required">
          time is required
        </span>
      </template>

      <!-- <input type="submit" class="button -fill-gradient" value="Submit" /> -->
      <base-button
        :disabled="$v.$anyError"
        type="submit"
        buttonClass="-fill-gradient"
      >
        Submit
      </base-button>
      <span v-if="$v.$anyError" class="-text-error">
        Please fill out the required fields
      </span>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
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
  validations: {
    event: {
      category: { required },
      title: { required },
      description: { required },
      location: { required },
      date: { required },
      time: { required },
    },
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
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
      }
    },
  },
}
</script>

<style scoped>
.field {
  margin-bottom: 24px;
}
</style>
