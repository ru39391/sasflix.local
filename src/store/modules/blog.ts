import { defineStore } from 'pinia';
import { ref } from 'vue';
import {
  API_URL,
  IS_LIKED_KEY,
  IS_DIS_LIKED_KEY,
  DATA_IS_LOADING_MESS,
  POSTS_ERROR_MESS,
  COMMENTS_ERROR_MESS
} from '../../utils/constant';
import axios from 'axios';

import type {
  TCommentData,
  TCommentRespData,
  TCustomData,
  TPostData,
  TPostRespData
} from '../../utils/types';

const useBlogStore = defineStore('blog', () => {
  const isLoading = ref<boolean>(true);
  const commentList = ref<TCommentData[]>([]);
  const postList = ref<TPostData[]>([]);
  const currentPost = ref<TPostData | undefined>(undefined);
  const alertMessage = ref<string>(DATA_IS_LOADING_MESS);

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
    }

    currentPost.value = postList.value.find(item => item.id === id);
  };

  const ratePost = ({ id, key }: TCustomData<string>) => {
    const data = postList.value.find(item => item.id === Number(id));
    const arr = postList.value.map(
      item => ({
        ...item,
        ...(
          item.id === Number(id) && {
            [key]: !item[key],
            ...( key === IS_LIKED_KEY && { [IS_DIS_LIKED_KEY]: false } ),
            ...( key === IS_DIS_LIKED_KEY && { [IS_LIKED_KEY]: false } )
          }
        )
      })
    );

    setPostList([...arr])

    if(data && currentPost) {
      setCurrentPost(Number(id));
    }
  };

  const setCommentList = (arr: TCommentData[]) => {
    commentList.value = arr;
  };

  const removeComment = (id: string) => {
    const arr = commentList.value.filter(item => item.id !== Number(id));

    setCommentList(arr);
  };

  const fetchPosts = async () => {
    setLoading(true);

    try {
      const { data: { posts } }: { data: TPostRespData} = await axios.get(API_URL);

      setPostList(
        posts
          .map(item => ({ ...item, isLiked: false, isDisLiked: false }))
          .filter((_, index) => index < 5)
      );
    } catch (error) {
      setAlertMessage(POSTS_ERROR_MESS);
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
      setAlertMessage(COMMENTS_ERROR_MESS);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    isLoading,
    alertMessage,
    commentList,
    postList,
    currentPost,
    setLoading,
    removeComment,
    fetchPosts,
    fetchComments,
    setCurrentPost,
    ratePost
  };
});

export { useBlogStore };
