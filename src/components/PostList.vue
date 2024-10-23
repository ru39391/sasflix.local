<template>
  <div
    v-if="postList.length > 0"
    class="post-wrapper"
  >
    <PostItem
      v-for="post in postList"
      :key="post.id"
      :title="post.title"
      :desc="post.body"
      :url="`post-${post.id.toString()}`"
      :tags="post.tags"
      :likes="post.reactions.likes.toString()"
      :dislikes="post.reactions.dislikes.toString()"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import PostItem from './PostItem.vue';

export default defineComponent({
  name: 'PostList',

  components: {
    PostItem,
  },

  setup() {
    const blogStore = useBlogStore();
    const postList = computed(() => blogStore.postList);

    return {
      postList
    };
  }
});
</script>
