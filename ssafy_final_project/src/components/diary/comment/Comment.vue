<template>
    <div class="reviews d-flex flex-column">
        <div class="writer">
            <strong>작성자: </strong>{{ comment.userId }}
        </div>
        <p class="comment">
            {{ comment.content }} 
            <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <v-btn style="float: right;"
                    color="amber-darken-4"
                    variant="text"  
                    v-bind="props" 
                    text="대댓글 작성하기"> </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="대댓글 작성">
                    <v-card-text>
                        <v-text-field
                            @keyup.enter="createSubComment(comment), isActive.value = false"
                            v-model = "subCommentContent"
                            type="text"
                            ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        text="작성"
                    
                        @click="createSubComment(comment), isActive.value = false"
                        ></v-btn>
                        <v-btn
                        text="취소"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
                 <!--대댓글이 1개 이상인 경우에만 보여줌-->
                <v-card-actions v-if="diaryStore.getSubCommentLength(comment.commentId) > 0">
                <v-btn
                    color="green"
                    variant="text"
                    @click="getSubcomment(comment.commentId), show = !show"
                >
                    대댓글 보기
                    ({{ diaryStore.getSubCommentLength(comment.commentId) }})
                </v-btn>
                <v-spacer></v-spacer>

                <v-btn
                    :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                    @click="getSubcomment(comment.commentId), show = !show"
                ></v-btn>
                </v-card-actions>

                <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>
                    <template v-for="subComment in diaryStore.subComments">
                        <v-card-text >
                            <span>{{ subComment.userId }}: </span>
                            {{ subComment.content }}
                            <small style="float: right">
                            <template v-if="userStore.loginUser != null && (userStore.loginUser.userId == subComment.userId) ">
                                <v-dialog width="500">
                                    <template v-slot:activator="{ props }">
                                        <!-- <v-btn color="blue-lighten-1"  v-bind="props" text="수정"> </v-btn> -->
                                        <v-icon icon="mdi-pencil"  v-bind="props" ></v-icon>
                                    </template>

                                    <template v-slot:default="{ isActive }">
                                        <v-card title="댓글 수정">
                                        <v-card-text>
                                            <v-text-field
                                                :placeholder="subComment.content"
                                                @keyup.enter="updateComment(subComment), isActive.value = false"
                                                v-model = "updateContent"
                                                type="text"
                                                ></v-text-field>
                                        </v-card-text>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                            text="수정완료"
                                        
                                            @click="updateComment(subComment), isActive.value = false"
                                            ></v-btn>
                                            <v-btn
                                            text="취소"
                                            @click="isActive.value = false"
                                            ></v-btn>
                                        </v-card-actions>
                                        </v-card>
                                    </template>
                                </v-dialog>
                                <!-- <v-btn  color="red"  v-if="userStore.loginUser.userId == subComment.userId" type="button" class="btn btn-outline-danger"  @click="deleteComment(subComment.commentId)">삭제</v-btn > -->
                                    <v-icon icon="mdi-close-circle"  v-bind="props"  v-if="userStore.loginUser.userId == subComment.userId"   @click="deleteComment(subComment.commentId)" style="margin-left: 1em;"></v-icon>
                            </template>
                            </small>
                        </v-card-text>
                        
                        <!-- <v-card-text v-if="subComment.parentComment == comment.commentId" >
                            {{ subComment.content }}
                        </v-card-text> -->
                    </template>
                </div>
                </v-expand-transition>
        </p>

        <div class="comment-btn">
        <template v-if="userStore.loginUser != null && (userStore.loginUser.userId == comment.userId) ">
            <v-dialog width="500">
                <template v-slot:activator="{ props }">
                    <v-btn color="blue-lighten-1"  v-bind="props" text="수정"> </v-btn>
                </template>

                <template v-slot:default="{ isActive }">
                    <v-card title="댓글 수정">
                    <v-card-text>
                        <v-text-field
                            :placeholder="comment.content"
                            @keyup.enter="updateComment(comment), isActive.value = false"
                            v-model = "updateContent"
                            type="text"
                            ></v-text-field>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                        text="수정완료"
                    
                        @click="updateComment(comment), isActive.value = false"
                        ></v-btn>
                        <v-btn
                        text="취소"
                        @click="isActive.value = false"
                        ></v-btn>
                    </v-card-actions>
                    </v-card>
                </template>
            </v-dialog>
            <v-btn  color="red"  v-if="userStore.loginUser.userId == comment.userId" type="button" class="btn btn-outline-danger"  @click="deleteComment(comment.commentId)">삭제</v-btn >
        </template>
        </div>
        <div class="comment-date">{{ comment.writeDate }}  </div>
    </div>
