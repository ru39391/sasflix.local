<template>
  <p v-if="isPostsLoading">Данные загружаются</p><Blog v-else />
</template>

<script lang="ts">
import { onBeforeMount, computed, defineComponent } from 'vue';
import { useBlogStore } from './store/modules/blog';
import Blog from './views/Blog.vue';

export default defineComponent({
  name: 'App',

  components: {
    Blog
  },

  setup() {
    const blogStore = useBlogStore();
    const isPostsLoading = computed(() => blogStore.isLoading);

    onBeforeMount(() => {
      blogStore.fetchPosts();
    });

    return {
      isPostsLoading
    };
  }
});
</script>

<style scoped>
</style>
