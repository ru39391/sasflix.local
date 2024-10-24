<template>
  <Layout>
    <template #content>
      <p v-if="isPostsLoading" class="preloader">{{ alertMessage }}</p>
      <router-view v-else></router-view>
    </template>
  </Layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, onMounted, watch } from 'vue';
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
    const alertMessage = computed(() => blogStore.alertMessage);

    onBeforeMount(() => {
      blogStore.fetchPosts();
    });

    onMounted(() => {
      document.title = 'sasflix';
    });

    watch(
      () => blogStore.postList,
      (arr) => {
        blogStore.fetchComments(arr);
      },
      { deep: false }
    );

    return {
      isPostsLoading,
      alertMessage
    };
  }
});
</script>
