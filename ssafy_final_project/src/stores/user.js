import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useUserStore = defineStore('user', () => {
    const REST_USER_API = `http://localhost:8080/user-api/user`

    const users = ref([])
    const router = useRouter();

    const loginUser = ref(null)

    const getUserList = function () {
        axios({
            url: REST_USER_API,
            method: 'GET',
        })
            .then((res) => {
                users.value = res.data
            })
    }
    onMounted(() => {
        const savedUser = localStorage.getItem("loginUser");
        if (savedUser) {
            console.log(savedUser)
            loginUser.value = JSON.parse(savedUser);
        }
    });
    
    //로그인
    //user 객체를 인자로 받아서 DB에서 아이디 일치하는 회원 가져온 후에 비밀번호 검사
    const login = (user) => {
        // user 정보 요청 api 주소
        // axios 요청
        axios.get(`${REST_USER_API}/${user.id}`)
            .then((res) => {
                console.log(user)
                //db에서 해당하는 id의 회원 찾아오기
                let dbUser = res.data;

                if (dbUser) {
                    if (user.password === dbUser.userPassword) {
                        user.value = dbUser;
                        localStorage.setItem('loginUser', JSON.stringify(dbUser));
                        alert(dbUser.userName + "님 환영합니다!");
                        loginUser.value = dbUser;
                        router.push('/');
                    } else {
                        alert("비밀번호가 틀렸습니다");
                    }
                } else {
                    alert('해당 ID와 일치하는 회원이 없습니다.');
                }
            })
            .catch((err) => {
                console.log(err);
                alert("로그인 실패: 서버 에러");
            });
    };

    //로그아웃

    const logout = () => {
        loginUser.value = null;
        localStorage.removeItem("loginUser");
        router.push({ name: "home" });
    };

    const user = ref([])
    const getUser = function (id) {
        axios.get(`${REST_USER_API}/${id}`)
            .then((res) => {
                user.value = res.data
            })
    }
    return { users, getUserList, user, getUser, login, loginUser, logout }
})
