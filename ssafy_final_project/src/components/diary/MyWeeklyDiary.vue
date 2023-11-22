<template>
  <!-- <v-card
      class="mx-auto"
      max-width="344"
    > -->
  <v-card class='weekly-card' width="300">
    <v-img :src="`../src/assets/diary_image/${diary.userId}/${diary.saveImage}`" height="200px" cover></v-img>

    <v-card-title>
      {{ diary.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ diary.userId }}
    </v-card-subtitle>

    <v-card-subtitle>
      {{ diary.createDate }}
    </v-card-subtitle>

    <v-card-text class="text-body-2">
          {{ diary.content }}
        </v-card-text>

    <!-- <v-card-actions>
      <v-btn color="black" variant="text">
        내용보기
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'" @click="show = !show"></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ diary.content }}
        </v-card-text>
      </div>
    </v-expand-transition> -->
  </v-card>
</template>

<script setup>

import { ref, } from 'vue'

const props = defineProps({
  diary: Object
})


const show = ref(false)

</script>

<style  scoped>
.weekly-card {
  margin: 1.5em;
}</style>