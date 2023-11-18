<template>
    <div class="create">
        <div class="create-form">
            <h4>Diary Create</h4>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="title" placeholder="제목" v-model="diary.title">
                <label for="title">Title</label>
            </div>
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="writer" placeholder="작성자" :value="userStore.loginUser.userId"
                    readonly>
                <label for="writer">Writer</label>
            </div>
            <div class="form-floating mb-3">
                <textarea class="form-control" id="content" placeholder="내용" style="height: 200px"
                    v-model="diary.content"></textarea>
                <label for="content">Content</label>
            </div>
            <div class="input-group">
                <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04"
                    aria-label="Upload" @change="upload" :ref="image" accept="image/.*">
                <!-- <button class="btn btn-outline-secondary" type="button" id="inputGroupFileAddon04" @click="upload">upload</button> -->
            </div>
            <img :src="imageUploaded" style="width: 500px; margin-top: 10px" />
            <div class="d-flex justify-content-end " style="margin-top: 10px;">
                <button class="btn btn-outline-primary" @click="createDiary($event)">등록</button>
            </div>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDiaryStore } from '@/stores/diary'
import { useUserStore } from '@/stores/user'
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter()

const diaryStore = useDiaryStore()
const userStore = useUserStore()

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
    console.log(formData);
    // diary.value.image = image.value
    // console.log(diary.value)
    // console.log(event)
    // store.createDiary(diary.value)
    console.log(JSON.stringify(diary.value))

    axios.post('http://localhost:8080/diary-api/diary', formData, {
        headers: {
            // 'Content-Type': 'application/json'
            'Content-Type': 'multipart/form-data'
        }
    }).then(() => {
        console.log("다이어리 추가 성공")
        router.push({ name: "diary" })
    }).catch(() => {
        console.log("다이어리 추가 실패")
    })
}

const imageUploaded = ref("https://cdn.pixabay.com/photo/2023/11/09/14/03/white-throated-sparrow-8377444_1280.jpg")
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
}


</style>