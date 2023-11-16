<template>
     <div>
        <main class="d-flex flex-column">
            <div class="signup-title">
                <h1>Signup View</h1>
                <br>
            </div>
            <section class="d-flex flex-column">
                <div class="login-form">
                    <h2>회원가입</h2>
                    <form method="post" id="regist-form">
                        <label for="userName">
                            이름
                            <img class="icon-star" src="@/assets/img/icon_star.png" />
                        </label>
                        <input type="text" name="userName" placeholder="이름을 입력해주세요" v-model="name">
                        <br>
                        <label for="userId">
                            아이디
                            <img class="icon-star" src="@/assets/img/icon_star.png" />
                        </label>
                        <input type="text" name="userId" placeholder="아이디를 입력해주세요" v-model="id">
                        <br>
                        <label for="userPassword">
                            비밀번호
                            <img class="icon-star" src="@/assets/img/icon_star.png" />
                        </label>
                        <input type="password" name="userPassword" placeholder="비밀번호를 입력해주세요" v-model="pass">
                        <br>
                        <label for="userPassword2">
                            비밀번호 확인
                            <img class="icon-star" src="@/assets/img/icon_star.png" />
                        </label>
                        <input type="password" name="userPassword2" placeholder="비밀번호 확인을 위해 다시 입력해주세요" v-model="pass2">
                        <br>
                        <div class="regist-btn">
                            <button button type="button" class="btn btn-secondary" @click="regist">회원가입</button>
                        </div>
                        <br>
                    </form>
                </div>

            </section>
        </main>
    </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('')
const id = ref('');
const pass = ref('');
const pass2 = ref('');
const errorMessage = ref('');

const regist = function () {
    // 중복ID 확인
    axios
        .get("http://localhost:8080/user-api/user")
        .then((res) => {
            let sameId = res.data.find(
                (u) => u.id === id.value
            );
            if (sameId) {
                alert('이미 존재하는 ID입니다.');
                router.push('/signup');
            }
        });

    // 비밀번호 확인
    if (pass.value !== pass2.value) {
        alert('비밀번호가 같지 않습니다.');
        router.push('/signup');
    }
    else {
        const user = {
            id: id.value,
            pass: pass.value,
            name: name.value,
        };
        axios
            .post("http://localhost:8080/user-api/user", user)
            .then((res) => {
                alert('회원가입에 성공하였습니다!');
                router.push('/');
            })
    }
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
    height: 100vh;
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