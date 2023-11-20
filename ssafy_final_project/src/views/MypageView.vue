<template>
  <div id="my-page">
    <div class="profile-box" v-if="userStore.loginUser != null">
      <Profile :total-cnt="myDiary.length" :weekly-cnt="diaryStore.weeklyDiary.length" :my-id="userId" />
      <!-- <RouterLink to="/create">다이어리 작성하기</RouterLink> -->
      <v-btn color="accent" @click.stop="dialog = true">
        다이어리 작성하기
      </v-btn>
      <DiaryCreate @close-Dialog="close" :dialog="dialog" v-model="dialog"></DiaryCreate>
      <AVTY />
    </div>
    <v-card width=60% v-if="userStore.loginUser != null">
      <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
        <v-tab :value="1">My Weekly Diary</v-tab>
        <v-tab :value="2">My Total Diary</v-tab>
      </v-tabs>
      <v-window v-model="tab">
        <v-window-item v-for="n in 2" :key="n" :value="n">
          <v-container fluid>
            <template v-if="n == 1">
              <h1>My Weekly Diary</h1>
              <MyWeeklyDiary v-for="diary in diaryStore.weeklyDiary" :key="diary.diaryId" :diary="diary" />
            </template>
            <template v-if="n == 2">
              <h1>My Total Diary</h1>
              <MyDiary v-for="diary in myDiary" :key="diary.diaryId" :diary="diary" />
            </template>

          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
  </div>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useDiaryStore } from '@/stores/diary'
import { useUserStore } from '@/stores/user'
import MyDiary from '@/components/diary/MyDiary.vue';
import Profile from '@/components/diary/Profile.vue';
import AVTY from '@/components/diary/AVTY.vue'
import DiaryCreate from '@/components/diary/DiaryCreate.vue';
import MyWeeklyDiary from '@/components/diary/MyWeeklyDiary.vue'

const route = useRoute();
const diaryStore = useDiaryStore();
const userStore = useUserStore();

// 모달창 false
const dialog = ref(false);
const close = function () {
  console.log(dialog.value)
  dialog.value = false
}

const userId = ref(route.params.userId);
//전체 다이어리 중에 my diary만 가져오기
//diary 목록 중에 login한 user의 id와 같은 diary들만 filter
const myDiary = computed(() => {
  return diaryStore.allDiary.filter((diary) => {
    return diary.userId == userStore.loginUser.userId
  })
})

const loginUser = ref({});

const tab = ref(null)
onMounted(() => {
  diaryStore.getAllDiary();
  loginUser.value = userStore.loginUser

  diaryStore.getWeeklyDiary(loginUser.value.userId);
})

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
  /* display: flex;
      flex-direction: row;
      flex-wrap: wrap; */
  width: 50%;
}

.profile-box {
  display: flex;
  flex-direction: column;
}

#today-date p {
  font-size: 20px;
  font-weight: Bold;
}
</style>
  