<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <div class="update">
                <div class="update-form">
                    <br>
                    <h4>다이어리 수정하기</h4>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요." v-model="diaryStore.diary.title">
                        <label for="title">제목</label>
                    </div>
                    <div class="form-floating mb-3">
                        <textarea id="content" class="form-control" placeholder="내용을 입력해주세요." style="height: 200px"
                            v-model="diaryStore.diary.content"></textarea>
                        <label for="content"> 내용 </label>
                    </div>
                    <div class="filebox">
                        <input class="upload-name" v-model="diaryStore.diary.saveImage" placeholder="첨부파일">
                        <label for="file" id="file-btn">파일찾기</label>
                        <input type="file" id="file" @change="upload" :ref="image" accept="image/.*">
                    </div>
                    <img class="image-ex" :src="imageUploaded" style="width: 200px; margin-top: 10px" />
                    <div class="d-flex justify-content-center " style="margin-top: 10px;">
                        <v-btn class="update-btn" @click="updateDiary($event)">수정</v-btn>
                        <v-btn class="close-btn" @click="close">닫기</v-btn>
                    </div>
                </div>
            </div>

        </v-card>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDiaryStore } from '@/stores/diary.js'
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()
const route = useRoute()

// 모달창 활성화 여부
const emit = defineEmits(['closeDialog'])
const close = function () {
    emit("closeDialog")
}


const diaryStore = useDiaryStore()
const diaryId = diaryStore.diary.diaryId

const props = defineProps({
    diary: Object,
})


const uDiary = ref({
    diaryId: '',
    originalImage: '',
    title: '',
    content: '',
    updateDate: '',
})

const image = ref('');
const uploadName = ref(diaryStore.diary.saveImage)
const imageUploaded = ref('')

const upload = function (event) {
    image.value = event.target.files[0]
    // uploadName.value = image.value.name;
    diaryStore.diary.saveImage = image.value.name;
    imageUploaded.value = URL.createObjectURL(image.value)
}

const updateDiary = function (event) {
    console.log(props.diary)
    uDiary.value.userId = props.diary.userId;
    uDiary.value.diaryId = props.diary.diaryId;
    uDiary.value.title = props.diary.title;
    uDiary.value.content = props.diary.content;
    uDiary.value.originalImage = props.diary.originalImage;

    let today = new Date();

    let year = today.getFullYear();
    let month = ('0' + (today.getMonth() + 1)).slice(-2);
    let day = ('0' + today.getDate()).slice(-2);

    let dateString = year + '-' + month + '-' + day;
    uDiary.value.updateDate = dateString;

    console.log(uDiary.value)
    let formData = new FormData()
    if (image.value != null) {
        uDiary.value.originalImage = image.value.name;
        formData.append('image', image.value)
        formData.append('diary', new Blob([JSON.stringify(uDiary.value)], { type: "application/json" }));
    } else {
        formData.append('diary', new Blob([JSON.stringify(uDiary.value)], { type: "application/json" }));
    }

    axios
        .put('http://localhost:8080/diary-api/diary', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'access-token': sessionStorage.getItem('access-token')
            }
        })
        .then(() => {
            alert('다이어리 수정이 완료되었습니다!');
            uploadName.value = ''
            imageUploaded.value = ''
            emit("closeDialog")
            // router.push({
            //     name: 'diaryDetail',
            //     params: diaryId
            // })
            router.go();
        })
        .catch(() => {
            alert('다이어리 수정에 실패했습니다!');
        })
}

</script>

<style scoped>
.update {
    display: flex;
    justify-content: center;
    margin: 20px;
}

.update-form {
    width: 80%;
}

.update-btn {
    margin-right: 1em;
}

.filebox .upload-name {
    display: inline-block;
    font-size: 12px;
    height: 35px;
    padding: 0 10px;
    vertical-align: middle;
    border: 1px solid rgb(177, 177, 177);
    width: 20em;
    color: rgb(177, 177, 177);
}

#file-btn {
    text-align: center;
    display: inline-block;
    padding-top: 7px;
    color: #fff;
    font-size: 12px;
    vertical-align: middle;
    background-color: rgb(177, 177, 177);
    cursor: pointer;
    height: 35px;
    width: 7.5em;
    margin-left: 5px;
    border-radius: 5px;
}

.filebox input[type="file"] {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
}
</style>