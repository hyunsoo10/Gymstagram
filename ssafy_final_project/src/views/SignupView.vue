<template>
    <div>
        <main class="d-flex flex-column">
            <div class="signup-title">
                <h2>GYM STAGRAM</h2>
                <br>
            </div>
            <section class="d-flex flex-column">
                <div class="regist-form">
                    <div class="form-content">
                        <label for="userName">
                            이름
                            <img class="icon-star" src="@/assets/icon_star.png" />
                        </label>
                        <input type="text" id="userName" placeholder="이름을 입력해주세요." v-model="user.userName">
                        <br>
                        <label for="userId">
                            아이디
                            <img class="icon-star" src="@/assets/icon_star.png" />
                        </label>
                        <input type="text" id="userId" placeholder="아이디를 입력해주세요.(중복불가능)" v-model="user.userId">
                        <br>
             
                        <label for="userNickname">
                            닉네임
                            <img class="icon-star" src="@/assets/icon_star.png" />
                        </label>
                        <input type="text" id="userNickname" placeholder="닉네임를 입력해주세요.(중복불가능, 특수문자 제외)"
                            v-model="user.nickName">
                        <br>
                        <label for="userPassword">
                            비밀번호
                            <img class="icon-star" src="@/assets/icon_star.png" />
                        </label>
                        <input type="password" id="userPassword" placeholder="비밀번호를 입력해주세요." v-model="user.userPassword">
                        <br>
                        <label for="userPassword2">
                            비밀번호확인
                            <img class="icon-star" src="@/assets/icon_star.png" />
                        </label>
                        <input type="password" id="userPassword2" placeholder="비밀번호 확인을 위해 다시 입력해주세요." v-model="password2">
                        <br>
                        <div class="filebox" style="padding-left: 2em;">
                            <label>
                                프로필사진
                            </label>
                            <input class="upload-name" :value=uploadName placeholder="첨부파일" style="border: 1px solid #B0A695;">
                            <label for="file" id="file-btn" ref="filebtn">파일찾기</label>
                            <input type="file" id="file" @change="upload" :ref="image" accept="image/.*">

                            <div class="file-upload-container" 
                                @dragenter="onDragenter"
                                @dragover.prevent="onDragover"
                                @dragleave="onDragleave"
                                @drop.prevent="onDrop"
                                @click="$refs.filebtn.click()"
                                >
                                <div class="file-upload" :class="isDragged ? 'dragged' : ''">
                                    Drag and Drop Here
                                </div>
                            </div>

                                <!-- 파일 업로드 -->
                            <!-- <input type="file" ref="fileInput" class="file-upload-input" @change="onFileChange($event)" multiple> -->
                            <!-- 업로드된 리스트 -->
                            <!-- <div class="file-upload-list">
                            <div class="file-upload-list__item" v-for="(file, index) in fileList" :key="index">
                                <div class="file-upload-list__item__data">
                                <img class="file-upload-list__item__data-thumbnail" :src="file.src">
                                <div class="file-upload-list__item__data-name">
                                    {{ file.name }}
                                </div>
                                </div>
                                <div class="file-upload-list__item__btn-remove" @click="handleRemove(index)">
                                삭제
                                </div>
                            </div>
                            </div> -->

                        </div>
                        <img class="image-ex" :src="imageUploaded" style="width: 10em; margin-top: 10px" />
                        <!-- <input type="file" id="profileImg" name="profileImg" aria-describedby="inputGroupFileAddon04"
                            aria-label="Upload" @change="upload" :ref="image" accept="image/.*"> -->
                        <p class="input-desc">*닉네임은 최소 2-10자이며, 특수 문자를 제외한 한글, 영어 대소문자, 숫자 입력 가능</p>
                        <p class="input-desc">*비밀번호는 최소 8-16자이며, 특수 문자(!@#$%^&*) 하나 이상 포함 필수, 영어 대소문자, 숫자 입력 가능</p>
                        <div class="regist-btn" >
                            <button type="button" class="btn btn-secondary" @click="regist($event)">회원가입</button>
                        </div>
                        <br>
                    </div>
                </div>
            </section>
        </main>

    </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();




const isDragged = ref(false)

const onDragenter = function(event){
    isDragged.value = true
    console.log("enter")
}

const onDragleave = function(event){
    isDragged.value = false
    console.log("leave")
}

const onDragover = function(){
    
}

const onDrop = function(event){
    isDragged.value = false
    const file = event.dataTransfer.files
    console.log(event)
    console.log(file)
    dragUpload(file[0])
}

// const onFileChange = function(event){
//     const file = event.target.files
//     console.log("after: "+file)
// }


const image = ref('');
const password2 = ref('');
const imageUploaded = ref("../src/assets/default_profile.png")

const uploadName = ref('첨부파일')


const dragUpload = function (file) {
    console.log(file)
    image.value = file
    imageUploaded.value = URL.createObjectURL(image.value)
    uploadName.value = image.value.name;
}

const upload = function (event) {
    console.log(event.target.files[0])
    image.value = event.target.files[0]
    imageUploaded.value = URL.createObjectURL(image.value)
    console.log(URL.createObjectURL(image.value))
    uploadName.value = image.value.name;
}

const errorMessage = ref('');


const checkId = ref(false)
const nickNameCheck = ref(false)

const regist = function (event) {
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


const randomNickName= ref('')

//랜덤 닉네임 불러오기
onMounted(()=>{
    axios({
    //cors에러 해결하기 위해서 처리
     url:`https://cors-anywhere.herokuapp.com/https://nickname.hwanmoo.kr?format=json`, 
     method: 'GET',
     headers: {
        'Access-Control-Allow-Origin' : '*'
     }
    })
    .then((response)=>{
        // console.log(response['data'].words[0])
        randomNickName.value = response['data'].words[0]
        user.nickName = randomNickName.value
        // console.log(user.nickName)
    })
    .catch((error)=>{
        console.log(error)
    })

})

const user = ref({
    userName: '',
    userId: '',
    nickName: randomNickName,
    userPassword: '',
    profileImage: '',
    email: '',
})
</script>


<style scoped>

.file-upload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border: transparent;
  border-radius: 20px;
  cursor: pointer;
}
.file-upload.dragged {
  border: 1px dashed powderblue;
  opacity: 0.6;
}
.file-upload-container {
  width: 20em;
  height: 10em;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 0.625rem 1.25rem #0000001a;
  border-radius: 20px;
  
}
.file-upload-container:hover{
    background-color: rgba(214, 209, 209, 0.705);
    color: white;
    font-weight: 900;
}
.file-upload-input {
  display: none;
}
.file-upload-list {
  margin-top: 10px;
  width: 100%;
}
.file-upload-list__item {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.file-upload-list__item__data {
  display: flex;
  align-items: center;
}
.file-upload-list__item__data-thumbnail {
  margin-right: 10px;
  border-radius: 20px;
  width: 120px;
  height: 120px;
}
.file-upload-list__item__btn-remove {
  cursor: pointer;
  border: 1px solid powderblue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 6px;
}



li,
ui {
    list-style-type: none;
}

main {
    align-items: center;
    /* height: 100vh; */
}

section{
    width: 50em;
}

.regist-form {
    margin: 0 50px 50px;
    padding: 2em 2.5em;
    width: 40em;
    border: 1px solid #B0A695;
    border-radius: 20px;
    text-align: center;
}


.form-content label {
    display: inline-block;
    text-align: start;
    /* width: 30px; */
    width: 7em;
    font-size: 0.7em;
}

.form-content input {
    /* width: 350px; */
    /* height: 35px; */
    width: 18rem;
    height: auto;
    padding: 0.5em;
    margin: 10px;
    /* padding: 0 10px; */
    border: 1px solid #B0A695;
    /* border: 1px solid rgb(177, 177, 177); */
    border-radius: 5px;
}

.form-content input::placeholder {
    font-size: 0.7em;
    color: rgb(177, 177, 177);
}

.regist-desc p {
    font-size: 11px;
}

.regist-btn {
    text-align: end;
}

/* button {
    width: 120px;
    margin: 10px;
    background: #8EAEEC;
    border: 1px #8EAEEC;
    font-size: 15px;
} */

button {
    width: 150px;
    margin: 10px;
    color: white;
    font-weight: 900;
    border: #B0A695;
    background: #B0A695;
}
button:hover{
    background: #776B5D;

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

.signup-title{
    color: #776B5D;
}
</style>