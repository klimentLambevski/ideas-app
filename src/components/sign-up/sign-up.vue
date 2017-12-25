<template>
  <div class="sign-up">
    <form class="sign-up-form" @submit="submitForm" novalidate>
      <div class="form-title">
        Sign Up
      </div>
      <ip-input
        placeholder="Name"
        v-model="formValues.name"
        :error-msg="validationErrors.name"
        @input="resetError('name')"></ip-input>

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

      <div class="form-error" v-if="error">
        {{error.reason}}
      </div>

      <div class="form-actions">
        <button class="ip-button">SIGN UP</button>
        <div>
          Already have an account?
          <router-link :to="{name: 'signIn'}">Log in</router-link>
        </div>
      </div>
    </form>
    <loading v-if="isLoading"></loading>
  </div>
</template>

<script>
  import IpInput from '../ip-input/ip-input.vue';
  import Loading from "../loading/loading.vue";
  import {signUp} from "../../services/users";
  import {validateForm, validators} from "../../services/validation";

  export default {
    data: () => ({
      formValues: {
        name: '',
        email: '',
        password: ''
      },
      error: null,
      isLoading: false,
      validate: {
        name: [{
          validator: validators.required,
          message: 'Name is required'
        }],
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
          },
          {
            validator: validators.password,
            message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and 8 letters and longer'
          }
        ]
      },
      validationErrors: {
        name: null,
        email: null,
        password: null
      }
    }),
    components: {
      IpInput,
      Loading
    },
    methods: {
      submitForm(e) {
        e.preventDefault();

        let valResult = validateForm(this.formValues, this.validate);

        if (valResult.valid) {

          this.isLoading = true;
          signUp(this.formValues).then(user => {
            this.isLoading = false;
            this.$store.commit('setSelf', user);
            this.$router.push({name: 'ideas'});
          }).catch(err => {
            this.error = err.response.data;
            this.isLoading = false;
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
  @import "sign-up";
</style>
