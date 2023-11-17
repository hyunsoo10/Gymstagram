<template>
  <div class="mypage">
    <div class="mypage-profile">
      <div class="profile-img">
        <img :src=profileImage width="150" height="150" />
      </div>
      <div class="profile-desc">
        <div class="profile-user-info">
          <div class="profile-name">
            {{ userName }}🍑
          </div>
          <button type="button" class="profile-edit" @click="goUpdate(myId)">
            정보수정하기
          </button>
        </div>
        <br>
        <div class="total-cnt">
          📚 Total Diary&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ totalCnt }}
        </div>
        <div class="weekly-cnt">
          📒 Weekly Diary&nbsp;&nbsp;{{ weeklyCnt }}
        </div>
        <div class="current-streak">
          🗓️ 7일 연속 작성
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router';

const router = useRouter();

const loginUser = JSON.parse(localStorage.getItem('loginUser'))

const userName = loginUser.userName;
const profileImage = "../src/assets/user_image/" + loginUser.userId + "/" + loginUser.profileImage;

defineProps({
  totalCnt: Number,
  weeklyCnt: Number,
  myId : String,
})

const goUpdate = (myId) => {
  router.push({name: "update", params: "myId"})
}

</script>

<style  scoped>
nav {
  position: relative !important;
}

.mypage {
  border: 1px #c9c9c9 solid;
  border-radius: 10px;
  height: 210px;
  width: 100%;
}

.mypage-profile {
  display: flex;
  flex-direction: row;
  margin: 25px 20px 20px;
}

.profile-img img {
  border-radius: 70%;
}

.profile-user-info {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.profile-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
}

.profile-name {
  font-size: 22px;
  font-weight: bold;
}

.profile-edit {
  border: 1px solid #c9c9c9;
  border-radius: 10px;
  width: 70px;
  height: 20px;
  background: #c9c9c9;
  font-size: 10px;
  margin-left: 20px;
}

.total-cnt {
  font-size: 16px;
  text-align: start;
  margin: 5px 0px;
}

.weekly-cnt {
  font-size: 16px;
  text-align: start;
  margin: 5px 0px;
}

.current-streak {
  font-size: 16px;
  text-align: start;
  margin: 5px 0px;
}</style>