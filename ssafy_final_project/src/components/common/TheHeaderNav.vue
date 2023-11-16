<template>
        <div>
                <header>
                        <nav class="navbar">
                                <div class="navbar-logo">
                                        <i class="fab fa-instagram"></i>
                                        <RouterLink to="/">&nbsp; GYM스타그램</RouterLink>
                                </div>
                                <ul class="navbar-menu">
                                        <li>
                                                <RouterLink to="/">Home</RouterLink>
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
                                                <RouterLink to="/login">Login</RouterLink>
                                        </li>
                                </ul>
                                <a href="#" class="navbar--toggle-btn"> <i class=""></i></a>
                        </nav>
                </header>
        </div>
</template>
  
<script setup>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
const store = useUserStore();

const logout = () => {
        store.logout();
}
</script>
  
<style scoped>
a {
        text-decoration: none;
        color: var(--text-color);
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
        padding: 8px 12px;
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
  