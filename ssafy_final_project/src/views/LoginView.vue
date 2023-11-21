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
                
                <!-- <button button type="button" class="btn btn-secondary" @click="kakaoLogin">kakao 로그인</button> -->
                <!-- <a>
                    Kakao 로그인
                </a> -->
                <!-- <a href="https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=01bdd0d43fb0ea7f402dc99e9f0f02d4&redirect_uri=http://localhost:5173">
                    Kakao 로그인
                </a> -->
                <div>
                    <a id="custom-login-btn" @click="kakaoLogin()">
                    <img
                        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
                        width="222"
                        alt="카카오 로그인 버튼"
                    />
                    </a>
                <!-- <div @click="kakaoLogout()">로그아웃</div> -->
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
const KAKAO_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
const id = ref('');
const password = ref('');


const router = useRouter();
const user = ref(null);
const store = useUserStore()

// const makeFormData = params => {
//       const searchParams = new URLSearchParams()
//       Object.keys(params).forEach(key => {
//         searchParams.append(key, params[key])
//       })
//       return searchParams;
// }

const kakaoLogin = () =>{
    console.log("카카오 로그인")
    const redirect_uri = 'http://localhost:5173/kakaoLogin';
    const cliendId = '01bdd0d43fb0ea7f402dc99e9f0f02d4';
    const AuthURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${cliendId}&redirect_uri=${redirect_uri}&'scope=account_email profile_nickname'`
    window.location.href = AuthURL;

}

//jwt 로그인
const login = () => {
    let user = {
        userId: id.value,
        userPassword: password.value
    };
    store.login(user);
};
//그냥 로그인
// const login = () => {
//     let user = {
//         id: id.value,
//         password: password.value
//     };
//     store.login(user);
// };


// onMounted(() => {
//     const savedUser = localStorage.getItem("loginUser");
//     if (savedUser) {
//         user.value = JSON.parse(savedUser);
//     }
// });

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
    width: 80%;
    margin: 0 50px;
    padding: 30px 50px;
    border: 1px solid grey;
    border-radius: 20px;
    text-align: center;
}

.login-form h2 {
    text-align: center;
}

.login-form input {
    padding: 0.5em;
    border-radius: 10px;
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
#custom-login-btn{
    cursor: pointer;
}
</style>
  