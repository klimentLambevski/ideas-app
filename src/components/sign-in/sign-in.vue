<template>
  <div class="sign-up">
    <form class="sign-up-form" @submit="submitForm" novalidate>
      <div class="form-title">
        Log in
      </div>
      <ip-input
        placeholder="Email"
        v-model="formValues.email"
        :error-msg="validationErrors.email"
        @input="resetError('email')"></ip-input>
      <ip-input
        placeholder="Password"
        type="password"
        v-model="formValues.password"
        :error-msg="validationErrors.password"
        @input="resetError('password')"></ip-input>
      <div class="form-actions">
        <button class="ip-button">LOG IN</button>
        <div>
          Don't have an account? <router-link :to="{name: 'signUp'}">Create an account</router-link>
        </div>
      </div>
      <div class="form-error" v-if="error">
        {{error.reason}}
      </div>
    </form>
    <transition name="app">
      <loading v-if="isLoading"></loading>
    </transition>
  </div>
</template>

<script>
  import IpInput from '../ip-input/ip-input.vue';
  import Loading from "../loading/loading.vue";
  import {signIn} from "../../services/users";
  import {validateForm, validators} from "../../services/validation";

  export default {
    components: {
      IpInput,
      Loading
    },
    data: () => ({
      formValues: {
        email: '',
        password: ''
      },
      isLoading: false,
      error: null,
      validate: {
        email: [
          {
            validator: validators.required,
            message: 'Email is required'
          },
          {
            validator: validators.email,
            message: 'Invalid email'
          }
        ],
        password: [
          {
            validator: validators.required,
            message: 'Password is required'
          }
        ]
      },
      validationErrors: {
        email: null,
        password: null
      }
    }),
    methods: {
      submitForm(e) {
        e.preventDefault();

        let valResult = validateForm(this.formValues, this.validate);

        if (valResult.valid) {

          this.isLoading = true;
          signIn(this.formValues)
            .then((user) => {
              this.$store.commit('setSelf', user);
              this.$store.dispatch('getIdeas').then(res => {
                this.isLoading = false;
                this.$router.push({name: 'ideas'})
              });
            })
            .catch((err) => {
              this.isLoading = false;
              this.error = err.response.data;
            })

        } else {

          this.validationErrors = valResult.errors;

        }

      },
      resetError(field) {
        this.validationErrors[field] = null;
      }
    },
  }
</script>

<style lang="scss">
  @import "sign-in";
</style>
