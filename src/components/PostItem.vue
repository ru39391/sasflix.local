<template>
  <article class="post">
    <h2 class="post__title">{{ title }}</h2>
    <p class="post__desc">{{ desc }}</p>
    <footer class="post__footer">
      <div class="post__counter">
        <button
          :class="['post__btn', { 'post__btn_bg_red': isLiked }]"
          type="button"
          @click="ratePost({ id, key: 'isLiked' })"
        >
          <LikeFilledIcon v-if="isLiked" /><LikeIcon v-else />
          Like
          <span class="post__btn-counter">{{ currLikes }}</span>
        </button>
        <button
          :class="['post__btn', { 'post__btn_bg_black': isDisLiked }]"
          type="button"
          @click="ratePost({ id, key: 'isDisLiked' })"
        >
          <DislikeFilledIcon v-if="isDisLiked" /><DislikeIcon v-else />
          Trash
          <span class="post__btn-counter">{{ currDisLikes }}</span>
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
import { computed, defineComponent } from 'vue';
import { useBlogStore } from '../store/modules/blog';
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
    id: {
      type: String,
      required: true,
    },
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
    isLiked: {
      type: Boolean,
      required: false,
    },
    isDisLiked: {
      type: Boolean,
      required: false,
    },
  },

  setup(props) {
    const blogStore = useBlogStore();

    const currLikes = computed(() => {
      const likes = props.isLiked ? Number(props.likes) + 1 :  Number(props.likes);

      return likes.toString();
    });

    const currDisLikes = computed(() => {
      const dislikes = props.isDisLiked ? Number(props.dislikes) + 1 :  Number(props.dislikes);

      return dislikes.toString();
    });

    return {
      currLikes,
      currDisLikes,
      ratePost: blogStore.ratePost
    };
  },
});
</script>
