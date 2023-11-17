<template>
        <div>
                <header>
                        <nav class="navbar">
                                <div class="navbar-logo">
                                <img @click="gohome" class="logo-img" src="@/assets/gymstagram-logo.png" />
                                <!-- <i class="fab fa-instagram"></i> -->
                                <RouterLink to="/">&nbsp; <strong> GYM STAGRAM</strong></RouterLink>
                                </div>
                                <ul class="navbar-menu">
                                        <li>
                                                <RouterLink to="/">홈</RouterLink>
                                        </li>
                                        <li>
                                                <RouterLink to="/quiz">Quiz</RouterLink>
                                        </li>
                                        <li>
                                                <RouterLink to="/diary">Diary</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser != null">
                                                <RouterLink :to="`/mypage/${store.loginUser.userId}`">My page({{
                                                        store.loginUser.userName }})</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser != null">
                                                <a href="" @click="logout"> 로그아웃</a>
                                        </li>
                                        <li v-if="store.loginUser == null">
                                                <RouterLink to="/login">로그인</RouterLink>
                                        </li>
                                        <li v-if="store.loginUser == null">
                                                <RouterLink to="/signup">회원가입</RouterLink>
                                        </li>
                                </ul>
                                <a href="#" class="navbar--toggle-btn"> <i class=""></i></a>
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
a {
        text-decoration: none;
        color: var(--text-color);
}
.logo-img{
        width: 3rem;
        height: 3rem;
        cursor: pointer;
}
.navbar {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--background-color);
        padding: 8px 12px;
        font-family: 'Source Sans Pro', sans-serif;
}

.navbar-logo {
        font-size: 24px;
        color: var(--text-color);
}

.navbar-logo i {
        color: var(--accent-color);
}

.navbar-menu {
        display: flex;
        list-style: none;
        padding-left: 0;
}

.navbar-menu li {
        padding: 8px 12px 30px;
}

.navbar-menu li:hover {
        background-color: var(--accent-color);
        border-radius: 4px;
}

.navbar-toggle-btn {
        display: none;
        position: absolute;
        right: 32px;
        font-size: 24px;
        color: var(--accent-color);
}

@media screen and (max-width: 768px) {
        .navbar {
                flex-direction: column;
                align-items: flex-start;
                padding: 8px 24px;
        }

        .navbar-menu {
                display: none;
                flex-direction: column;
                align-items: center;
                width: 100%;
        }

        .navbar-menu li {
                width: 100%;
                text-align: center;
        }

        .navbar-toggle-btn {
                display: block;
        }

        .navbar-menu.active {
                display: flex;
        }
}</style>
  