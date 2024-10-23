<template>
  <div class="comment">
    <div class="comment__userpic"></div>
    <div class="comment__wrapper">
      <div class="comment__title">{{ name }}</div>
      <div class="comment__text">{{ text }}</div>
      <div class="comment__meta">
        <div class="comment__date">Today</div>
        <button
          class="comment__btn"
          type="button"
          @click="removeComment(id)"
        >
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';

export default defineComponent({
  name: 'CommentItem',

  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
  },

  setup() {
    const blogStore = useBlogStore();

    return {
      removeComment: blogStore.removeComment
    }
  }
});
</script>
