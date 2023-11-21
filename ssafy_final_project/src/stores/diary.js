import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from "vue-router";

export const useDiaryStore = defineStore('diary', () => {
    const REST_DIARY_API = `http://localhost:8080/diary-api/diary`

    const allDiary = ref([])
    const avtyDiary = ref([])
    const diary = ref({})
    const weeklyDiary = ref([])
    const comments = ref([])

    const router = useRouter();

    const loginUser = ref(null)
    const getOneDiary = function (diaryId) {
        axios({
            url: `${REST_DIARY_API}/${diaryId}`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                diary.value = res.data
                console.log(diary.value)
            })
    }

    onMounted(() => {
        axios({
            url: REST_DIARY_API,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                avtyDiary.value = res.data
            })
    })

    const getAllDiary = function () {
        axios({
            url: REST_DIARY_API,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                allDiary.value = res.data
            })
    }
    const getWeeklyDiary = function (userId) {
        axios({
            url: `${REST_DIARY_API}/weekly/${userId}`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                weeklyDiary.value = res.data
            })
    }

    const getDiaryComments = function (diaryId) {
        axios({
            url: `${REST_DIARY_API}/comment/${diaryId}`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then((res) => {
            if(res.data.length > 0){
                comments.value = res.data
            }
        })
    }
    const getAllComments = function () {
        axios({
            url: `${REST_DIARY_API}/comment/`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then((res) => {
            if(res.data.length > 0){
                comments.value = res.data
            }
        })
    }

    const subComments = ref()

    const getSubComments = computed(() => {
        return (commentId) => subComments.value = comments.value.filter((comment) => comment.parentComment === commentId);
    })

    const getSubCommentLength = computed(() => {
        return (commentId) => comments.value.filter((comment) => comment.parentComment === commentId).length
    })


    const createComment = function (comment) {
        axios({
            url: `${REST_DIARY_API}/comment`,
            method: 'POST',
            data: comment,
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                console.log('댓글 작성 성공')
                comments.value.push(comment)
            })
    }

    const getAvtyDiary = computed(() => {
        return (avty) => avtyDiary.value = allDiary.value.filter((diary) => diary.avty === avty
        )
    })

    const likeDiaryInfo = ref([])
    // const likeCount = ref(0)
    // const getDiaryLike = computed(()=>{
    //     return (diaryId) =>  likeCount.value = likeDiaryInfo.value.filter((info) => info.diaryId === diaryId).length
    // })

    const getAllLike = function () {
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then((res)=>{
            if(res.data.length>0){
                likeDiaryInfo.value = res.data
            }
            // console.log(likeDiaryInfo.value)
        })
    }

    onMounted(() => {

        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                likeDiaryInfo.value = res.data
                console.log(likeDiaryInfo.value)
            })
    })

    const like = function(like){
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'POST',
            data: like,
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then((res)=>{
            if(res.data.length>0){
                likeDiaryInfo.value = res.data
            }
            // console.log(likeDiaryInfo.value)
            })
        }
    
    const unlike = function(like){
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'DELETE',
            data: like,
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then((res)=>{
            console.log('좋아요해제')
        })
    }

   // 정보수정
   const updateDiary = (formData, newPassword) => {
    axios
        .put(`${REST_USER_API}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then(() => {
            alert('정보수정에 성공하였습니다!');
            // localStorage에 저장된 정보도 변경하기
            // const localUser = JSON.parse(localStorage.getItem('loginUser'))
            axios.get(`${REST_USER_API}/${loginUser.value.userId}`, {headers: {
            'access-token': sessionStorage.getItem('access-token')
        }})
        .then((res) => {
            //업데이트 했던 비밀번호 넘겨줘야됌
            let user =  {
                userId: loginUser.value.userId,
                userPassword: newPassword
            }
            console.log(user)
            axios.post(`${REST_USER_API}/jwtlogin`, user)
            .then((response)=>{
              console.log(response.data)
            //   console.log(atob(response.data['access-token'].split('.')[1]))
              sessionStorage.setItem('access-token', response.data["access-token"])
        
              const token = response.data['access-token'].split('.')
              let user = token[1]
              // user = atob(user)
              //디코딩
              user = decodeURIComponent(escape(atob(user)));
              user = JSON.parse(user)
              user = user["user"]
              console.log(user)
              loginUser.value = Object.assign({}, user);
        
            })
            router.push('/');
            // loginUser.value = dbUser;
        })
        })
        .catch(() => {
            console.log("정보수정에 실패하였습니다!")
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

    return { getAllDiary, allDiary, weeklyDiary, getWeeklyDiary, comments, getDiaryComments, getAllComments, createComment, diary, getOneDiary, getAvtyDiary, avtyDiary, getSubComments, subComments, getSubCommentLength, like, unlike, likeDiaryInfo, getAllLike }
})
