<template>
  <!-- <div> -->
  <div  style="display: none;">
      <iframe
        width="300"
        height="200"
        :src="videoURL"
        title="YouTube video player"
        frameborder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
  </div>
</template>

<script setup>
import { computed } from "vue";
import _ from "lodash";
const props = defineProps({
  video: {
    type: Object,
    required: true,
  },
  index: Number,
  current: Number,
});
const videoURL = computed(() => {
  const videoId = props.video.id.videoId;
  return `https://www.youtube.com/embed/${videoId}?start=45&end=65&autoplay=1&mute=0`;
});

const videoTitle = computed(() => {
  return _.unescape(props.video.snippet.title);
});
</script>

<style scoped>
</style>
