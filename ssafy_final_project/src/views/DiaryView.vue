<template>
  <div>
    <h1>Diary View</h1>
    
    
        <div class="avty-btn-box">
          <div class="button-container">
            <button class="btn btn-outline-all btn-layer-2_0" @click="router.go()">
                전체보기
            </button>
            <button class="btn btn-outline-primary btn-layer-2_1" value="ENJ" @click="avtyDiary">
                ENJ
                <!-- <i class="fa fa-check"></i> -->
            </button>
            <button class="btn btn-outline-secondary btn-layer-2_2" value="ENP" @click="avtyDiary">
                ENP
            </button>
            <button class="btn btn-outline-success btn-layer-2_3" value="ESJ" @click="avtyDiary">
                ESJ
            </button>
            <button class="btn btn-outline-danger btn-layer-2_4" value="ESP" @click="avtyDiary">
                ESP 
            </button>
            <button class="btn btn-outline-primary2 btn-layer-2_5" value="INJ" @click="avtyDiary">
                INJ
            </button>
            <button class="btn btn-outline-secondary btn-layer-2_2" value="INP" @click="avtyDiary">
                INP
            </button>
            <button class="btn btn-outline-success btn-layer-2_3" value="ISJ" @click="avtyDiary">
                ISJ
            </button>
            <button class="btn btn-outline-danger btn-layer-2_4" value="ISP" @click="avtyDiary">
                ISP
            </button>
          </div>
        </div>
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
  import {useRouter} from 'vue-router'

  const router = useRouter()

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
      return store.avtyDiary.slice(
          (currentPage.value - 1) * perPage,
          currentPage.value * perPage
      )
  })
  

  //avty다이어리 가져오기
  const avtyDiary = function(e){
    // router.go()
    // console.log(e.currentTarget.value)
    store.getAvtyDiary(e.currentTarget.value)
    // console.log(store.allDiary)
    // console.log(store.avtyDiary)
    
  }
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

/* @import url("https://fonts.googleapis.com/css?family=Alatsi|Poppins&display=swap"); */
body {
  height: 100vh;
  width: 100%;
  margin: 0;
  background: #f8f8f8;
}

h3 {
  text-align: center;
  margin: 60px auto;
  font-family: "Poppins", sans-serif;
  color: #897bff;
}

.button-container {
  padding: 16px;
  display: flex;
  margin: 60px auto;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.button-container .btn {
  display: flex;
  overflow: hidden;
  margin: 10px;
  padding: 8px 12px;
  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;
  color: #fff;
  border: 0 none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.3;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  justify-content: center;
  align-items: center;
  flex: 0 0 90px;
  font-family: "Alatsi", sans-serif;
  /* BUTTON ROW 1 STYLE */
  /* BUTTON ROW 2 STYLE */
  /* BUTTON ROW 3 STYLE */
}
.button-container .btn:hover {
  transition: all 150ms linear;
  opacity: 0.85;
}
.button-container .btn:active {
  transition: all 150ms linear;
  opacity: 0.75;
}
.button-container .btn:focus {
  outline: none;
}
.button-container .btn-primary {
  background: #A099FB;
  color: #6C5CEA;
}
.button-container .btn-outline-all {
  background: none;
  border: 1px solid #000000;
  color: #000000;
}
.button-container .btn-outline-primary {
  background: none;
  border: 1px solid #A099FB;
  color: #6C5CEA;
}
.button-container .btn-outline-primary2 {
  background: none;
  border: 1px solid #6dac07;
  color: #6C5CEA;
}
.button-container .btn-secondary {
  background: #FE79AB;
  color: #FEB6D3;
}
.button-container .btn-outline-secondary {
  background: none;
  border: 1px solid #FE79AB;
  color: #FEB6D3;
}
.button-container .btn-success {
  background: #01CECB;
  color: #96E6E6;
}
.button-container .btn-outline-success {
  background: none;
  border: 1px solid #01CECB;
  color: #96E6E6;
}
.button-container .btn-danger {
  background: #f32c52;
  color: #ff6c88;
}
.button-container .btn-outline-danger {
  background: none;
  border: 1px solid #f32c52;
  color: #ff6c88;
}
.button-container .btn-layer-2_1 i {
  position: relative;
  left: 30px;
  padding: inherit;
  background: none;
  color: #A099FB;
  border-radius: 5px;
}
.button-container .btn-layer-2_0:hover{
  background : #020202;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_1:hover{
  background : #A099FB;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_2:hover{
  background : #FE79AB;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_3:hover{
  background : #01CECB;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_4:hover{
  background : #f32c52;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_5:hover{
  background : #f32c52;
  color: white;
  font-weight: 900;
}

.avty-btn-box{
  width: 60%;
}

</style>
  