import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

import type { TRespData, TPostData } from '../../utils/types';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref(true);
  const postList = ref<TPostData[]>([]);
  const currentPost = ref<TPostData | undefined>(undefined);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setPostList = (arr: TPostData[]) => {
    postList.value = arr;
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data: { posts } }: { data: TRespData} = await axios.get('https://dummyjson.com/posts');

      setPostList(posts.filter((_, index) => index < 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const setCurrentPost = (id: number) => {
    if(id !== 0 && !id) {
      currentPost.value = undefined;
    }

    currentPost.value = postList.value.find(post => post.id === id);
  };

  return {
    isLoading,
    postList,
    currentPost,
    setLoading,
    setPostList,
    fetchPosts,
    setCurrentPost
  };
});

export { useBlogStore };
