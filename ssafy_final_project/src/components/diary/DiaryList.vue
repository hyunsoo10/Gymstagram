<template>
  <v-card class="mx-auto" width="300" height="400">
    <v-img class="align-end text-white" height="200" :src="`src/assets/diary_image/${diary.userId}/${diary.saveImage}`"
      cover>
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
      <v-card-title>{{ diary.title }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ diary.createDate }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ diary.title }}</div>

      <div class="text-truncate">{{ diary.content }}</div>
    </v-card-text>
    <v-card-actions>
      <v-dialog
        transition="dialog-bottom-transition"
        width="auto"
      >
        <template v-slot:activator="{ props }">
          <v-btn
            color="primary"
            v-bind="props"
          >자세히보기</v-btn>
        </template>
        <template v-slot:default="{ isActive }">
          <v-card width="100%" height="100%">
            <v-toolbar
              color="blue-grey-lighten-5"
              :title="diary.userId"
            ></v-toolbar>
            <v-card-text>
              <!-- <div class="text-h2 pa-12">Hello world!</div> -->
              <DiaryDetail
                :diary = "diary"
                :comments = "comments"
              />
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                variant="text"
                @click="isActive.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import DiaryDetail from '@/components/diary/DiaryDetail.vue'
import { useDiaryStore } from '@/stores/diary'
const props = defineProps({
  diary: Object
})
const cards = ref([
  { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
  { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
  { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
],
)
const diaryStore = useDiaryStore();

const comments = ref()

onMounted(() => {
  diaryStore.getAllComments()
})

const getComments = (diaryId) => {
    console.log(diaryId)
    diaryStore.getDiaryComments(diaryId)
    comments.value = diaryStore.comments
    console.log(diaryStore.comments)
}
</script>

<style  scoped>

</style>