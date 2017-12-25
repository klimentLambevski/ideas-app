<template>
  <div class="sidebar">
    <div class="logo">
      <img src="./IdeaPool_icon.png" srcset="./IdeaPool_icon.png 1x, ./IdeaPool_icon@2x.png 2x"/>
      <div class="app-title">The Idea Pool</div>
    </div>
    <transition name="app">
      <div v-if="thisUser">
        <div class="separator">
        </div>
        <div class="avatar">
          <img :src="thisUser.avatar_url">
          <div class="name">{{thisUser.name}}</div>
          <div class="log-out" @click="signOut">Log out</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import {logOut} from "../../services/auth";

  export default {
    computed: {
      ...mapState({
        thisUser: state => state.self.thisUser
      })
    },
    methods: {
      signOut() {
        logOut().then(res => {
          this.$store.commit('setSelf', null);
          this.$store.commit('resetIdeas');
          this.$router.push({name: 'signIn'});
        })
      }
    },
  }
</script>

<style lang="scss">
  @import "sidebar";
</style>
