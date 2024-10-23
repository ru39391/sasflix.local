<template>
  <Layout>
    <template #content><PostList /></template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
  name: 'Blog',

  components: {
    Layout,
    PostList
  },
});
</script>

<style scoped>
</style>
