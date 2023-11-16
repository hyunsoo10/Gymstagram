<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer permanent location="left">
        <template v-slot:prepend>
          <v-list-item lines="three" :prepend-avatar=profileImg :title=userName
            subtitle="[logout]"></v-list-item>
        </template>
     

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <!-- <v-main style="height: 250px"></v-main> -->
    </v-layout>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const loginUser = JSON.parse(localStorage.getItem('loginUser'))

const userName = loginUser.userName;
const profileImage = "../src/assets/user_image/" + loginUser.serId + "/" + loginUser.profileImage;


console.log(profileImage)
</script>

<style  scoped>
nav {
  position: relative !important;
}
</style>