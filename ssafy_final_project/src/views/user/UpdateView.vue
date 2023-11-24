<template>
  <div>
    <main class="d-flex flex-column">
      <div class="signup-title">
        <h2>회원 정보 수정</h2>
        <br>
      </div>
      <section class="d-flex flex-column">
        <div class="update-form">
          <div class="form-content">
            <label for="userName">
              이름
            </label>
            <input type="text" id="userName" placeholder="이름을 입력해주세요." v-model="user.userName">
            <br>
            <label for="userId">
              아이디(변경불가)
            </label>
            <input type="text" id="userId" :value="myId" disabled>
            <br>
            <label for="userNickname">
              닉네임
            </label>
            <input type="text" id="userNickname" placeholder="닉네임을 입력해주세요." v-model="user.nickName">
            <br>
            <label for="userPassword">
              비밀번호
            </label>
            <input type="password" id="userPassword" placeholder="비밀번호를 입력해주세요" v-model="user.userPassword">
            <br>
            <label for="userPassword2">
              비밀번호확인
            </label>
            <input type="password" id="userPassword2" placeholder="비밀번호 확인을 위해 다시 입력해주세요." v-model="password2">
            <br>
            <div class="filebox">
              <label>
                프로필사진
              </label>
              <input class="upload-name" v-model="uploadName">
              <label for="file" id="file-btn">파일찾기</label>
              <input type="file" id="file" @change="upload" :ref="image" accept="image/.*">
            </div>
            <img class="image-ex" :src="imageUploaded" style="width: 200px; margin-top: 10px" />
            <p class="input-desc">*닉네임은 최소 2-10자이며, 특수 문자를 제외한 한글, 영어 대소문자, 숫자 입력 가능</p>
            <p class="input-desc">*비밀번호는 최소 8-16자이며, 특수 문자(!@#$%^&*) 하나 이상 포함 필수, 영어 대소문자, 숫자 입력 가능</p>
            <div class="regist-btn">
              <button type="button" class="btn btn-secondary " @click="update($event)">수정하기</button>
              <v-dialog v-model="dialog" persistent width="auto">
                <template v-slot:activator="{ props }">
                  <v-btn v-bind="props" type="button" class="btn btn-danger delete-btn">
                    회원탈퇴
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5" style="text-align: center; margin-top: 2em;">
                    <strong>정말로 회원탈퇴를 하시겠습니까?</strong>
                  </v-card-title>
                  <v-card-text style="text-align: center;  padding: 5em;">
                    회원 탈퇴시에 다시 복구가 불가능합니다. 회원 탈퇴 말고 계정 비활성화 기능이 있습니다. <br>
                    계정을 비활성화 하면 다른 유저들이 회원님의 정보를 볼 수 없습니다.
                    <br>
                    <br>
                    <small style="color:red">회원 탈퇴나 계정 비활성화를 하기 위해서는 비밀번호를 다시 한번 입력해주세요</small>
                    <v-col cols="12">
                      <v-text-field label="비밀번호*" type="password" required v-model="confirmPassword"></v-text-field>
                    </v-col>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn class="delete-btn" color="white" variant="text" @click="deleteUser(), dialog = false">
                      회원탈퇴
                    </v-btn>
                    <v-btn class="disable-btn" color="white" variant="text" @click="disableUser(), dialog = false">
                      비활성화
                    </v-btn>
                    <v-btn class="close-btn" color="white" variant="text" @click="dialog = false">
                      닫기
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
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
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user.js'
import { toNumber } from '@vue/shared';

const router = useRouter();
const route = useRoute();
const store = useUserStore();

const myId = route.params.userId;
const user = ref({})
try {
  user.value = {
    userName: store.loginUser.userName,
    userId: route.params.userId,
    nickName: store.loginUser.nickName,
    userPassword: '',
    profileImage: store.loginUser.profileImage,
  }
} catch {
  router.push("/")
}
const password2 = ref('');

const image = ref('');
const uploadName = ref()
const imageUploaded = ref()
try {
  uploadName.value = store.loginUser.profileImage
  imageUploaded.value = "../src/assets/user_image/" + route.params.userId + "/" + store.loginUser.profileImage

} catch {
  router.push("/")
}

const upload = function (event) {
  image.value = event.target.files[0]
  uploadName.value = image.value.name;
  imageUploaded.value = URL.createObjectURL(image.value)
}


const update = function (event) {
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
    return;
  }
  // 3. 이미 등록된 닉네임인지 중복 여부 확인, 원래 내 닉네임은 괜찮음
  axios
    .get("http://localhost:8080/user-api/user")
    .then((res) => {
      let nickNameCheck = res.data.find(
        (u) => u.nickName === user.value.nickName
      );
      if (store.loginUser.nickName !== user.value.nickName && nickNameCheck) {
        alert('이미 존재하는 닉네임입니다.');
        router.push('/signup');
      }
    });

  // 모든 유효성 검사를 통과했으면 회원 등록 가능
  let formData = new FormData()
  if (image.value != null) {
    user.value.profileImage = image.value.name;
    formData.append('image', image.value)
    formData.append('user', new Blob([JSON.stringify(user.value)], { type: "application/json" }));
  } else {
    formData.append('user', new Blob([JSON.stringify(user.value)], { type: "application/json" }));
  }
  store.update(formData, user.value.userPassword);
};

const dialog = ref(false)

const deleteUser = () => {
  // console.log("회원 탈퇴")
  if (confirmPassword.value === store.loginUser.userPassword) {
    axios({
      url: `http://localhost:8080/user-api/user/${store.loginUser.userId}`,
      method: 'DELETE',
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then((res) => {
        alert(res.data)
        sessionStorage.removeItem('access-token');
        router.go()
        router.push("/")
      })
  }
  else {
    alert("비밀번호가 일치하지 않습니다.")
    confirmPassword.value = ''
  }
}

const confirmPassword = ref()
const disableUser = () => {
  if (confirmPassword.value === store.loginUser.userPassword) {

    // console.log("계정 비활성화")
    axios({
      url: `http://localhost:8080/user-api/user/activate/${store.loginUser.userId}`,
      method: 'PUT',
      headers: {
        'access-token': sessionStorage.getItem('access-token')
      }
    })
      .then((res) => {
        alert(res.data)
        let user = {
          userId: store.loginUser.userId,
          userPassword: confirmPassword.value

        }
        console.log(user)
        store.refreshLogin(user)

        router.push(`/mypage/${user.userId}`)
      })
  } else {
    alert("비밀번호가 일치하지 않습니다.")
    confirmPassword.value = ''
  }
}
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

.update-form {
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
  height: 2.5em !important;
}

.delete-btn {
  width: 120px;
  margin: 10px;
  background: #eca28e;
  border: 1px #eca28e;
  font-size: 15px;
  height: 2.5em !important;
}

.disable-btn {
  width: 120px;
  margin: 10px;
  background: #ff9800db;
  border: 1px #ff9800db;
  font-size: 15px;
  height: 2.5em !important;
}

.close-btn {
  width: 120px;
  margin: 10px;
  background: #838281;
  border: 1px #838281;
  font-size: 15px;
  height: 2.5em !important;
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