// export const state = () => ({
//   partials: {},
// })

// export const mutations = {
//   setPartials(state, partials) {
//     state.partials = partials
//   },
// }

// export const actions = {
//   async loadPartials({ commit }) {
//     const partials = (await this.$prismic.api.getSingle('partials')).data
//     commit('setPartials', partials)
//   },
// }

export const state = () => ({
  partials: {},
})

export const mutations = {
  SET_MENU(state, partials) {
    state.partials = partials
  },
  SET_ERROR(state, error) {
    state.partials = error
  },
}

export const actions = {
  async fetchMenu({ commit }, $prismic) {
    try {
      const partials = (await $prismic.api.getSingle('partials')).data

      commit('SET_MENU', partials)
    } catch (e) {
      const error = 'Please create a menu document'

      commit('SET_ERROR', error)
    }
  },
}
