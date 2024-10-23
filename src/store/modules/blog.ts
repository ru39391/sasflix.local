import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { API_URL } from '../../utils/constant';
import axios from 'axios';

import type {
  TCommentData,
  TCommentRespData,
  TPostData,
  TPostRespData
} from '../../utils/types';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref(true);
  const commentList = ref<TCommentData[]>([]);
  const postList = ref<TPostData[]>([]);
  const currentPost = ref<TPostData | undefined>(undefined);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setPostList = (arr: TPostData[]) => {
    postList.value = arr;
  };

  const setCommentList = (arr: TCommentData[]) => {
    commentList.value = arr;
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data: { posts } }: { data: TPostRespData} = await axios.get(API_URL);

      setPostList(posts.filter((_, index) => index < 5));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (data: TPostData | undefined) => {
    if(!data) {
      setCommentList([]);
    }

    setLoading(true);

    try {
      const { data: { comments } }: { data: TCommentRespData} = await axios.get(`${API_URL}/${data?.id.toString()}/comments`);

      setCommentList(comments);
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
    commentList,
    postList,
    currentPost,
    setLoading,
    setPostList,
    fetchPosts,
    fetchComments,
    setCurrentPost
  };
});

export { useBlogStore };
