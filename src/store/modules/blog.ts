import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  API_URL,
  IS_LIKED_KEY,
  IS_DIS_LIKED_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  COMMENTS_ERROR_MESS
} from '../../utils/constants';
import axios from 'axios';

import type {
  TPostData,
  TPostRespData,
  TCommentData,
  TCommentRespData,
  TLikedData
} from '../../utils/types';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<boolean>(true);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);
  const postList = ref<TPostData[]>([]);
  const currentPost = ref<TPostData | undefined>(undefined);
  const commentList = ref<TCommentData[]>([]);
  const likesList = ref<TLikedData[]>([]);

  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  const setAlertMessage = (value: string) => {
    alertMessage.value = value;
  };

  const setPostList = (arr: TPostData[]) => {
    postList.value = [...arr];
  };

  const setCurrentPost = (id: number) => {
    if(id !== 0 && !id) {
      currentPost.value = undefined;
      return;
    }

    currentPost.value = postList.value.find(item => item.id === id);
  };

  const setCommentList = (arr: TCommentData[]) => {
    commentList.value = [...arr];
  };

  const removeComment = (id: string) => {
    const arr = commentList.value.filter(item => item.id !== Number(id));

    setCommentList(arr);
  };

  const setLikesList = (arr: TLikedData[]) => {
    likesList.value = [...arr];
  };

  const ratePost = ({ id, key }: { id: string; key: 'isLiked' | 'isDisLiked' }) => {
    const arr = likesList.value.map(
      item => ({
        ...item,
        ...(
          item.id === Number(id) && {
            [key]: !item[key] as boolean,
            ...( key === IS_LIKED_KEY && { [IS_DIS_LIKED_KEY]: false } ),
            ...( key === IS_DIS_LIKED_KEY && { [IS_LIKED_KEY]: false } )
          }
        )
      })
    );

    setLikesList(arr);
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data: { posts } }: { data: TPostRespData} = await axios.get(API_URL);

      setPostList(posts.filter((_, index) => index < 5));
      setLikesList(
        posts
          .map(item => ({ id: item.id, isLiked: false, isDisLiked: false }))
          .filter((_, index) => index < 5)
      );
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (arr : TPostData[]) => {
    if(arr.length === 0) {
      setCommentList([]);
      return;
    }

    setLoading(true);

    try {
      const response = await Promise.all(arr.map(({ id }) => axios.get(`${API_URL}/${id.toString()}/comments`)));

      setCommentList(response.reduce((acc: TCommentData[], { data }: { data: TCommentRespData }) => [...acc, ...data.comments], []));
    } catch (error) {
      setAlertMessage(COMMENTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    postList,
    currentPost,
    commentList,
    likesList,
    setLoading,
    fetchPosts,
    setCurrentPost,
    ratePost,
    fetchComments,
    removeComment,
  };
});

export { useBlogStore };
