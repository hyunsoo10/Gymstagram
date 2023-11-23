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
    const dates = ref([])

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

    const getAllDiary = function (userId) {
        axios({
            url: REST_DIARY_API,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                console.log(res.data)
                allDiary.value = res.data

                for (let i = 0; i < allDiary.value.length; i++) {
                    if (allDiary.value[i].userId === userId) {
                        dates.value.push(allDiary.value[i].createDate);
                    }
                }
            })
            .finally(dates.value = [])
    }

    //userId로 my weekly diary 가져오기
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

    //diaryId에 해당하는 전체 comments 가져오기
    const getDiaryComments = function (diaryId) {
        axios({
            url: `${REST_DIARY_API}/comment/${diaryId}`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    console.log(res.data)
                    comments.value = res.data
                }
            })
    }
    
    //전체 comment 조회
    const getAllComments = function () {
        axios({
            url: `${REST_DIARY_API}/comment/`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    comments.value = res.data
                }
            })
    }

    //대댓글 담을 데이터
    const subComments = ref()

    //commentId를 인자로 넘겨 받아서 해당 comment의 하위 댓글들만 가져오는 computed 함수
    const getSubComments = computed(() => {
        return (commentId) => subComments.value = comments.value.filter((comment) => comment.parentComment === commentId);
    })

    //commentId의 대댓글 길이 가져오는 함수
    const getSubCommentLength = computed(() => {
        return (commentId) => comments.value.filter((comment) => comment.parentComment === commentId).length
    })


    //댓글 작성
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

    //Avty별 다이어리 조회 
    const getAvtyDiary = computed(() => {
        return (avty) => avtyDiary.value = allDiary.value.filter((diary) => diary.avty === avty
        )
    })

    //Diary 좋아요 정보 담을 배열
    const likeDiaryInfo = ref([])

    //전체 좋아요 정보 불러오기
    const getAllLike = function () {
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'GET',
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                if (res.data.length > 0) {
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
    
    //좋아요
    const like = function (like) {
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'POST',
            data: like,
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                if (res.data.length > 0) {
                    likeDiaryInfo.value = res.data
                }
            })
    }

    //좋아요 해제
    const unlike = function (like) {
        axios({
            url: `${REST_DIARY_API}/like`,
            method: 'DELETE',
            data: like,
            headers: {
                'access-token': sessionStorage.getItem('access-token')
            }
        })
            .then((res) => {
                console.log('좋아요해제')
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

    return { getAllDiary, allDiary, weeklyDiary, getWeeklyDiary, comments, getDiaryComments, getAllComments, createComment, diary, getOneDiary, getAvtyDiary, avtyDiary, getSubComments, subComments, getSubCommentLength, like, unlike, likeDiaryInfo, getAllLike, dates }
})