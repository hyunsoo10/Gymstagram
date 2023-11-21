<template>
    <div v-show="pageFlag">
        <KakaoLoginCheck/>
    </div>
</template>

<script setup>

import KakaoLoginCheck from '@/components/kakao/KakaoLoginCheck.vue'
import { ref, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router'
import axios from 'axios'
import { useUserStore } from '@/stores/user'

//인가코드 쿼리로 받아오기
const route = useRoute().query.code
const code = ref()
const accessToken = ref()


const pageFlag = ref(false)

const kakaoInfo = ref({
    email: '',
    nickName: '',
})

const userStore = useUserStore();



onMounted(()=>{
    code.value = route
    // console.log(code.value)
    kakaoGetToken(code.value)
    userStore.getUserList()
    
})


const kakaoFlag = ref(false)

const kakaoGetToken = () =>{
    // console.log("카카오 로그인")
    
    axios({
        url: 'https://kauth.kakao.com/oauth/token',
        method: 'POST',
        data:{
            grant_type: "authorization_code",
            client_id: "01bdd0d43fb0ea7f402dc99e9f0f02d4",
            redirect_uri: "http://localhost:5173/kakaoLogin",
            code: code.value
        },
        headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
    })
    .then((res)=>{
        console.log(res.data)
        // console.log(res.data['access_token'])
        accessToken.value = res.data['access_token']
        //유저 정보 받아오기
        kakaoGetUserInfo()
    })
}

const kakaoGetUserInfo = () =>{
    // console.log(accessToken.value)
    axios({
        url: 'https://kapi.kakao.com/v2/user/me',
        method: 'GET',
        headers: {
            'Authorization' : `Bearer ${accessToken.value}`
        }
    })
    .then((res)=>{
        // console.log(res.data)
        // console.log(res.data["kakao_account"]["email"])
        // console.log(res.data["kakao_account"]["profile"].nickname)
        kakaoInfo.value.email = res.data["kakao_account"]["email"]
        kakaoInfo.value.nickName = res.data["kakao_account"]["profile"].nickname
    })
    .then(()=>{
        // console.log(kakaoInfo.value.email)
        // console.log(userStore.users)
        //DB의 전체 유저 리스트에서 카카오 로그인 시도 이메일과 같은 이메일이 있다면 로그인 해주기
        let kakao = userStore.users.find((user) => user.email === kakaoInfo.value.email)
        //카카오로 회원가입 했던 유저는 로그인 시켜주기
        // console.log(kakao  == undefined)
        if(kakao != undefined){
            let kakaoUser = {
                userId : kakao.userId,
                userPassword: kakao.userPassword
            }
            userStore.login(kakaoUser)
            // return
        }
        else{
            pageFlag.value=true
        }
    })
}
const router = useRouter();

const user = ref({
    userName: '',
    userId: '',
    nickName: '',
    userPassword: '',
    profileImage: '',
    email: '',
})

const image = ref('');
const password2 = ref('');
const imageUploaded = ref("../src/assets/default_profile.png")

const uploadName = ref('첨부파일')

const upload = function (event) {
    image.value = event.target.files[0]
    imageUploaded.value = URL.createObjectURL(image.value)
    console.log(URL.createObjectURL(image.value))
    uploadName.value = image.value.name;
}


const checkId = ref(false)
const nickNameCheck = ref(false)

const regist = function (event) {
    //카카오 에서 받아온 정보 넣어주기
    user.value.email = kakaoInfo.value.email
    user.value.nickName = kakaoInfo.value.nickName
        // 유효성 검사
    // 1. 비밀번호 입력과 비밀번호 확인 입력의 일치 여부
    if (user.value.userPassword != password2.value) {
        alert('비밀번호가 일치하지 않습니다.').
            return;
    }
    // 2. 비밀번호가 8자리 이상, 16자 이하이며 특수문자(!@#$%^&*)
    const pattern = /[!@#$%^&*]/
    if (user.value.userPassword.length < 8 || user.value.userPassword.length > 16 || !pattern.test(user.value.userPassword)) {
        alert('비밀번호는 8자리 이상, 16자리 이하이며, 특수문자(!@#$%^&*)를 포함해야 합니다.')
        return
    }

    // 3. 이미 등록된 ID, 닉네임인지 중복 여부 확인
    axios
        .get("http://localhost:8080/user-api/user")
        .then((res) => {
            checkId.value = res.data.find(
                (u) => u.userId === user.value.userId
            );
            nickNameCheck.value = res.data.find(
                (u) => u.nickName === user.value.nickName
            );
        })
        .then(()=>{
            console.log(checkId.value)
            console.log(nickNameCheck.value)
            if (checkId.value) {
                alert('이미 존재하는 ID입니다.');
                // router.push('/signup');
                return
            }
            if (nickNameCheck.value) {
                alert('이미 존재하는 닉네임입니다.');
                // router.push('/signup');
                return
            }
            signup()
        })
    
    const signup = () =>{

        // 모든 유효성 검사를 통과했으면 회원 등록 가능
        // console.log(user)
        // console.log(image.value)
        let formData = new FormData()
        if (image.value != null) {
            // console.log('1')
            user.value.profileImage = image.value.name;
            formData.append('image', image.value)
            formData.append('user', new Blob([JSON.stringify(user.value)], { type: "application/json" }));
        } else {
            formData.append('user', new Blob([JSON.stringify(user.value)], { type: "application/json" }));
        }

        axios
        .post("http://localhost:8080/user-api/user", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('회원가입에 성공하였습니다!');
            router.push('/');
        }).catch(() => {
            console.log("회원가입에 실패하였습니다!")
        })
    }
    
};
</script>

<style scoped>
li,
ui {
    list-style-type: none;
}

main {
    align-items: center;
    /* height: 100vh; */
}

.regist-form {
    margin: 0 50px 50px;
    padding: 30px 50px;
    width: 700px;
    border: 1px solid grey;
    border-radius: 20px;
    text-align: center;
}


.form-content label {
    display: inline-block;
    text-align: start;
    width: 140px;
}

.form-content input {
    width: 350px;
    height: 35px;
    margin: 10px;
    padding: 0 10px;
    border: 1px solid rgb(177, 177, 177);
    border-radius: 5px;
}

.form-content input::placeholder {
    font-size: 12px;
    color: rgb(177, 177, 177);
}

.regist-desc p {
    font-size: 11px;
}

.regist-btn {
    text-align: end;
}

button {
    width: 120px;
    margin: 10px;
    background: #8EAEEC;
    border: 1px #8EAEEC;
    font-size: 15px;
}

body {
    background-color: aliceblue;
}


.input-desc {
    color: rgb(235, 43, 18);
    margin: 5px;
    padding-left: 20px;
    width: 600px;
    font-size: 11px;
    text-align: start;
}

.filebox .upload-name {
    display: inline-block;
    font-size: 12px;
    height: 35px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid rgb(177, 177, 177);
    width: 43%;
    color: rgb(177, 177, 177);
}

#file-btn {
    text-align: center;
    display: inline-block;
    padding-top: 7px;
    color: #fff;
    font-size: 12px;
    vertical-align: middle;
    background-color: rgb(177, 177, 177);
    cursor: pointer;
    height: 35px;
    width: 90px;
    margin-left: 5px;
    border-radius: 5px;
}

.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
</style>