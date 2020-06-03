export const state = () => ({
    prefectures: []
})

export const mutations = {
    add (state, data) {
      state.prefectures = data
    }
}
