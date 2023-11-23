<template>
    <div class="container" v-if="userStore.loginUser!=null">
        <div class="btn-box">
            <v-btn class="ma-3 mx-3 back-btn" @click.prevent="back">
                <v-icon start icon="mdi-arrow-left"></v-icon>
                Back
            </v-btn>
            <v-btn class="ma-3 mx-3 update-btn" v-if="diaryStore.diary.userId === userStore.loginUser.userId"
                @click.stop="dialog = true">
                <v-icon start icon="mdi-pencil"></v-icon>수정하기
            </v-btn>
        </div>
        <diaryUpdate :diary="diaryStore.diary" @close-Dialog="close" :dialog="dialog" v-model="dialog"></diaryUpdate>
        <div class="diary-body">
            <div class="diary-title">
                <span>{{ diaryStore.diary.title }}
                </span>
            </div>
                <img class="card-img-top diray-img"
                    :src="`../src/assets/diary_image/${diaryStore.diary.userId}/${diaryStore.diary.saveImage}`" onerror="this.src='https://cdn.pixabay.com/photo/2023/06/20/01/30/ai-generated-8075768_640.jpg'" />
            <p class="diary-info">
                <small class="diary-info-item">
                    <i class="fas fa-user-circle" style="color: #727479;" />
                    &nbsp;&nbsp;{{ diaryStore.diary.userId }}
                </small>
                <small class="diary-info-item">
                    <i class="fas fa-calendar-alt" style="color: #727479;" />
                    &nbsp;&nbsp;{{ diaryStore.diary.createDate }}
                </small>
                <small class="diary-info-item">
                    <i class="fas fa-eye" style="color: #727479;" />
                    <strong>&nbsp;&nbsp;{{ diaryStore.diary.viewCount }}</strong>
                </small>
                <small class="diary-info-item">
                    <i class="fa-solid fa-heart" style="color: #727479;" />
                    <strong>&nbsp;&nbsp;{{ diaryStore.diary.likeCount }}</strong> 
                </small>
                <template v-if="likeFlag">
                    <div class="like-heart">
                        <button @click="unlike(), likeFlag = !likeFlag">
                            <i class="fa-solid fa-heart fa-xl" style="color: rgb(255, 82, 82);"></i>
                        </button>
                    </div>
                </template>
                <template v-else>
                    <div class="like-heart">
                        <button @click="like(), likeFlag = !likeFlag">
                            <i class="fa-regular fa-heart fa-xl" style="color: rgb(176, 176, 176);"></i>
                        </button>
                    </div>
                </template>
            </p>
            <div class="diary-content">
                {{ diaryStore.diary.content }}
            </div>
        </div>
        <!--로그인 안했으면 해당 문구 출력-->
        <p v-show="!userStore.loginUser">
            게시물을 좋아요 하고 싶으면 로그인 하세요
        </p>
        <form v-if="userStore.loginUser" class="row gx-3 gy-2 align-items-end justify-content-center" id="commentForm">
            <div class="col-sm-3">
                <label class="visually-hidden" for="specificSizeInputGroupUsername">Username</label>
                <div class="input-group">
                    <div class="input-group-text">@</div>
                    <input type="text" class="form-control" id="specificSizeInputGroupUsername" name="userId"
                        :value="userStore.loginUser.userId" readonly>
                </div>
            </div>
            <div class="col-sm-6">
                <input type="text" class="form-control" id="comment-content" v-model.trim="newContent"
                    placeholder="댓글을 작성해주세요" @keyup.enter="createComment" />
            </div>


            <div class="col-auto">
                <button type="button" @click="createComment" class="btn"><i class="fa-regular fa-paper-plane fa-bounce" style="color: #109452;"></i></button>
            </div>
        </form>
        <!-- <template v-if="diaryStore.comments.length>0"> -->
        <template v-if="diaryComment.length > 0">

            <div v-for="comment in diaryStore.comments" class="comment-box">
                <!--부모댓글인 경우에만 정상 출력, 하위 댓글은 그 댓글의 대댓글로 출력할 것임-->
                <template v-if="comment.parentComment == 0">
                    <Comment :comment="comment" />
                </template>
            </div>
        </template>
        <template v-if="diaryComment.length <= 0">
            <div style="text-align: center; margin: 50px auto">해당 다이어리에 작성된 댓글이 없습니다. <br> 첫 번째 댓글을 남겨보세요!</div>
        </template>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, onUpdated, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { useDiaryStore } from '@/stores/diary'
import axios from 'axios'
import Comment from '@/components/diary/comment/Comment.vue'
import diaryUpdate from '@/components/diary/DiaryUpdate.vue';

const diaryStore = useDiaryStore();
const userStore = useUserStore();

const newContent = ref('')
const route = useRoute()
const router = useRouter()

const dialog = ref(false);
const close = function () {
    console.log(dialog.value)
    dialog.value = false
}


