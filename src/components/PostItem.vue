<template>
  <h2>{{ name }}</h2>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostItem',

  props: {
    name: {
      type: String,
      required: true,
    },
  }
});
</script>

<style scoped>
</style>
