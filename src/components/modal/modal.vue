<template>
  <div class="modal">
    <div class="modal-content">
      <div class="title">Are you sure?</div>
      <div class="description">The ide will be permanently deleted</div>
      <div class="actions">
        <div class="cancel" @click="$emit('cancel')">
          CANCEL
        </div>
        <div class="ok" @click="$emit('ok', item)">
          OK
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: 'Modal title'
      },
      description: {
        type: String
      },
      item: {
        type: Object
      }
    },
  }
</script>

<style lang="scss">
  @import "modal";
</style>
