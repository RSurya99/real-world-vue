<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="What's your email"
      v-model="email"
      :class="{ error: $v.email.$error }"
      @blur="$v.email.$touch()"
    />
    <div v-if="$v.email.$error">
      <p class="-text-error" v-if="!$v.email.email">
        Please enter a valid email
      </p>
      <p class="-text-error" v-if="!$v.email.required">email is required</p>
    </div>
    <button :disabled="$v.$invalid" type="submit">Submit</button>
    <p v-if="$v.$anyError" class="-text-error">
      Please fill out the required fields
    </p>
  </form>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: null,
    }
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (!this.$v.invalid) {
        console.log('Form Submitted: ' + this.email)
      }
    },
  },
}
</script>
