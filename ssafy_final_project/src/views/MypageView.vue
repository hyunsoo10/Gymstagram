<template>
  <template v-if="userStore.loginUser != null && !userStore.loginUser.activate">
    <v-dialog width="auto" v-model="activateDialog" transition="dialog-bottom-transition" persistent>
      <template v-slot:activator="{ props }">
        <!-- <v-btn v-bind="props" text="Open Dialog"></v-btn> -->
      </template>
      <template v-slot:default="{ isActive }">
        <v-card title="계정 비활성화 상태">
          <v-card-text>
            현재 계정이 비활성화 된 상태입니다.
          </v-card-text>
          <small style="color:red">비활성화를 해제하시려면 비밀번호를 입력해주세요</small>
          <v-col cols="12">
            <v-text-field label="비밀번호*" type="password" required v-model="confirmPassword"></v-text-field>
          </v-col>
          <v-card-actions>
            <v-btn text="계정 활성화" class="activate-btn" @click="ableUser()"></v-btn>
            <v-btn text="홈으로 가기" class="home-btn" @click="gohome()"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </template>
  <div id="my-page">
    <div class="profile-box" v-if="userStore.loginUser != null">
      <Profile :total-cnt="myDiary.length" :weekly-cnt="diaryStore.weeklyDiary.length" :my-id="userId" />
      <!-- <RouterLink to="/create">다이어리 작성하기</RouterLink> -->
      <v-btn class="write-btn" @click.stop="dialog = true">
        다이어리 작성하기
      </v-btn>
      <DiaryCreate @close-Dialog="close" :dialog="dialog" v-model="dialog"></DiaryCreate>
      <AVTY />
    </div>
    <v-card width=60% v-if="userStore.loginUser != null">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1" color="#B0A695">My Weekly Diary</v-tab>
        <v-tab :value="2" color="#B0A695">My Total Diary</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="n in 2" :key="n" :value="n">
          <v-container fluid>
            <template v-if="n == 1">
              <h1>My Weekly Diary</h1>
              <div class="weekly-diary-box">
                <MyWeeklyDiary v-for="diary in diaryStore.weeklyDiary" :key="diary.diaryId" :diary="diary" />
              </div>
            </template>
            <template v-if="n == 2">
              <h1>My Total Diary</h1>
              <v-sheet class="total-calendar">
                <VCalendar expanded :color="selectedColor" :attributes="attrs" @dayclick="selectDiary" view="monthly"
                  :masks="masks" :first-day-of-week="2" />
              </v-sheet>
              <!-- <MyDiary v-for="diary in myDiary" :key="diary.diaryId" :diary="diary" /> -->
              <div class="total-diary-box">
                <MyDiary v-for="diary in dateDiary" :key="diary.diaryId" :diary="diary" />
              </div>
            </template>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>

  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDiaryStore } from '@/stores/diary'
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import MyDiary from '@/components/diary/MyDiary.vue';
import Profile from '@/components/diary/Profile.vue';
import AVTY from '@/components/diary/AVTY.vue'
import DiaryCreate from '@/components/diary/DiaryCreate.vue';
import MyWeeklyDiary from '@/components/diary/MyWeeklyDiary.vue'

const route = useRoute();
const diaryStore = useDiaryStore();
const userStore = useUserStore();
const router = useRouter();
const activateDialog = ref(true)

const userId = ref(route.params.userId);
//전체 다이어리 중에 my diary만 가져오기
//diary 목록 중에 login한 user의 id와 같은 diary들만 filter
const myDiary = computed(() => {
  return diaryStore.allDiary.filter((diary) => {
    return diary.userId == userStore.loginUser.userId
  })
})

// v-Calender
const selectedColor = ref('yellow');

const masks = ref({
  title: 'YYYY년 MM월',
  weekdays: 'W',
  navMonths: 'MMM',
})

// 오늘날짜 받아오기
let today = new Date();
let year = today.getFullYear();
let month = ('0' + (today.getMonth() + 1)).slice(-2);
let day = ('0' + today.getDate()).slice(-2);

let dateString = year + '-' + month + '-' + day;


// 달력에서 고른 날짜(기본값이 오늘 날짜)
const selectDate = ref(dateString)

const selectDiary = (day, event) => {
  console.log(day.id)
  selectDate.value = day.id
  console.log(myDiary)
}

const dateDiary = computed(() => {
  return diaryStore.allDiary.filter((diary) => {
    return diary.userId == userStore.loginUser.userId && diary.createDate === selectDate.value
  })
})

const attrs = ref([
  {
    key: 'today',
    highlight: {
      color: 'blue',
      fillMode: 'light',
    },
    dates: new Date(),
  },
  {
    key: 'selectDate',
    dot: 'red',
    dates: [],
  },
]);

// 모달창 false
const dialog = ref(false);
const close = function () {
  console.log(dialog.value)
  dialog.value = false
}
const confirmPassword = ref()

const loginUser = ref({});

const tab = ref(null)
onMounted(() => {
  loginUser.value = userStore.loginUser
  diaryStore.getAllDiary(loginUser.value.userId);
  diaryStore.getWeeklyDiary(loginUser.value.userId);
  // 내가 작성한 다이어리들의 날짜
  attrs.value[1].dates = diaryStore.dates;
})

const ableUser = () => {
  // console.log("계정 활성화")
  if (confirmPassword.value === userStore.loginUser.userPassword) {
    axios({
      url: `http://localhost:8080/user-api/user/activate/${userStore.loginUser.userId}`,
      method: 'PUT',
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then((res) => {
        let user = {
          userId: userStore.loginUser.userId,
          userPassword: confirmPassword.value
          // alert(res.data)
        }
        userStore.refreshLogin(user)
        // activateDialog.value = false
        alert("계정이 활성화 되었습니다.")
        router.go()
      })
  }
  else {
    alert("비밀번호가 일치 하지 않습니다.")
    activateDialog.value = true
    confirmPassword.value = ''
  }
}

const gohome = () => {
  router.push("/")
}

</script>
  
<style scoped>
div {
  margin: 20px auto;
  text-align: center;
}

#my-page {
  display: flex;
  width: 80%;
}

#diary-box {
  width: 50%;
}

.profile-box {
  display: flex;
  flex-direction: column;
}

.write-btn {
  background: #EBE3D5;
  color: #776B5D;
  font-size: 16px;
}

.write-btn:hover {
  background: #EBE3D5;
  color: #776B5D;
  font-weight: 700;
}

#today-date p {
  font-size: 20px;
  font-weight: Bold;
}

.activate-btn {
  width: 120px;
  margin: 10px;
  background: #8EAEEC;
  border: 1px #8EAEEC;
  font-size: 15px;
  height: 2.5em !important;
  font-weight: 900;
}

.home-btn {
  width: 120px;
  margin: 10px;
  background: #8ee4ec;
  border: 1px #8ee4ec;
  font-size: 15px;
  height: 2.5em !important;
  font-weight: 900;

}

.weekly-calendar {
  width: 700px;
  margin: 3em auto;
}

.total-calendar {
  width: 700px;
  margin: 3em auto;
}


.total-diary-box {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
}

.weekly-diary-box {
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
}
</style>
  