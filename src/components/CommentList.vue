<template>
  <section class="comment-wrapper">
    <h2 class="comment-heading">{{ setCommentsCaption(commentList.length) }}</h2>
    <CommentItem
      v-for="comment in commentList"
      :key="comment.id"
      :name="comment.user.fullName"
      :text="comment.body"
    />
  </section>
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

    const setCommentsCaption = (count: number) => {
      if(count === 0) {
        return 'Ещё никто не оставил комментарий';
      }

      const lastTwoDigits = count % 100;

      if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
        return `${count.toString()} комментариев`;
      }

      const lastDigit = count % 10;

      if (lastDigit === 1) {
        return `${count.toString()} комментарий`;
      } else if (lastDigit >= 2 && lastDigit <= 4) {
        return `${count.toString()} комментария`;
      } else {
        return `${count.toString()} комментариев`;
      }
    };

    return {
      commentList,
      setCommentsCaption
    };
  }
});
</script>
