<template>
    <v-dialog v-model="dialog" max-width="500">
        <v-card>
            <div class="update">
                <div class="update-form">
                    <br>
                    <h4>다이어리 수정하기</h4>
                    <div class="form-floating mb-3">
                        <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요." v-model="diary.title">
                    </div>
                    <div class="form-floating mb-3">
                        <textarea class="form-control" id="content" placeholder="내용" style="height: 200px" v-model="diary.content"></textarea>
                        <label for="content">Content</label>
                    </div>
                    <div class="input-group">
                        <input type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload" @change="upload" :ref="image" accept="image/.*">
                    </div>
                    <div style="text-align: center;">
                        <img :src="imageUploaded" style="width: 20rem; margin-top: 10px" />
                    </div>
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

const diaryStore = useDiaryStore()

const props = defineProps({
    diary: Object,
})

// 모달창 활성화 여부
const emit = defineEmits(['closeDialog'])
const close = function () {
    emit("closeDialog")
}

const diaryId = route.params.diaryId

const updateDiary = function (event) {
    // diaryStore.update(props.diary)
    console.log(props.diary)
   
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
</style>