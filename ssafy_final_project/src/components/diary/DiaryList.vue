<template>
  <v-card class="card" width="300" height="400" :to="`detail/${diary.diaryId}`" :diary="diary">

    <!-- saveImage에 Base64로 인코딩한 문자열을 저장한 경우 이렇게 불러올 수 있다.-->
    <!-- <v-img class="align-end text-white" height="200" :src="diary.saveImage" cover> </v-img> -->
    <v-img class="align-end text-white" height="200" :src="`src/assets/diary_image/${diary.userId}/${diary.saveImage}`"
      cover>
    </v-img>
    <v-card-title>{{ diary.title }}</v-card-title>

    <v-card-subtitle class="pt-4">
      <div>{{ dateString }} </div>
    </v-card-subtitle>

    <v-card-text>
      <div class="text-truncate">{{ diary.content }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn :class="diary.avty" v-bind="props">
        {{ diary.avty }}
      </v-btn>
      <v-card-text class="userId-info">
        {{ diary.userId }}
      </v-card-text>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDiaryStore } from '@/stores/diary'
const props = defineProps({
  diary: Object
})

let originDate = new Date(props.diary.createDate);

let year = originDate.getFullYear();
let month = ('0' + (originDate.getMonth() + 1)).slice(-2);
let day = ('0' + originDate.getDate()).slice(-2);


const dateString = ref(year + '-' + month + '-' + day);

const diaryStore = useDiaryStore();

onMounted(() => {
  diaryStore.getAllComments()
})

</script>

<style  scoped>
.v-card {
  margin: 1em 0.5em;
}

.v-card-title {
  font-size: 1.2em;
  font-weight: 700;
}

.v-btn__content a {
  text-decoration: none;
  color: #776B5D;
  font-weight: 700;
}

.v-card-actions {
  justify-content: space-between;
}

.ENJ {
  font-weight: 900;
  border: 1px solid #A099FB;
  color: #A099FB;
  background: #a099fb3b;
}

.ENP {
  font-weight: 900;
  border: 1px solid #FE79AB;
  color: #FE79AB;
  background: #fe79ac36;
}

.ESJ {
  font-weight: 900;
  border: 1px solid #01CECB;
  color: #01CECB;
  background: #01cecb3a;
}

.ESP {
  font-weight: 900;
  border: 1px solid #f32c52;
  color: #f32c52;
  background: #f32c502d;
}

.INJ {
  font-weight: 900;
  border: 1px solid #FCE38A;
  color: #FCE38A;
  background: #fce38a2c;
}

.INP {
  font-weight: 900;
  border: 1px solid #79AC78;
  color: #79AC78;
  background: #79ac782a;
}

.ISJ {
  font-weight: 900;
  border: 1px solid #96B6C5;
  color: #96B6C5;
  background: #96b6c531;
}

.ISP {
  font-weight: 900;
  border: 1px solid #B3A492;
  color: #B3A492;
  background: #b3a49249;
}

.userId-info {
  text-align: end;
  font-weight: lighter;
  font-size: 14px;
}
</style>