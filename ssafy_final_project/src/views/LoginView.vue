<template>
    <div>
        <main class="d-flex flex-column">
            <div class="login-title">
                <h2>로그인</h2>
            </div>
            <section class="d-flex flex-column">
                <div class="login-form">
                    <form method="post" id="login-form">
                        <input type="text" name="userId" placeholder="아이디" v-model="id"> <br>
                        <input type="password" name="userPassword" placeholder="비밀번호" v-model="password" @keyup.enter="login">
                        <br>
                        <button button type="button" class="btn btn-secondary" @click="login">로그인</button>
                        <br>
                        <br>
                        <a href="">아이디찾기</a>
                        <a href="">비밀번호찾기</a>
                        <a href="/signup">회원가입</a>
                    </form>
                </div>

            </section>
        </main>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'

const id = ref('');
const password = ref('');

const router = useRouter();
const user = ref(null);
const store = useUserStore()

const login = () => {
    let user = {
        id: id.value,
        password: password.value
    };
    store.login(user);
};


onMounted(() => {
    const savedUser = localStorage.getItem("loginUser");
    if (savedUser) {
        user.value = JSON.parse(savedUser);
    }
});

</script>
  
<style scoped>
div {
    margin: 30px auto;
    text-align: center;
}

li,
ui {
    list-style-type: none;
}

main {
    align-items: center;
    height: 100vh;
}

.login-form {
    margin: 0 50px;
    padding: 30px 100px;
    border: 1px solid grey;
    border-radius: 20px;
    text-align: center;
}

.login-form h2 {
    text-align: center;
}

form input {
    margin: 10px;
    padding-left: 4px;
    border: 1px solid grey;
    border-radius: 2px;
}

form a {
    font-size: 13px;
    text-decoration: none;
    color: grey;
    margin: 0px 5px;
}

form a:hover {
    font-weight: bold;
}

button {
    width: 150px;
    margin: 10px;
    background: #8EAEEC;
    border: 1px #8EAEEC;
}
</style>
  