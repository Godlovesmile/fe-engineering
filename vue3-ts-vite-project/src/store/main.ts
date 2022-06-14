import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'mian',
  state: () => ({
    name: '超级管理员',
  }),
  // getters
  getters: {
    nameLen: (state) => state.name.length,
  },
  // actions
  actions: {
    async changeName(name: string) {
      this.name = name
    },
  },
})
