import {createIdea, deleteIdea, getIdeas, updateIdea} from "../../services/ideas";

export default {
  actions: {
    createIdea({commit, state}, idea) {
      return createIdea(idea)
        .then(res => {
          commit('addNewIdea', res);
          return res;
        })
    },
    updateIdea({commit}, idea) {
      return updateIdea(idea).then(idea => {
        commit('editIdea', idea);
        return idea;
      })
    },
    deleteIdea({commit, state}, idea) {
      return deleteIdea(idea).then((res) => {
        commit('removeIdea', idea);
      })
    },
    getIdeas({commit, state}) {
      if(state.ideasLoaded) {
        return Promise.resolve([]);
      }

      return getIdeas(state.currentPage).then(res => {
        commit('addIdeas', res);
        commit('incrementPage');
        if(res.length < 10) {
          commit('setIdeasLoaded');
        }
        return res;
      })
    }
  },
  mutations: {
    addNewIdea(state, idea) {
      state.ideas = _.orderBy([...state.ideas, idea], ['average_score'], ['desc']);
    },
    addIdeas(state, ideas) {
      state.ideas = _.uniqWith(
        _.orderBy([...state.ideas, ...ideas], ['average_score'], ['desc']),
        (a, b) => a.id === b.id
      );
    },
    incrementPage(state) {
      state.currentPage++;
    },
    editIdea(state, idea) {

      let ideas = state.ideas
        .map(i => {
          return i.id === idea.id ? idea : i
        });

      state.ideas = _.orderBy(ideas, ['average_score'], ['desc']);
    },
    removeIdea(state, idea) {
      state.ideas = state.ideas.filter(i => i.id !== idea.id);
    },
    setIdeasLoaded(state, idea) {
      state.ideasLoaded = true;
    },
    resetIdeas(state) {
      state.ideas = [];
      state.ideasLoaded = false;
      state.currentPage = 1;
    }
  },
  state: {
    ideas: [],
    currentPage: 1,
    ideasLoaded: false
  }
}
