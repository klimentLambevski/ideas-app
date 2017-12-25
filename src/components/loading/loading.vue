<template>
  <div class="loading">
    <div class="dual-ring"></div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss">
  @keyframes lds-dual-ring {
    0% {
      -webkit-transform: rotate(0);
      transform: rotate(0);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  .loading {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.5);
    z-index: 1000;
  }
  .dual-ring  {
    width: 140px;
    height: 140px;
    top: 30px;
    left: 30px;
    border-radius: 50%;
    border: 16px solid #000;
    border-color: #eee transparent #eee transparent;
    -webkit-animation: lds-dual-ring 1.3s linear infinite;
    animation: lds-dual-ring 1.3s linear infinite;
  }
</style>
