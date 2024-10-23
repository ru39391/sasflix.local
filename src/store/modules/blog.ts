import { defineStore } from 'pinia';

const useBlogStore = defineStore({
  id: 'blog',
  state: () => ({
    isLoading: true,
    postList: []
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
    },
    fetchPostList(arr) {
      this.postList = arr;
    },
  },
});

export { useBlogStore };
