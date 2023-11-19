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
        })
        .then((res) => {
            diary.value = res.data
            console.log(diary.value)
        })
    }

    onMounted(()=>{
         axios({
            url: REST_DIARY_API,
            method: 'GET',
        })
        .then((res) => {
            avtyDiary.value = res.data
         }) 
    })

    const getAllDiary = function () {
        axios({
            url: REST_DIARY_API,
            method: 'GET',
        })
            .then((res) => {
                allDiary.value = res.data
            })
    }
    const getWeeklyDiary = function (userId) {
        axios({
            url: `${REST_DIARY_API}/weekly/${userId}`,
            method: 'GET',
        })
        .then((res) => {
            weeklyDiary.value = res.data
        })
}

    const getDiaryComments = function(diaryId){
        axios({
            url: `${REST_DIARY_API}/comment/${diaryId}`,
            method: 'GET',
        })
        .then((res) => {
            comments.value = res.data
        })
    }
    const getAllComments = function(){
        axios({
            url: `${REST_DIARY_API}/comment/`,
            method: 'GET',
        })
        .then((res) => {
            comments.value = res.data
        })
    }

    const subComments = ref()
    
    const getSubComments = computed(()=>{
        return (commentId) => subComments.value = comments.value.filter((comment) => comment.parentComment === commentId);
    })

    const getSubCommentLength = computed(()=>{
        return (commentId) => comments.value.filter((comment)=>comment.parentComment === commentId).length
    })


    const createComment = function(comment){
        axios({
            url: `${REST_DIARY_API}/comment`,
            method: 'POST',
            data: comment
        })
        .then((res) => {
            console.log('댓글 작성 성공')
            comments.value.push(comment)
        })
    }

    const getAvtyDiary = computed(()=>{
        return (avty) => avtyDiary.value = allDiary.value.filter((diary)=> diary.avty === avty
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
        })
        .then((res)=>{
            likeDiaryInfo.value = res.data
            console.log(likeDiaryInfo.value)
        })
    }
    
    onMounted(() => {
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'GET',
        })
        .then((res)=>{
            likeDiaryInfo.value = res.data
            console.log(likeDiaryInfo.value)
            })
        })
        const like = function(like){
            axios({
                url: `${REST_DIARY_API}/like`,
                method: 'POST',
                data: like
            })
            .then((res)=>{
                console.log('좋아요')
            })
        }
        const unlike = function(like){
            axios({
                url: `${REST_DIARY_API}/like`,
                method: 'DELETE',
                data: like
            })
            .then((res)=>{
                console.log('좋아요해제')
            })
        }
        const likeCount = computed(()=>{
            return (diaryId) =>  likeDiaryInfo.value.filter((info) => info.diaryId == diaryId).length
        })
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

    return { getAllDiary, allDiary, weeklyDiary, getWeeklyDiary, comments, getDiaryComments, getAllComments, createComment, diary, getOneDiary, getAvtyDiary, avtyDiary, getSubComments, subComments, getSubCommentLength, like, unlike, likeDiaryInfo, likeCount, getAllLike}
})
