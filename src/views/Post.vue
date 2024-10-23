<template>
  <Layout>
    <template #content>Post</template>
  </Layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from '../components/Layout.vue';

export default defineComponent({
  name: 'Post',

  components: {
    Layout
  }
});
</script>

<style scoped>
</style>
