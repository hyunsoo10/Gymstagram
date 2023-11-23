<template>
  <v-card class="card" width="300" height="400" :to="`/detail/${diary.diaryId}`" :diary="diary">
    <v-img class="align-end text-white" height="200" :src="`src/assets/diary_image/${diary.userId}/${diary.saveImage}`" cover>
    </v-img>
    <v-card-title>{{ diary.title }}</v-card-title>

    <v-card-subtitle class="pt-4">
      <div>{{ diary.createDate }}</div>
    </v-card-subtitle>
    
    <v-card-text>
      <div class="text-truncate">{{ diary.content }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn :class="diary.avty" v-bind="props">
           {{ diary.avty }}
      </v-btn>
      <!-- <v-btn  v-bind="props">
          <RouterLink :to="`/detail/${diary.diaryId}`" :diary="diary">자세히 보기</RouterLink>
      </v-btn> -->
      <!-- <v-dialog
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
      </v-dialog> -->
    </v-card-actions>
  </v-card>
</template>
<!-- <template>
<v-infinite-scroll :height="300" :items="diaryStore.allDiary" :onLoad="load">
  <template v-for="(item, index) in items" :key="item">
    <div :class="['pa-2', index % 2 === 0 ? 'bg-grey-lighten-2' : '']">
      Item {{ item.diaryId }}
    </div>
  </template>
</v-infinite-scroll>
</template> -->
<script setup>
import { ref, onMounted } from 'vue'
// import DiaryDetail from '@/components/diary/DiaryDetail.vue'
import { useDiaryStore } from '@/stores/diary'
import axios from 'axios';
const props = defineProps({
  diary: Object
})
// const cards = ref([
//   { title: 'Pre-fab homes', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
//   { title: 'Favorite road trips', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
//   { title: 'Best airlines', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 },
// ],
// )



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

.v-card{
  margin: 1em 0.5em;
}
.v-card-title {
  font-size: 1.2em;
  font-weight: 700;
}
.v-btn__content a{
  text-decoration: none;
  color: #776B5D;
  font-weight: 700;
}
.v-card-actions{
  justify-content: space-between;
}
.ENJ{
  font-weight: 900;
  border: 1px solid #A099FB;
  color : #A099FB;
  background: #a099fb3b;
}
.ENP{
  font-weight: 900;
  border: 1px solid #FE79AB;
  color : #FE79AB;
  background:  #fe79ac36;
}
.ESJ{
  font-weight: 900;
  border: 1px solid #01CECB;
  color : #01CECB;
  background: #01cecb3a;
}
.ESP{
  font-weight: 900;
  border: 1px solid #f32c52;
  color : #f32c52;
  background: #f32c502d;
}
.INJ{
  font-weight: 900;
  border: 1px solid #FCE38A;
  color : #FCE38A;
  background: #fce38a2c;
}
.INP{
  font-weight: 900;
  border: 1px solid #79AC78;
  color : #79AC78;
  background: #79ac782a;
}
.ISJ{
  font-weight: 900;
  border: 1px solid #96B6C5;
  color : #96B6C5;
  background:  #96b6c531;
}
.ISP{
  font-weight: 900;
  border: 1px solid #B3A492;
  color : #B3A492;
  background: #b3a49249;
}

</style>