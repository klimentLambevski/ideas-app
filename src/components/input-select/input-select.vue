<template>
  <div class="input-select-container">
    <div
      class="select-label"
      :class="{
        'label-hidden': !labelActive
      }"
      :style="{
        'font-weight': labelStyle === 'bold' && labelStyle,
      }">
      {{title}}
    </div>
    <div class="input-select-disabled" v-if="disabled">
      {{value}}
    </div>
    <div class="input-select" v-else>
      {{value}}
      <!--<div class="input-select-dropdown">-->
        <!--<div-->
          <!--class="dropdown-item"-->
          <!--:class="{-->
            <!--selected: value === val-->
          <!--}"-->
          <!--v-for="val in values"-->
          <!--@click="selectValue(val)">{{val}}</div>-->
      <!--</div>-->

      <div class="increase" @click="increase"></div>
      <div class="decrease" @click="decrease"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse(),
      }
    },
    props: {
      title: {
        type: String
      },
      value: {
        type: Number,
        default: 10
      },
      disabled: {
        type: Boolean,
        default: false
      },
      labelStyle: {
        type: String
      },
      labelActive: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      selectValue(val) {
        // this.value = val;
        this.$emit('input', val)
      },
      increase() {
        this.$emit('input', this.value + 1 > 10? 10: this.value + 1);
      },
      decrease() {
        this.$emit('input', this.value - 1 < 1? 1: this.value - 1);
      }
    },
  }
</script>

<style lang="scss">
  @import "input-select";
</style>
