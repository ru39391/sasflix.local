<template>
  <PostItem
    v-if="currentPost"
    :title="currentPost.title"
    :desc="currentPost.body"
    :tags="currentPost.tags"
    :likes="currentPost.reactions.likes.toString()"
    :dislikes="currentPost.reactions.dislikes.toString()"
  />
  <CommentList />
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch } from 'vue';
import { useBlogStore } from '../store/modules/blog';
import CommentList from '../components/CommentList.vue';
import PostItem from '../components/PostItem.vue';

export default defineComponent({
  name: 'Post',

  components: {
    CommentList,
    PostItem
  },

  props: {
    id: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const blogStore = useBlogStore();
    const currentPost = computed(() => blogStore.currentPost);

    onBeforeMount(() => {
      blogStore.setCurrentPost(Number(props.id));
    });

    watch(
      () => blogStore.currentPost,
      (data) => {
        blogStore.fetchComments(data);
      },
      { deep: true }
    );

    return {
      currentPost
    };
  }
});
</script>
