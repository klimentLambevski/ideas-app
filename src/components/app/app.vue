<template>
  <div class="app">
    <sidebar></sidebar>
    <div class="main-content">
      <transition name="app">
        <loading v-if="isLoading"></loading>
      </transition>
      <router-view v-if="!isLoading">
      </router-view>
    </div>
  </div>
</template>

<script>
  import Sidebar from '../sidebar/sidebar.vue';
  import SignUp from '../sign-up/sign-up.vue';
  import Loading from '../loading/loading.vue'
  import {initAccessToken, clearAccessToken, getAccessToken} from "../../services/accessToken";
  import {getSelf} from "../../services/users";

  export default {
    components: {
      Sidebar,
      SignUp,
      Loading
    },
    data: () => ({
      isLoading: true
    }),
    created() {
      initAccessToken();

      if(!getAccessToken()) {
        this.isLoading = false;
        this.$router.push({name: 'signIn'});
      } else {
        getSelf()
          .then((self) => {
            this.$router.push({name: 'ideas'});
            this.$store.commit('setSelf', self);

            this.$store.dispatch('getIdeas').then(res => {
              this.isLoading = false;
            });

          }).catch(() => {
            this.$router.push({name: 'signIn'});
            clearAccessToken();
            this.isLoading = false;
          })
      }

    }
  }
</script>

<style lang="scss">
  @import "app";
</style>
