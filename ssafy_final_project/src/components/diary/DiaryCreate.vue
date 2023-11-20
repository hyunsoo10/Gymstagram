<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <div class="create">
                <div class="create-form">
                    <br>
                    <h4>다이어리 작성하기</h4>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목" v-model="diary.title">
                        <label for="title">제목</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="content" placeholder="내용" style="height: 200px"
                            v-model="diary.content"></textarea>
                        <label for="content">Content</label>
                    </div>
                    <div class="input-group">
                        <input type="file" class="form-control" id="inputGroupFile04"
                            aria-describedby="inputGroupFileAddon04" aria-label="Upload" @change="upload" :ref="image"
                            accept="image/.*">
                        <!-- <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="upload">upload</button> -->
                    </div>
                    <div style="text-align: center;">
                        <img :src="imageUploaded" style="width: 20rem; margin-top: 10px" />
                    </div>
                    <div class="d-flex justify-content-center " style="margin-top: 10px;">
                        <v-btn class="create-btn" @click="createDiary($event)">등록</v-btn>
                        <v-btn class="close-btn" @click="close">닫기</v-btn>
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useDiaryStore } from '@/stores/diary'
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()

const userStore = useUserStore()

// 모달창 활성화 여부
const emit = defineEmits(['closeDialog'])
const close = function () {
    emit("closeDialog")
}

const diary = ref({
    userId: "",
    originalImage: "",
    title: "",
    content: "",
})

const createDiary = function (event) {
    diary.value.userId = userStore.loginUser.userId
    // diary.value.image = btoa(image.value)
    var formData = new FormData()
    if (image.value != null) {
        diary.value.originalImage = image.value.name
        formData.append('image', image.value)
        formData.append('diary', new Blob([JSON.stringify(diary.value)], { type: "application/json" }));
    } else {
        formData.append('diary', new Blob([JSON.stringify(diary.value)], { type: "application/json" }));
    }
    axios.post('http://localhost:8080/diary-api/diary', formData, {
        headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data',
             'access-token': sessionStorage.getItem('access-token')

        },

    }).then(() => {
        console.log("다이어리 추가 성공")
        emit("closeDialog")
        // router.push({ name: "mypage" })
        router.go()
    }).catch(() => {
        console.log("다이어리 추가 실패")
    })
}

const imageUploaded = ref("https://cdn.pixabay.com/photo/2014/07/31/23/42/notepad-407197_1280.jpg")
const image = ref(null)
const upload = function (e) {
    // console.log(e.target.files[0])
    image.value = e.target.files[0]
    imageUploaded.value = URL.createObjectURL(image.value)
    // console.log(URL.createObjectURL(image.value))
}

</script>

<style  scoped>
.create {
    display: flex;
    justify-content: center;
    margin: 20px;
}

.create-form {
    width: 80%;
}

.create-btn {
    margin-right: 1em;
}
</style>