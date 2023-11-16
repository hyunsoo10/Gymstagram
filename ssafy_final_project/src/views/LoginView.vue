<template>
    <div>
        <main class="d-flex flex-column">
            <div class="login-title">
                <h1>Login View</h1>
                <br>
            </div>
            <section class="d-flex flex-column">
                <div class="login-form">
                    <h2>로그인</h2>
                    <form method="post" id="login-form">
                        <input type="text" name="userId" placeholder="아이디를 입력해주세요" v-model="id"> <br>
                        <input type="password" name="userPassword" placeholder="비밀번호를 입력해주세요" v-model="password">
                        <br>
                        <button button type="button" class="btn btn-secondary" @click="login">로그인</button>
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
}

form a {
    font-size: 9px;
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
  