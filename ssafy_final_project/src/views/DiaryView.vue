<template>
  <div>
    <h1>Diary View</h1>
    
    <div id="my-diary-box">
      <DiaryList v-for="diary in currentPageDiaryList" :key="diary.diaryId" :diary="diary" />
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item"><a class="page-link" :class="{ disabled: currentPage <= 1 }" href="#"
                @click.prevent="currentPage--">&lt;</a></li>
        <li :class="{ active: currentPage === page }" v-for="page in pageCount" :key="page">
            <a class="page-link" href="#" @click.prevent="clickPage(page)">{{ page }}</a>
        </li>
        <li class="page-item"><a class="page-link" :class="{ disabled: currentPage >= pageCount }" href="#"
                @click.prevent="currentPage++">&gt;</a></li>
      </ul>
    </nav>
  </div>
</template>
  
<script setup>
  import { ref, onMounted, computed } from 'vue';
  import DiaryList from '@/components/diary/DiaryList.vue';
  import { useDiaryStore } from '@/stores/diary'

  const store = useDiaryStore();

  onMounted(() => {
    store.getAllDiary();
  })

  const perPage = 8;

  const currentPage = ref(1)

  const pageCount = computed(() => {
      return Math.ceil(store.allDiary.length / perPage)
  })
  const clickPage = function (page) {
      currentPage.value = page
  }

  const currentPageDiaryList = computed(() => {
      return store.allDiary.slice(
          (currentPage.value - 1) * perPage,
          currentPage.value * perPage
      )
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
  width: 60%;
  ;
}
</style>
  