</template>

<script setup>
    import { useUserStore } from '@/stores/user'
    import { useDiaryStore } from '@/stores/diary'
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted, onUpdated, computed } from 'vue'
    import axios from 'axios'

    const props = defineProps({
        comment: Object
    })



    const show = ref(false)
    const newContent = ref('')
    const updateContent = ref('')
    const route = useRoute()
    const router = useRouter()
    const userStore = useUserStore();
    const diaryStore = useDiaryStore();


    const updateComment = function(com){
        // console.log(com)
        // console.log(newContent.value)
        // newComment.value.content = newContent.value
        // console.log(event.target.value)
        var today = new Date();
	
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        
        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 
        
        var dateString = year + '-' + month  + '-' + day;
        var timeString = hours + ':' + minutes  + ':' + seconds;
        com.updateDate = dateString + " "+ timeString
        com.content = updateContent.value;
        console.log(com)
        axios.put("http://localhost:8080/diary-api/diary/comment", com, { headers: {
                'access-token': sessionStorage.getItem('access-token')
            }})
        updateContent.value = ""
        // isActive.value = false
        // router.go()
    }
    const deleteComment = function(commentId){
            var flag = confirm("정말로 댓글을 삭제하시겠습니까?")
            console.log(flag)
            if(flag){
                axios.delete(`http://localhost:8080/diary-api/diary/comment/${commentId}`, {headers: {
                'access-token': sessionStorage.getItem('access-token')
            }})
                router.go()
            }
            // store.reviews = diaryStore.comments.filter((review) => review.reviewNo != reviewNo)
            // emit('deleteComment', commentId)
            //page 새로고침
    }

    const getSubcomment =(commentId)=>{
        console.log(commentId)
        diaryStore.getSubComments(commentId)
        // console.log(diaryStore.subComments)
    }

    const subCommentContent = ref('')


    const newComment = ref({
        diaryId: "",
        userId: "",
        writeDate: "",
        parentComment: 0,
        content: ""
    })

    const createSubComment = function(){
        var today = new Date();
	
        var year = today.getFullYear();
        var month = ('0' + (today.getMonth() + 1)).slice(-2);
        var day = ('0' + today.getDate()).slice(-2);
        
        var hours = ('0' + today.getHours()).slice(-2); 
        var minutes = ('0' + today.getMinutes()).slice(-2);
        var seconds = ('0' + today.getSeconds()).slice(-2); 
        
        var dateString = year + '-' + month  + '-' + day;
        var timeString = hours + ':' + minutes  + ':' + seconds;
        
        newComment.value.writeDate = dateString + " "+ timeString
        newComment.value.diaryId = props.comment.diaryId;
        newComment.value.userId = userStore.loginUser.userId
        newComment.value.content = subCommentContent.value
        newComment.value.parentComment = props.comment.commentId
        console.log(newComment.value)
        diaryStore.createComment(newComment.value)
        subCommentContent.value = ""
        // console.log(newComment.value)
        router.go()
    }


    // const getSubcomments = (comment) =>{
    //     if(!show.value){
    //         console.log(comment)
    //     }
    // }

</script>

<style scoped>
    .comment-date, .comment-btn{
        text-align: end;
    }
    .writer{
        font-size: 1rem;
    }
    .comment{
        padding-top: 10px;
        font-size: 0.9rem;
    }
</style>