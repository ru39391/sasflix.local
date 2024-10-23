<template>
  <article class="post">
    <h2 class="post__title">{{ title }}</h2>
    <p class="post__desc">{{ desc }}</p>
    <footer class="post__footer">
      <div class="post__counter">
        <button class="post__btn" type="button">
          <LikeIcon />
          Like
          <span class="post__btn-counter">{{ likes }}</span>
        </button>
        <button class="post__btn" type="button">
          <DislikeIcon />
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
import LikeIcon from '../assets/icons/LikeIcon.vue';
import DislikeIcon from '../assets/icons/DislikeIcon.vue';
import LikeFilledIcon from '../assets/icons/LikeFilledIcon.vue';
import DislikeFilledIcon from '../assets/icons/DislikeFilledIcon.vue';

export default defineComponent({
  name: 'PostItem',

  components: {
    LikeIcon,
    DislikeIcon,
    LikeFilledIcon,
    DislikeFilledIcon
  },

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
