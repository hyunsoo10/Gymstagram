<template>
    <div class="container">
			<div class="card-body">
						<h5 class="card-title">{{diary.title}}</h5>
						<!-- <img class="card-img-top" width="600" height="800"
                            :src="`src/assets/diary_image/${diaryStore.diary.userId}/${diary.saveImage}`"/>
						<p class="card-text">{{diaryStore.userId}}</p>
						<p class="card-text">{{diaryStore.createDate}}<small
								class="text-body-secondary">조회수 : {{diaryStore.viewCnt}}</small>
						</p> -->
			</div>
			<!--로그인 안했으면 해당 문구 출력-->
			<p v-show="!isLogin">
			영상을 좋아요 하고 싶으면 로그인 하세요
			</p>
			<!--로그인 했으면 좋아요 버튼 출력-->
			<span style="font-size: 30px; "><a href="${root}/video?act=like&id=유저아이디"><i class="fa-solid fa-heart" style="color: red;"></i></a></span>
		</div>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router'
    import { ref, onMounted } from 'vue'
    import { useUserStore } from '@/stores/user'
    import { useDiaryStore } from '@/stores/diary'

    const diaryStore = useDiaryStore();
    const userStore = useUserStore();
    // const props = defineProps({
    // diary: Object
    // })
    // console.log(props.diary)
    const route = useRoute()

    const diary = ref({})

    const show = ref(false)

    const diaryId = ref(route.params.diaryId)

    onUpdated(()=>{
        diaryStore.getOneDiary(diaryId.value)
        diary.value = diaryStore.diary
    })
</script>

<style scoped>

</style>