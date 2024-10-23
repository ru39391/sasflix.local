<template>
  <Layout>
    <template #content>
      <p v-if="isPostsLoading" class="preloader">Данные загружаются</p>
      <router-view v-else></router-view>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted } from 'vue';
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

    onMounted(() => {
      document.title = 'sasflix';
    });

    return {
      isPostsLoading
    };
  }
});
</script>
