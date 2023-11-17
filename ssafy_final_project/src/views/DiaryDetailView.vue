<template>
    <div class="container">
			<div class="card-body">
						<h5 class="card-title">{{diaryStore.diary.title}}</h5>
						<img class="card-img-top diray-img" width="500" height=""
                            :src="`../src/assets/diary_image/${diaryStore.diary.userId}/${diaryStore.diary.saveImage}`"/>
						<p class="card-text">
                            {{diaryStore.diary.userId}} &nbsp;&nbsp;
                            <small class="text-body-secondary">조회수 : {{diaryStore.diary.viewCount}}</small></p>
						<p class="card-text">{{diaryStore.diary.createDate}}
                                <span style="font-size: 30px; "><a href=""><i class="fa-solid fa-heart" style="color: red;"></i></a></span>
						</p>
			</div>
			<!--로그인 안했으면 해당 문구 출력-->
			<p v-show="!userStore.loginUser">
			    게시물을 좋아요 하고 싶으면 로그인 하세요
			</p>
            <form class="row gx-3 gy-2 align-items-end" id="reviewForm" >
				<div class="col-sm-3">
					<label class="visually-hidden" for="specificSizeInputGroupUsername">Username</label>
					<div class="input-group">
						<div class="input-group-text">@</div>
						<input type="text" class="form-control"
						id="specificSizeInputGroupUsername"  name="userId" :value="userStore.loginUser.userId" readonly>
					</div>
				</div>
				<div  class="col-sm-6">
					<label for="floatingInputValue"></label>
					<input type="text" class="form-control" id="floatingInputValue"   v-model.trim="newContent"  placeholder="write your review" @keyup.enter="createComment"/>
				</div>
				
				<div class="col-auto"></div>
				<div class="col-auto">
					<button type="button" @click="createComment" class="btn btn-outline-success">comment</button>
				</div>
			</form>
            <template v-if="diaryStore.comments.length>0">

            <div v-for="comment in diaryStore.comments" class="comment-box">
                    <div class="reviews d-flex flex-column">
                        <div>
                            <strong>작성자: </strong>{{ comment.userId }}
                        </div>

            
                        <strong>comment: </strong>
                        <p class="comment">
                            {{ comment.content }} 
                        </p>
              
                        <!-- <div v-if="updateToggle">
                            <strong>comment: </strong>
                            <input type="text" class="form-control"  v-model.trim="newContent" :placeholder="comment.content">
                        </div>
                        <div v-else>
                            <strong>comment: </strong>
                            <p class="comment">
                                {{ comment.content }} 
                            </p>
                        </div> -->
                        <div class="comment-btn">
                        <template v-if="userStore.loginUser != null && (userStore.loginUser.userId == comment.userId) ">
                            <!-- <button v-if="(userStore.loginUser.userId == comment.userId) && !updateToggle"  type="button" class="btn btn-outline-primary" @click="updateToggle = !updateToggle" >수정</button> -->
                            <v-dialog width="500">
                                <template v-slot:activator="{ props }">
                                    <v-btn v-bind="props" text="수정"> </v-btn>
                                </template>

                                <template v-slot:default="{ isActive }">
                                    <v-card title="댓글 수정">
                                    <v-card-text>
                                        <v-text-field
                                            :placeholder="comment.content"
                                            :v-model="newContent"
                                            type="text"
                                            ></v-text-field>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                        text="수정완료"
                                        @click="updateComment"
                                        ></v-btn>
                                        <v-btn
                                        text="취소"
                                        @click="isActive.value = false"
                                        ></v-btn>
                                    </v-card-actions>
                                    </v-card>
                                </template>
                            </v-dialog>


                            <!-- <button v-if="(userStore.loginUser.userId == comment.userId) && updateToggle"  type="button" class="btn btn-outline-primary" @click="updateComment" >수정완료</button> -->
                            <!-- <button  v-if="(userStore.loginUser.userId == comment.userId) && !updateToggle" type="button" class="btn btn-outline-danger"  @click="deleteComment(comment.commentId)">삭제</button> -->
                            <button  v-if="userStore.loginUser.userId == comment.userId" type="button" class="btn btn-outline-danger"  @click="deleteComment(comment.commentId)">삭제</button>
                        </template>
                        </div>
                        <div class="comment-date"><strong>date</strong>{{ comment.writeDate }}  </div>
                    </div>
                </div>


                
                <!-- <div v-for="comment in diaryStore.comments" class="comment-box">
                    <div class="comment-line">
                        {{comment.userId}} : {{ comment.content }}
                        <div class="comment-btn">
                            <button v-if="(userStore.loginUser.userId == comment.userId) && !updateToggle"  type="button" class="btn btn-outline-primary" @click="updateToggle = !updateToggle" >수정</button>
                            <button v-if="(userStore.loginUser.userId == comment.userId) && updateToggle"  type="button" class="btn btn-outline-primary" @click="updateReview" >수정완료</button>
                            <button  v-if="(userStore.loginUser.userId == comment.userId) && !updateToggle" type="button" class="btn btn-outline-danger"  @click="deleteReview(comment.commentId)">삭제</button>
                        </div>
                    </div>
                </div> -->
            </template>
            <template v-if="diaryComment.length<=0">
                <div style="text-align: center;">해당 게시물에 작성된 댓글이 없습니다.</div>
            </template>

	</div>

