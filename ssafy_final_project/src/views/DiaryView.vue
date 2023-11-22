<template>
  <div>
        <div class="avty-btn-box">
          <div class="button-container">
            <button class="btn btn-outline-all btn-layer-2_0 active" value="전체보기" @click="router.go(), changeBtn($event)">
                전체보기
            </button>
            <button class="btn btn-outline-primary btn-layer-2_1" value="ENJ" @click="avtyDiary($event), changeBtn($event)">
                ENJ
            </button>
            <button class="btn btn-outline-secondary btn-layer-2_2" value="ENP" @click="avtyDiary($event), changeBtn($event)">
                ENP
            </button>
            <button class="btn btn-outline-success btn-layer-2_3" value="ESJ" @click="avtyDiary($event), changeBtn($event)">
                ESJ
            </button>
            <button class="btn btn-outline-danger btn-layer-2_4"  value="ESP" @click="avtyDiary($event),changeBtn($event)">
                ESP 
            </button>
            <button class="btn btn-outline-primary2 btn-layer-2_5"  value="INJ" @click="avtyDiary($event), changeBtn($event)">
                INJ
            </button>
            <button class="btn btn-outline-secondary2 btn-layer-2_6"  value="INP" @click="avtyDiary($event), changeBtn($event)">
                INP
            </button>
            <button class="btn btn-outline-success2 btn-layer-2_7"  value="ISJ" @click="avtyDiary($event), changeBtn($event)">
                ISJ
            </button>
            <button class="btn btn-outline-danger2 btn-layer-2_8"  value="ISP" @click="avtyDiary($event), changeBtn($event)">
                ISP
            </button>
          </div>
        </div>
    <div id="my-diary-box">
      <DiaryList v-for="diary in currentPageDiaryList" :key="diary.diaryId" :diary="diary" />
    </div>
    <nav aria-label="Page navigation">
      <ul class="pagination d-flex justify-content-center">
        <li class="page-item">
          <a class="page-link" :class="{ disabled: currentPage <= 1 }" href="#" @click.prevent="currentPage--">&lt;</a>
        </li>
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
  import { useDiaryStore }from '@/stores/diary.js'
  import { useUserStore }from '@/stores/user.js'
  import {useRouter} from 'vue-router'

  const router = useRouter()

  const userStore = useUserStore();
  const diaryStore = useDiaryStore();

  onMounted(() => {
    diaryStore.getAllDiary();
    userStore.loginUser;
  })

  const isActive = ref(false)
  const perPage = 8;

  const currentPage = ref(1)

  const pageCount = computed(() => {
      return Math.ceil(diaryStore.allDiary.length / perPage)
  })
  const clickPage = function (page) {
      currentPage.value = page
  }

  const currentPageDiaryList = computed(() => {
      return diaryStore.avtyDiary.slice(
          (currentPage.value - 1) * perPage,
          currentPage.value * perPage
      )
  })
  

  //avty다이어리 가져오기
  const avtyDiary = function(e){
    // router.go()
    // console.log(e.currentTarget.value)
    diaryStore.getAvtyDiary(e.currentTarget.value)
    // console.log(store.allDiary)
    // console.log(store.avtyDiary)
    
  }

  // 버튼 색상 유지하기
  const changeBtn = function(e) {
    let btns = document.querySelectorAll(".btn");
  btns.forEach(function (btn, i) {
    if (e.currentTarget == btn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
    console.log(e.currentTarget.value);
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
  margin: 40px auto;
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
  border: 1px solid #393E46;
  color: #393E46;
}
.button-container .btn-outline-primary {
  background: none;
  border: 1px solid #A099FB;
  color: #6C5CEA;
}
.button-container .btn-outline-primary2 {
  background: none;
  border: 1px solid #FCE38A;
  color: #FCE38A;
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
.button-container .btn-outline-secondary2 {
  background: none;
  border: 1px solid #79AC78;
  color: #79AC78;
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
.button-container .btn-outline-success2 {
  background: none;
  border: 1px solid #96B6C5;
  color: #96B6C5;
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
.button-container .btn-outline-danger2 {
  background: none;
  border: 1px solid #B3A492;
  color: #B3A492;
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
  background : #FCE38A;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_6:hover{
  background : #79AC78;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_7:hover{
  background : #96B6C5;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_8:hover{
  background : #B3A492;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_0.active{
  background : #020202;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_1.active{
  background : #A099FB;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_2.active{
  background : #FE79AB;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_3.active{
  background : #01CECB;
  color: white;
  font-weight: 900;
}

.button-container .btn-layer-2_4.active{
  background : #f32c52;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_5.active{
  background : #FCE38A;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_6.active{
  background : #79AC78;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_7.active{
  background : #96B6C5;
  color: white;
  font-weight: 900;
}
.button-container .btn-layer-2_8.active{
  background : #B3A492;
  color: white;
  font-weight: 900;
}

.avty-btn-box{
  width: 64%;
}

.page-link {
  color: #000; 
  background-color: #ffffff;
  border: 1px solid #ccc; 
}

.page-item.active .page-link {
 z-index: 1;
 color: #555;
 font-weight:bold;
 background-color:#cdcdcd;
 border-color:#cdcdcd;
 
}

.page-link:focus, .page-link:hover {
  color: #000;
  background-color:#cdcdcd; 
  border-color: #cdcdcd;
}
</style>
  