import { defineStore } from 'pinia';
import axios from 'axios';

import type { TRespData, TPostData } from '../../utils/types';

interface IBlogState {
  isLoading: boolean;
  postList: TPostData[];
}

const useBlogStore = defineStore({
  id: 'blog',
  state: (): IBlogState => ({
    isLoading: true,
    postList: []
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
    },
    setPostList(arr: TPostData[]) {
      this.postList = arr;
    },
    async fetchPosts() {
      try {
        const { data: { posts } }: { data: TRespData} = await axios.get('https://dummyjson.com/posts');

        this.setPostList(posts.filter((_, index) => index < 5));
      } catch (error) {
        console.error(error);
      } finally {
        this.setLoading(false);
      }
    },
  },
});

export { useBlogStore };
