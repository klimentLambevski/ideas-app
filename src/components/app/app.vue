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
  import {mapState} from 'vuex';

  export default {
    components: {
      Sidebar,
      SignUp,
      Loading
    },
    data: () => ({
      isLoading: true
    }),
    computed: {
      ...mapState({
        thisUser: state => state.self.thisUser
      })
    },
    created() {
      initAccessToken();

      if(!getAccessToken()) {
        this.isLoading = false;
        this.$router.push({name: 'signIn'});
      } else {
        getSelf()
          .then((self) => {
            this.$store.commit('setSelf', self);

            this.$store.dispatch('getIdeas').then(res => {
              this.$router.push({name: 'ideas'});
              this.isLoading = false;
            });

          }).catch(() => {
            this.$router.push({name: 'signIn'});
            clearAccessToken();
            this.isLoading = false;
          })
      }

      this.$router.beforeEach((to, from, next) => {
        if(this.thisUser && to.name !== 'ideas') {
          next({name: 'ideas'});
        } else if(!this.thisUser && to.name === 'ideas'){
          next({name: 'signIn'})
        } else {
          next()
        }
      })

    }
  }
</script>

<style lang="scss">
  @import "app";
</style>
