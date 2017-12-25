<template>
  <div class="ip-input-container">
    <label>
      <input
        v-if="!disabled"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="ip-input">
      <div class="ip-input-disabled" v-else>
        {{value}}
      </div>
      <!--<textarea-->
        <!--v-else-->
        <!--:placeholder="placeholder"-->
        <!--:disabled="disabled"-->
        <!--:value="value"-->
        <!--@input="emitInput"-->
        <!--class="ip-input"-->
        <!--rows="1"-->
        <!--style="overflow:hidden">-->

      </textarea>
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
    methods: {
      emitInput(e) {
        this.$emit('input', e.target.value);
        e.target.style.height = "5px";
        e.target.style.height = ( e.target.scrollHeight)+"px";
      }
    },
  }
</script>

<style lang="scss">
  @import "ip-input";
</style>
