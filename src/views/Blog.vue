<template>
  <PostList />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostList from '../components/PostList.vue';

export default defineComponent({
  name: 'Blog',

  components: {
    PostList
  },
});
</script>
