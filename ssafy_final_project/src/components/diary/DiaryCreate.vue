<template>
    <v-dialog class="dialog" v-model="dialog" max-width="800">
        <v-card>
            <div class="create">
                <div class="create-form">
                    <br>
                    <p class="form-title">다이어리 작성하기</p>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목" v-model.trim="diary.title" :required="required">
                        <label for="title">제목</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="content" placeholder="내용" style="height: 200px"
                            v-model.trim="diary.content"></textarea>
                        <label for="content">내용</label>
                    </div>
                    <div class="input-group" >
                        <label for="file" ref="filebtn" > </label>
                        <input type="file" id="file" class="form-control" @change="upload" :ref="image"  accept="image/.*">
                    </div>

                    <!-- <div class="file-upload-container" 
                        @dragenter="onDragenter"
                        @dragover.prevent="onDragover"
                        @dragleave="onDragleave"
                        @drop.prevent="onDrop"
                        @click="$refs.filebtn.click()"
                        >
                        <div class="file-upload" :class="isDragged ? 'dragged' : ''">
                            Drag and Drop Here
                        </div>
                    </div> -->

                    <div 
                        @dragenter="onDragenter"
                        @dragover.prevent="onDragover"
                        @dragleave="onDragleave"
                        @drop.prevent="onDrop"
                        @click="$refs.filebtn.click()"
                        @change="upload"
                         :ref="image"
                        class="drag-box">
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

    console.log(diary.value.content)
    
    if(diary.value.title == ""){
        alert("제목을 입력하세요")
        return
    }
    if(diary.value.content == ""){
        alert("내용을 입력하세요")
        return
    }

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
const uploadName = ref('첨부파일')

const imageUploaded = ref("../src/assets/Gymstagram.png")
const image = ref(null)
const upload = function (e) {
    image.value = e.target.files[0]
    uploadName.value = image.value.name;
    imageUploaded.value = URL.createObjectURL(image.value)
}


const isDragged = ref(false)

const onDragenter = function(event){
    isDragged.value = true
    console.log("enter")
}

const onDragleave = function(event){
    isDragged.value = false
    console.log("leave")
}

const onDragover = function(){
    
}

const onDrop = function(event){
    isDragged.value = false
    const file = event.dataTransfer.files
    console.log(event)
    console.log(file)
    dragUpload(file[0])
}

const dragUpload = function (file) {
    console.log(file)
    image.value = file
    imageUploaded.value = URL.createObjectURL(image.value)
    uploadName.value = image.value.name;
}
</script>

<style  scoped>

.dialog{
    font-family:'SaumsungBold'!important;
    text-align: center;

}
.form-title {
    font-size: 20px;
    font-weight: 700;
}
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
    background:  #c9c9c9;
    color: #776B5D;
    font-weight: 500;
}

.create-btn:hover {
    margin-right: 1em;
    background:  #b5b5b5;
    color: #776B5D;
    font-weight: bold;
}

.close-btn {
    margin-right: 1em;
    background: rgba(255, 0, 0, 0.533);
    color: #776B5D;
    font-weight: 500;
}

.close-btn:hover {
    margin-right: 1em;
    background: rgba(255, 0, 0, 0.533);
    color: #776B5D;
    font-weight: bold;
}

.drag-box{
    text-align: center;
    cursor: pointer !important;
}

.drag-box:hover{
    background-color: rgba(214, 209, 209, 0.705);
}
</style>