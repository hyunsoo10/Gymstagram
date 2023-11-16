import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useDiaryStore = defineStore('diary', () => {
    const REST_DIARY_API = `http://localhost:8080/diary-api/diary`

    const allDiary= ref([])
    const weeklyDiary= ref([])
    const router = useRouter();

    const loginUser = ref(null)

    const getAllDiary = function() {
        axios({
            url : REST_DIARY_API,
            method: 'GET',
        })
        .then((res) => {
            allDiary.value = res.data
        })
    }
    const getWeeklyDiary = function(userId) {
        axios({
            url : `${REST_DIARY_API}/weekly/${userId}`,
            method: 'GET',
        })
        .then((res) => {
            weeklyDiary.value = res.data
        })
    }
    // onMounted(() => {
    // const savedUser = localStorage.getItem("loginUser");
    // if (savedUser) {
    //     console.log(savedUser)
    //     loginUser.value = JSON.parse(savedUser);
    // }
    // });
    //로그인
    // const login= (user) => {
    //     // user 정보 요청 api 주소
    //     // axios 요청
    //     axios .get(`${REST_USER_API}/${user.id}`)
    //       .then((res) => {
    //         console.log(user)
    //         //db에서 해당하는 id의 회원 찾아오기
    //         let dbUser = res.data;
      
    //         if(dbUser) {
    //             if(user.password === dbUser.userPassword){
    //                 user.value = dbUser;
    //                 localStorage.setItem('loginUser', JSON.stringify(dbUser));
    //                 alert(dbUser.userName + "님 환영합니다!");
    //                 loginUser.value = dbUser;
    //                 router.push('/');
    //             }else{
    //                 alert("비밀번호가 틀렸습니다");
    //             }
    //         } else {
    //           alert('해당 ID와 일치하는 회원이 없습니다.');
    //         }
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         alert("로그인 실패: 서버 에러");
    //       });
    //   };

    return {getAllDiary, allDiary, weeklyDiary, getWeeklyDiary}
})
