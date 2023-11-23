<template>
    <div>
        <main class="d-flex flex-column">
            <div class="login-title">
                <h2>GYM STAGRAM</h2>
            </div>
            <section class="d-flex flex-column">
                <div class="login-form">
                    <form method="post" id="login-form">
                        <input type="text" name="userId" placeholder="아이디" v-model="id"> <br>
                        <input type="password" name="userPassword" placeholder="비밀번호" v-model="password"
                            @keyup.enter="login">
                        <br>
                        <button button type="button" class="btn btn-secondary" @click="login">로그인</button>
                        <br>
                        <br>
                        <a href="">아이디찾기</a>
                        <a href="">비밀번호찾기</a>
                        <a href="/signup">회원가입</a>
                    </form>
                </div>


                <div>
                    <a id="custom-login-btn" @click="kakaoLogin()">
                        <img src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg" width="222"
                            alt="카카오 로그인 버튼" />
                    </a>
                </div>
            </section>
        </main>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

import { useUserStore } from '@/stores/user'
const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const id = ref('');
const password = ref('');


const store = useUserStore()

// 카카오 로그인
const kakaoLogin = () => {
    const redirect_uri = 'http://localhost:5173/kakaoLogin';
    const cliendId = KAKAO_API_KEY;
    const AuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${cliendId}&redirect_uri=${redirect_uri}&'scope=account_email profile_nickname'`
    window.location.href = AuthURL;

}

// jwt 로그인
const login = () => {
    let user = {
        userId: id.value,
        userPassword: password.value
    };
    store.login(user);
};

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
    height: 60vh;
}

.login-title {
    color: #776B5D;
}

.login-form {
    width: 80%;
    margin: 0 50px;
    padding: 30px 50px;
    border: 1px solid #B0A695;
    border-radius: 10px;
    text-align: center;

}

.login-form h2 {
    text-align: center;

}

.login-form input {
    padding: 0.5em;
    border: 1px solid #B0A695;
    border-radius: 5px;
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
    color: white;
    font-weight: 900;
    border: #776B5D;
    background: #B0A695;
}

button:hover {
    background: #776B5D;

}

#custom-login-btn {
    cursor: pointer;
}
</style>
  