</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted, onUpdated, computed } from 'vue'
    import { useUserStore } from '@/stores/user'
    import { useDiaryStore } from '@/stores/diary'
    import axios from 'axios'

    const diaryStore = useDiaryStore();
    const userStore = useUserStore();
    // const props = defineProps({
    // diary: Object
    // })
    // console.log(props.diary)
    const newContent = ref('')
    const route = useRoute()
    const router = useRouter()

    const diary = ref({})

    const show = ref(false)

    const diaryId = ref(route.params.diaryId)
    const updateToggle = ref(false)
    onMounted(()=>{
        diary.value = diaryStore.getOneDiary(diaryId.value)
        diaryStore.getDiaryComments(diaryId.value)
    })

  
    const newComment = ref({
        diaryId: "",
        userId: "",
        writeDate: "",
        parent_comment: 0,
        content: ""
    })

    //댓글 작성
    const createComment = function(){
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
        newComment.value.diaryId = diaryId.value
        newComment.value.userId = userStore.loginUser.userId
        newComment.value.content = newContent.value
        console.log(newComment.value)
        diaryStore.createComment(newComment.value)
        newContent.value = ""
        // console.log(newComment.value)
    }

    //댓글 수정
    const updateComment = function(){
        newComment.value.diaryId = diaryId.value
        newComment.value.userId  = userStore.loginUser.userId
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
        newComment.value.writeDate = dateString + " "+ timeString
        // newComment.value.content  = comment
        console.log(newComment.value)
        axios.put("http://localhost:8080/diary-api/diary/comment", newComment.value)
        // updateToggle.value = !updateToggle
        // router.go()
    }
    const diaryComment = computed(()=>{
     return diaryStore.comments.filter((comment) =>{
            return comment.diaryId == diaryStore.diary.diaryId
    })
})
const deleteComment = function(commentId){
        axios.delete(`http://localhost:8080/diary-api/diary/comment/${commentId}`)
        // store.reviews = diaryStore.comments.filter((review) => review.reviewNo != reviewNo)
        // emit('deleteComment', commentId)
        //page 새로고침
        router.go()
    }
const updateReview = function(){
    // newReview.value.reviewNo = props.review.reviewNo;
    // newReview.value.youtubeId  = props.review.youtubeId;
    // newReview.value.userId = loginUser.value.id;
    // console.log(newReview.content)
    // console.log(newReview.value)
    // axios.put(`http://localhost:8080/video-api/video/review/`, newReview.value)
    updateToggle.value = !updateToggle
    // router.go()
}
</script>

<style scoped>
    .container{
        width: 70%;
        margin: 20px auto;
        border: 1px solid rgb(176, 176, 176);
        -webkit-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        -moz-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        -ms-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        -o-box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
        box-shadow: 0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22);
    }
    .diray-img{
        width: 80% !important
    }
    .card-body{
        margin: 20px auto;
        text-align: center;
        padding: 10px;
    }
    .comment-line{
        margin: 5px auto;
        padding: 10px;
        border: 1px solid rgb(146, 146, 146);
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
    }
    .comment-box{
        margin: 10px;
    }

    .reviews{
    border: 1px solid rgb(226, 226, 226);
    padding: 10px;
    margin: 5px;
    border-radius: 20px;
}
 .reviews div{
    margin: 5px;
 }
 .comment-date, .comment-btn{
    text-align: end;
 }
 .comment{
    padding-top: 10px;
 }
    
</style>