const diaryId = ref(route.params.diaryId)

const likeFlag = ref(false)

const likeInfo = ref(
    {
        userId: '',
        diaryId: ''
    }
)

const like = () => {
    // console.log('like')
    // console.log(userStore.loginUser.userId)
    // console.log(diaryId.value)
    likeInfo.value.userId = userStore.loginUser.userId
    likeInfo.value.diaryId = diaryId.value
    diaryStore.diary.likeCount++;
    diaryStore.like(likeInfo.value)
    likeInfo.value.userId = ''
    likeInfo.value.diaryId = ''
    // router.go()
}

const unlike = () => {
    likeInfo.value.userId = userStore.loginUser.userId
    likeInfo.value.diaryId = diaryId.value
    diaryStore.diary.likeCount--;
    diaryStore.unlike(likeInfo.value)
    likeInfo.value.userId = ''
    likeInfo.value.diaryId = ''
    // router.go()
}
onMounted(() => {
    diaryStore.getAllLike()
})

onMounted(() => {
    diaryStore.getOneDiary(diaryId.value)
    diaryStore.getDiaryComments(diaryId.value)

    axios({
        url: `http://localhost:8080/diary-api/diary/like/${userStore.loginUser.userId}/${diaryId.value}`,
        method: 'GET',
        headers: {
            'access-token': sessionStorage.getItem('access-token')
        }
    })
        .then((res) => {
            if (res.data > 0) {
                likeFlag.value = true;
            }
        })
})


const newComment = ref({
    diaryId: "",
    userId: "",
    writeDate: "",
    parent_comment: 0,
    content: ""
})


//댓글 작성
const createComment = function () {
    var today = new Date();

    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);

    var hours = ('0' + today.getHours()).slice(-2);
    var minutes = ('0' + today.getMinutes()).slice(-2);
    var seconds = ('0' + today.getSeconds()).slice(-2);

    var dateString = year + '-' + month + '-' + day;
    var timeString = hours + ':' + minutes + ':' + seconds;

    newComment.value.writeDate = dateString + " " + timeString
    newComment.value.diaryId = diaryId.value
    newComment.value.userId = userStore.loginUser.userId
    newComment.value.content = newContent.value
    console.log(newComment.value)
    diaryStore.createComment(newComment.value)
    newContent.value = ""
    router.go()
}

const diaryComment = computed(() => {
    return diaryStore.comments.filter((comment) => {
        return comment.diaryId == diaryStore.diary.diaryId
    })
})


const back = () => { router.go(-1) }
</script>

<style scoped>
.container {
    width: 50%;
    margin: 20px auto;
    border: 1px solid rgb(176, 176, 176);
    -webkit-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    -moz-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    -ms-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    -o-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 0.7em;
}

.btn-box {
    width: 85%;
    margin: 1em auto;
    display: flex;
    justify-content: space-between;
}

.back-btn {
    background: white;
    border:  1px solid;
    color: black;
}

.update-btn {
    background: #c9c9c9;
    border: #c9c9c9 1px solid;
}

.update-btn:hover {
    font-weight: bold;
    transition: 0.3s;
}

.diary-body {
    margin: 20px auto;
    text-align: center;
}

.diary-title span {
    font-size: 2em;
    font-weight: 540;
    background: linear-gradient(to top, #EBE3D5 20%, transparent 30%);
}

.diray-img {
    width: 60%;
    border-radius: 0.7em;
    margin-top: 20px;
    margin-bottom: 30px;
}

.diary-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60%;
    margin: 5px auto;
}

.like-heart {
    font-size: 20px;
}

.diary-content {
    width: 60%;
    background: #ebe3d5a6;
    border-radius: 7px;
    min-height: 150px;
    margin: 1.5em auto 0;
    text-align: start;
    padding: 20px;
    font-size: 18px;
}
.diary-edit {
    border: 1px solid #c9c9c9;
    border-radius: 10px;
    width: 6rem;
    height: 2rem;
    background: #c9c9c9;
    font-size: 1.2rem;
    margin-left: 20px;
}

.comment-line {
    margin: 5px auto;
    padding: 10px;
    border: 1px solid rgb(146, 146, 146);
    border-radius: 10px;
    display: flex;
    justify-content: space-between;
}

#commentForm {
    margin: 10px auto;
    width: 80%;
}
.comment-box {
    margin: 10px auto;
    width: 65%;
}

.reviews {
    border: 1px solid rgb(226, 226, 226);
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
}

.reviews div {
    margin: 5px;
}

#comment-content::placeholder {
    font-size: 13px;
}
.comment-btn {
    text-align: end;
}

.writer {
    font-size: 1rem;
}

.comment {
    padding-top: 10px;
    font-size: 0.9rem;
}

.back-icon {
    margin-top: 10px;
    color: black;
    font-size: 2rem;
    display: flex;

}

.container a {
    text-decoration: none;
}
</style>