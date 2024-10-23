<template>
  <PostItem
    v-if="currentPost"
    :title="currentPost.title"
    :desc="currentPost.body"
    :tags="currentPost.tags"
    :likes="currentPost.reactions.likes.toString()"
    :dislikes="currentPost.reactions.dislikes.toString()"
  />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import PostItem from '../components/PostItem.vue';

export default defineComponent({
  name: 'Post',

  components: {
    PostItem
  },

  props: {
    id: {
      type: Number,
      required: true
    }
  },

  setup(props) {
    const blogStore = useBlogStore();
    const currentPost = computed(() => blogStore.currentPost);

    onBeforeMount(() => {
      blogStore.setCurrentPost(Number(props.id));
    });

    return {
      currentPost
    };
  }
});
</script>

<style scoped>
</style>
