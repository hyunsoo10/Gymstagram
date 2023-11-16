<template>
  <v-card
    class="mx-auto"
    width="300"
    height="400"
  >
    <v-img
      class="align-end text-white"
      height="200"
      :src="`src/assets/diary_image/${diary.userId}/${diary.saveImage}`"
      cover
    >
    <!-- <v-img
      class="align-end text-white"
      height="200"
      :src="`src/assets/diary_image/${diary.image}.jpg`"
      cover
    > -->
    <!-- <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    > -->
      <v-card-title>{{diary.title}}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
        {{diary.createDate}}
    </v-card-subtitle>

    <v-card-text>
      <div>{{diary.title}}</div>

      <div class="text-truncate">{{diary.content}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn color="orange">
        Share
      </v-btn>

      <v-btn color="orange">
        Explore
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
    import {ref} from 'vue'
    const props = defineProps({
        diary: Object
    })
   const  cards = ref( [
        { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
      ],
    )
</script>

<style  scoped>

</style>