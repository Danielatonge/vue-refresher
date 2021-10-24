<template>
  <form @submit.prevent="submit">
    <input
      type="email"
      placeholder="Enter email"
      v-model="email"
      @blur="$v.email.$touch()"
      :class="{ error: $v.email.$error }"
    />
    <div v-if="$v.email.$error">
      <p v-if="!$v.email.email" class="errorMessage">
        Please enter a valid email
      </p>
      <p v-if="!$v.email.required" class="errorMessage">Email required</p>
    </div>
    <button :disabled="$v.$anyErrror" type="submit">Submit</button>
    <p v-if="!$v.$anyErrror">Please Fill out the fields</p>
  </form>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      email: null,
    };
  },
  validations: {
    email: {
      required,
      email,
    },
  },
  methods: {
    submit() {
      this.$v.$touch(); //makes all events dirty to trigger validation output messages
      if (!this.$v.$invalid) {
        console.log("form submitted");
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
