<template>
  <v-card class='weekly-card' width="300">
    <RouterLink :to="`/detail/${diary.diaryId}`" :diary="diary" class="cursor">
      <v-img :src="`../src/assets/diary_image/${diary.userId}/${diary.saveImage}`" height="200px" cover></v-img>
    </RouterLink>
    <v-card-title>
      {{ diary.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ diary.userId }}
    </v-card-subtitle>

    <v-card-subtitle>
      {{ dateString }}
    </v-card-subtitle>

    <v-card-text class="text-body-2">
      {{ diary.content }}
    </v-card-text>
  </v-card>
</template>

<script setup>

import { ref, } from 'vue'

const props = defineProps({
  diary: Object
})

let originDate = new Date(props.diary.createDate);

let year = originDate.getFullYear();
let month = ('0' + (originDate.getMonth() + 1)).slice(-2);
let day = ('0' + originDate.getDate()).slice(-2);


const dateString = ref(year + '-' + month + '-' + day);

</script>

<style  scoped>
.weekly-card {
  margin: 1.5em;
}
</style>