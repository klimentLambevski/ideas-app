export default {
  mutations: {
    setSelf(state, self) {
      state.thisUser = self;
    }
  },
  state: {
    thisUser: null
  }
}
