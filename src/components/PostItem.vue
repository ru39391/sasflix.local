<template>
  <article class="post">
    <h2 class="post__title">{{ title }}</h2>
    <p class="post__desc">{{ desc }}</p>
    <footer class="post__footer">
      <div class="post__counter">
        <button class="post__btn post__btn_rounded_left" type="button">
          Like
          <span class="post__btn-counter">{{ likes }}</span>
        </button>
        <button class="post__btn post__btn_rounded_right" type="button">
          Trash
          <span class="post__btn-counter">{{ dislikes }}</span>
        </button>
      </div>
      <div class="post__meta">
        <router-link
          v-if="url"
          :to="url"
          class="post__link"
        >
          Open comments
        </router-link>
        <div class="post__date">Today</div>
      </div>
      <div class="post__tags">
        <a v-for="(tag, index) in tags" :key="index" class="post__tags-item" href="#">{{ tag }}</a>
      </div>
    </footer>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'PostItem',

  props: {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    url: {
      type: String,
      required: false,
    },
    tags: {
      type: Array as () => string[],
      required: false,
    },
    likes: {
      type: String,
      required: false,
    },
    dislikes: {
      type: String,
      required: false,
    },
  }
});
</script>

<style scoped>
</style>
