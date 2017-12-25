<template>
  <div
    class="manage-ideas"
    :class="{
      'no-ideas': ideas.length === 0
    }">
    <div class="ideas-header">
      <div class="title">My Ideas</div>
      <div class="create-button" @click="showCreate"></div>
    </div>
    <div class="ideas-list" v-if="createActive || ideas.length > 0">
      <idea-form
        v-if="createActive"
        :create="createIdea"
        :idea="newIdea"
        :disabled="false"
        :labels-active="true"
        @cancel="cancelCreate"
      ></idea-form>
      <transition-group name="idea" tag="div">
        <idea-form
          v-for="(idea, index) in ideas"
          :key="idea.id"
          :labels-active="index === 0 && !createActive"
          :idea="idea"
          :update="editIdea"
          @delete="openDeleteModal(idea)"
        ></idea-form>
      </transition-group>
      <div class="load-more-ideas" v-if="ideas.length > 0 && !ideasLoaded" @click="loadMoreIdeas">Load more ideas</div>
    </div>
    <div class="no-ideas-message" v-else>
      <img src="./bulb.png" srcset="./bulb.png 1x, ./bulb@2x.png 2x"/>
      <div class="message">Got Ideas?</div>
    </div>
    <transition name="app">
      <loading v-if="isLoading"></loading>
    </transition>
    <transition name="app">
      <modal
        v-if="deleteModalOpened"
        @cancel="deleteModalOpened = false"
        @ok="deleteIdea"
      ></modal>
    </transition>
  </div>
</template>

<script>
  import IdeaForm from '../idea-form/idea-form.vue';
  import Loading from '../loading/loading.vue';
  import Modal from '../modal/modal.vue';

  import {createIdea, updateIdea} from "../../services/ideas";
  import {mapState} from 'vuex';

  export default {
    components: {
      IdeaForm,
      Loading,
      Modal,
    },
    data: () => ({
      createActive: false,
      isLoading: false,
      newIdea: {
        ease: 10,
        impact: 10,
        confidence: 10,
        content: ''
      },
      deleteModalOpened: false,
      itemForDelete: null
    }),
    computed: {
      ...mapState({
        ideas: state => state.ideas.ideas,
        ideasLoaded: state => state.ideas.ideasLoaded
      })
    },
    methods: {
      showCreate() {
        this.createActive = true;
      },
      createIdea(idea) {
        this.isLoading = true;
        return this.$store.dispatch('createIdea', idea).then(res => {
          console.log(res);
          this.isLoading = false;
          this.createActive = false;
          return res;
        }).catch(err => {
          this.isLoading = false;
        });
      },
      editIdea(idea) {
        this.isLoading = true;

        return this.$store.dispatch('updateIdea', idea).then(res => {
          this.isLoading = false;
          return res;
        }).catch(err => {
          this.isLoading = false;
        });
      },
      deleteIdea() {
        this.isLoading = true;

        console.log('delete', this.ideaForDelete);
        this.$store.dispatch('deleteIdea', this.ideaForDelete).then(res => {
          this.isLoading = false;
          this.ideaForDelete = false;
          this.deleteModalOpened = false;
        }).catch(err => {
          this.isLoading = false;
        });
      },
      openDeleteModal(idea) {
        this.ideaForDelete = idea;
        this.deleteModalOpened = true;
      },
      cancelCreate() {
        this.createActive = false;
      },
      loadMoreIdeas() {
        this.isLoading = true;
        this.$store.dispatch('getIdeas').then(res => {
          this.isLoading = false;
        });
      }
    },
    created() {
    }
  }
</script>

<style lang="scss">
  @import "manage-ideas";
</style>
