<template>
  <div>
    <h1>Diary View</h1>
    <div id="my-diary-box">
      <DiaryList v-for="diary in store.allDiary" :key="diary.diaryId" :diary="diary" />
    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import DiaryList from '@/components/diary/DiaryList.vue';
import { useDiaryStore } from '@/stores/diary'

const store = useDiaryStore();

onMounted(() => {
  store.getAllDiary();
})

</script>
  
<style scoped>
div {
  margin: 30px auto;
  text-align: center;
}

#my-diary-box {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 40%;
  ;
}
</style>
  