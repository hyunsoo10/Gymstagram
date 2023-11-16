<template>
    <v-card
      :loading="loading"
      class="mx-auto my-12"
      width="550"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>
  
      <v-img
        cover
        height="450"
        :src="`src/assets/diary_image/${diary.userId}/${diary.saveImage}`"
      ></v-img>
  
      <v-card-item>
        <v-card-title>{{diary.title}}</v-card-title>
  
        <v-card-subtitle>
          <span class="me-1">LIKE</span>
  
          <v-icon
            color="error"
            icon="mdi-fire-circle"
            size="small"
          ></v-icon>
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <v-row
          align="center"
          class="mx-0"
        >
          <!-- <v-rating
            :model-value="4.5"
            color="amber"
            density="compact"
            half-increments
            readonly
            size="small"
          ></v-rating>
  
          <div class="text-grey ms-4">
            4.5 (413)
          </div> -->
        </v-row>
  
        <div class="my-4 text-subtitle-1">
          {{diary.createDate}}
        </div>
  
        <div>{{ diary.content }}</div>
      </v-card-text>
  
      <v-divider class="mx-4 mb-1"></v-divider>
  
      <v-card-title>댓글</v-card-title>
        <v-form>
            <v-container>
            <v-row>
                <v-col cols="12">
                <v-text-field
                    v-model="message"
                    :append-icon="'mdi-send'"
                    variant="filled"
                    clearable
                    label="your comment"
                    type="text"
                    @click:append="createComment"
                ></v-text-field>
                </v-col>
            </v-row>
            </v-container>
        </v-form>
          
      <!-- <v-card-actions>
        <v-btn
          color="deep-purple-lighten-2"
          variant="text"
          @click="createComment"
        >
        댓글 등록
        </v-btn>
      </v-card-actions> -->
      <template v-if="diaryComment.length>0">
        <div v-for="comment in diaryComment" class="comment-box">
            <div class="comment-line">
                {{comment.userId}} : {{ comment.content }}
            </div>
        </div>
      </template>
      <template v-if="diaryComment.length<=0">
        <div style="text-align: center;">해당 게시물에 작성된 댓글이 없습니다.</div>
      </template>
  
      <div class="px-4">
        <!-- <v-chip-group v-model="selection">
          <v-chip>5:30PM</v-chip>
  
          <v-chip>7:30PM</v-chip>
  
          <v-chip>8:00PM</v-chip>
  
          <v-chip>9:00PM</v-chip>
        </v-chip-group> -->
      </div>

    </v-card>
  </template>

<script setup>
import {ref, onMounted, onUpdated, computed} from 'vue'
import { useDiaryStore } from '@/stores/diary'
import { useUserStore } from '@/stores/user'

const diaryStore = useDiaryStore();
const userStore = useUserStore();

const message = ref("")
const props = defineProps({
  diary: Object,
  comments : Object
})

const diaryComment = computed(()=>{
    return diaryStore.comments.filter((comment) =>{
        return comment.diaryId == props.diary.diaryId
    })
})


// onMounted(() => {
//     diaryStore.getDiaryComments(props.diary.diaryId)
//     console.log(diaryStore.comments)
//     comment.value = diaryStore.comments
// })
//(1, 'ssafy', '와 운동 진짜 열심히 하셨네요', 0),
// diary_id, user_id, parent_comment, content
const newComment = ref({
    diaryId: "",
    userId: "",
    parent_comment: 0,
    content: ""
})

//댓글 작성
const createComment = function(){
    newComment.value.diaryId = props.diary.diaryId
    newComment.value.userId = userStore.loginUser.userId
    newComment.value.content = message.value
    diaryStore.createComment(newComment.value)
    message.value = ""
    // console.log(newComment.value)
}
</script>

<style scoped>
    .comment-line{
        margin: 5px auto;
        padding: 10px;
        border: 1px solid rgb(146, 146, 146);
        border-radius: 10px;
    }
    .comment-box{
        margin: 10px;
    }
</style>