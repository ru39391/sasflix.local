<template>
  <h2>
    <template v-if="isCommentListExist">{{ commentList.length }} комментариев</template>
    <template v-else>Ещё никто не оставил комментарий</template>
  </h2>
  <CommentItem
    v-for="comment in commentList"
    :key="comment.id"
    :name="comment.user.fullName"
    :text="comment.body"
  />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import CommentItem from './CommentItem.vue';

export default defineComponent({
  name: 'CommentList',

  components: {
    CommentItem,
  },

  setup() {
    const blogStore = useBlogStore();
    const commentList = computed(() => blogStore.commentList);

    return {
      commentList,
      isCommentListExist: blogStore.isCommentListExist
    };
  }
});
</script>
