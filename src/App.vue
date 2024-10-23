<template>
  <Layout>
    <template #content>
      <p v-if="isPostsLoading">Данные загружаются</p>
      <router-view v-else></router-view>
    </template>
  </Layout>
</template>

<script lang="ts">
import { onBeforeMount, computed, defineComponent } from 'vue';
import { useBlogStore } from './store/modules/blog';
import Layout from './components/Layout.vue';

export default defineComponent({
  name: 'App',

  components: {
    Layout
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
