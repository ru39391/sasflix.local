<template>
  <div class="wrapper">
    <header class="header">
      <h1 v-if="isMainPage" class="header__title">ikakprosto.ru</h1>
      <router-link
        v-else
        to="/"
        class="header__title"
      >
        ikakprosto.ru
      </router-link>
    </header>
    <slot name="content"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'Layout',

  setup() {
    const route = useRoute();
    const isMainPage = computed(() => route.path === '/');

    return {
      isMainPage
    };
  }
});
</script>

<style scoped>
</style>
