<template>
  <div class="mypage">
    <div class="mypage-profile">
      <div class="profile-img">
        <img :src=profileImage width="150" height="200" />
      </div>
      <div class="profile-desc">
        <div class="profile-name">
          🍑{{ userName }}
        </div>
        <button type="button" class="profile-edit">
          정보수정하기
        </button>
        <br>
        <div class="total-cnt">
          Total Diary {{ totalCnt }}
        </div>
        <div class="weekly-cnt">
          Weekly Diary {{ weeklyCnt }}/7
        </div>
        <div class="current-streak">
          nn일 연속 작성✨
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const loginUser = JSON.parse(localStorage.getItem('loginUser'))

const userName = loginUser.userName;
const profileImage = "../src/assets/user_image/" + loginUser.userId + "/" + loginUser.profileImage;

defineProps ({
  totalCnt: Number,
})
</script>

<style  scoped>
nav {
  position: relative !important;
}

.mypage-profile {
  display: flex;
  flex-direction: row;
}

.profile-img img {
  border-radius: 70%;
}

.profile-desc {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 25px;
}

.profile-name{
  font-size: 22px;
  font-weight: bold;
}

.profile-edit {
  border: 1px solid grey;
  border-radius: 10px;
  width: 120px;
  background: #c9c9c9;
  font-size: 14px;
}

.total-cnt {
  font-size: 14px;
}

.weekly-cnt {
  font-size: 14px;
}

.current-streak {
  font-size: 14px;
}
</style>