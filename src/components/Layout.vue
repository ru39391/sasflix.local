<template>
  <div class="wrapper">
    <header class="header">ikakprosto.ru</header>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Layout'
});
</script>

<style scoped>
</style>
