<template>
  <PostItem
    v-for="item in [{id: 0, name: 'Первый пост'}, {id: 1, name: 'Второй пост'}]"
    :key="item.id"
    :name="item.name"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PostItem from './PostItem.vue';

export default defineComponent({
  name: 'PostList',

  components: {
    PostItem,
  }
});
</script>

<style scoped>
</style>
