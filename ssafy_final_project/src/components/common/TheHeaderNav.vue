<template>
        <div>
                <header>
                        <nav class="navbar fixed-top">
                                <div class="navbar-logo">
                                <img @click="gohome" class="logo-img" src="@/assets/Gymstagram2.png" />
                                <RouterLink to="/">&nbsp; GYM STAGRAM</RouterLink>
                                </div>
                                <ul class="navbar-menu">
                                        <li v-if="store.loginUser != null">
                                                <RouterLink to="/quiz">Quiz</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser != null">
                                                <RouterLink to="/diary">Diary</RouterLink>
                                        </li>

                                        <li v-if="store.loginUser != null">
                                                <RouterLink :to="`/mypage/${store.loginUser.userId}`">My Diary({{
                                                        store.loginUser.userName }})</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser != null">
                                                <a href="" @click="logout"> Sign out</a>
                                        </li>
                                        <li v-if="store.loginUser == null">
                                                <RouterLink to="/login">Sign in</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser == null">
                                                <RouterLink to="/signup">Sign up</RouterLink>
                                        </li>
                                </ul>
                        </nav>
                </header>
        </div>
</template>
  
<script setup>
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router';
import { ref } from 'vue'

const router = useRouter()
const store = useUserStore();

const logout = () => {
        store.logout();
}
const gohome= () =>{
        router.push('/')
}

</script>
  
<style scoped>

.router-link-active{
        font-family:'SaumsungBold'!important;
}

a {
        text-decoration: none;
        color: var(--text-color);
}
.logo-img{
        width: 3rem;
        height: 2.5rem;
        cursor: pointer;
}
.navbar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--background-color);
        padding: 12px 12px;
        font-family: 'SaumsungLight';
        background-color: #EBE3D5;
}


.navbar-logo {
        color: var(--text-color);
        font-family:'SaumsungMedium' !important;
}

.navbar-logo i {
        color: var(--accent-color);
}

.navbar-menu {
        display: flex;
        list-style: none;
        padding-left: 0;
        margin-bottom: 0 !important;
}
.navbar-logo, .navbar-menu li {
        padding-left: 2em;;
        color : #776B5D;
      
}

.navbar-menu li:hover {
        background-color: var(--accent-color);
        border-radius: 4px;
}

</style>
  