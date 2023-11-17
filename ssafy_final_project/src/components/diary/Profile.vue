<template>
  <div class="mypage">
    <div class="mypage-profile">
      <div class="profile-img">
        <img :src=profileImage width="150" height="200"/>
      </div>
      <div class="profile-desc">
        <div class="profile-name">
          {{ userName }}
        </div>
        <button type="button" class="profile-edit">
          정보수정하기
        </button>
      </div>
</div>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
        <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
      </v-list>
      <!-- <v-main style="height: 250px"></v-main> -->
    </div>
</template>

<script setup>
import { ref } from 'vue'

const loginUser = JSON.parse(localStorage.getItem('loginUser'))

const userName = loginUser.userName;
const profileImage = "../src/assets/user_image/" + loginUser.userId + "/" + loginUser.profileImage;

defineProps({
  totalCnt: Number,
})
</script>

<style  scoped>
nav {
  position: relative !important;
}
.mypage {
  display: flex;
  flex-direction: column;
}

</style>