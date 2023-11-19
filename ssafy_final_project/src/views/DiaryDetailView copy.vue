<template>
    <div class="container">
        <v-btn
        class="ma-2"
        color="grey-darken-4"
        @click.prevent="back"
      >
        <v-icon
          start
          icon="mdi-arrow-left"
        ></v-icon>
        Back
      </v-btn>
        <!-- <RouterLink to="/diary" class="back-icon" > <v-icon icon="mdi-chevron-left" />BACK</RouterLink> -->
        <!-- <a class="back-icon" @click.prevent="back" > <v-icon icon="mdi-chevron-left" />BACK</a> -->
			<div class="card-body">
                <h3 class="card-title">{{diaryStore.diary.title}}</h3>
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
            <form v-if ="userStore.loginUser" class="row gx-3 gy-2 align-items-end justify-content-center" id="commentForm" >
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
					<input type="text" class="form-control" id="floatingInputValue"   v-model.trim="newContent"  placeholder="댓글을 작성해주세요" @keyup.enter="createComment"/>
				</div>
				
				<div class="col-auto"></div>
				<div class="col-auto">
					<button type="button" @click="createComment" class="btn btn-outline-success"><i class="far fa-paper-plane" style="color: #7CB342;"></i></button>
				</div>
			</form>
            <!-- <template v-if="diaryStore.comments.length>0"> -->
            <template v-if="diaryComment.length>0">

            <div v-for="comment in diaryStore.comments" class="comment-box">
                    <div class="reviews d-flex flex-column">
                        <div class="writer">
                            <strong>작성자: </strong>{{ comment.userId }}
                        </div>
                        <p class="comment">
                            {{ comment.content }} 
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


                            <!-- <button v-if="(userStore.loginUser.userId == comment.userId) && updateToggle"  type="button" class="btn btn-outline-primary" @click="updateComment" >수정완료</button> -->
                            <v-btn  color="red"  v-if="userStore.loginUser.userId == comment.userId" type="button" class="btn btn-outline-danger"  @click="deleteComment(comment.commentId)">삭제</v-btn >
                        </template>
                        </div>
                        <div class="comment-date">{{ comment.writeDate }}  </div>
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
            <div style="text-align: center; margin: 50px auto">해당 게시물에 작성된 댓글이 없습니다. 첫 번째 댓글을 남겨보세요!</div>
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
    const updateContent = ref('')
    const route = useRoute()
    const router = useRouter()

    const diary = ref({})

    const show = ref(false)

    const diaryId = ref(route.params.diaryId)
    const updateToggle = ref(false)
    onMounted(()=>{
        diaryStore.getOneDiary(diaryId.value)
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
        router.go()
    }

    //댓글 수정
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
        axios.put("http://localhost:8080/diary-api/diary/comment", com)
        // isActive.value = false
        // router.go()
    }
    const diaryComment = computed(()=>{
     return diaryStore.comments.filter((comment) =>{
            return comment.diaryId == diaryStore.diary.diaryId
        })
    })
    const deleteComment = function(commentId){
            var flag = confirm("정말로 댓글을 삭제하시겠습니까?")
            console.log(flag)
            if(flag){
                axios.delete(`http://localhost:8080/diary-api/diary/comment/${commentId}`)
                router.go()
            }
            // store.reviews = diaryStore.comments.filter((review) => review.reviewNo != reviewNo)
            // emit('deleteComment', commentId)
            //page 새로고침
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

    const back = () =>{router.go(-1)}
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
        width: 80% !important;
        border-radius: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
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
    .writer{
        font-size: 1rem;
    }
    .comment{
        padding-top: 10px;
        font-size: 0.9rem;
    }
    .back-icon{
        margin-top: 10px;
        color: black;
        font-size: 2rem;
        display: flex;
    
    }
    .container a {
        text-decoration: none;
    }
</style>