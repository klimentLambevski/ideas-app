<template>
  <div class="ip-input-container">
    <label>
      <input
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="ip-input">
    </label>
    <div class="error-msg" v-if="errorMsg">{{errorMsg}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      placeholder: {
        type: String,
        default: '...'
      },
      type: {
        type: String,
        default: 'text'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      value: {
        type: String
      },
      errorMsg: {

      }
    },
  }
</script>

<style lang="scss">
  @import "ip-input";
</style>
