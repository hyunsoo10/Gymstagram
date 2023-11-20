import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useDiaryStore } from '@/stores/diary';
import axios from 'axios';
import Comment from '@/components/diary/comment/Comment.vue';

export default (() => {
const __VLS_setup = async () => {
const diaryStore = useDiaryStore();
const userStore = useUserStore();
// const props = defineProps({
// diary: Object
// })
// console.log(props.diary)
const newContent = ref('');
const updateContent = ref('');
const route = useRoute();
const router = useRouter();

const diary = ref({});
const show = ref(false);

const diaryId = ref(route.params.diaryId);
const updateToggle = ref(false);

const likeFlag = ref(false);
const tempFlag = likeFlag.value;

const likeInfo = ref(
{
userId: '',
diaryId: ''
}
);

const like = () => {
// console.log('like')
// console.log(userStore.loginUser.userId)
// console.log(diaryId.value)
likeInfo.value.userId = userStore.loginUser.userId;
likeInfo.value.diaryId = diaryId.value;
// diaryStore.diary.likeCount++;
diaryStore.like(likeInfo.value);
likeInfo.value.userId = '';
likeInfo.value.diaryId = '';
// router.go()
};
const unlike = () => {
// console.log('unlike')
// console.log(userStore.loginUser.userId)
// console.log(diaryId.value)
likeInfo.value.userId = userStore.loginUser.userId;
likeInfo.value.diaryId = diaryId.value;
// diaryStore.diary.likeCount--;
diaryStore.unlike(likeInfo.value);
likeInfo.value.userId = '';
likeInfo.value.diaryId = '';
// router.go()
};
onMounted(() => {
diaryStore.getAllLike();
});
const showLike = () => {
// diaryStore.getDiaryLike(diaryId.value)
// console.log(diaryId.value)
// console.log(diaryStore.like/DiaryInfo)
// console.log(diaryStore.likeCount)
};

// const likeCount = ref()
// const getDiaryLike = computed(()=>{
//     return (diaryId) => likeCount.value = likeDiaryInfo.value.filter((diary) => diary.diaryId === diaryId).length
// })
onMounted(() => {
diaryStore.getOneDiary(diaryId.value);
diaryStore.getDiaryComments(diaryId.value);

axios({
url: `http://localhost:8080/diary-api/diary/like/${userStore.loginUser.userId}/${diaryId.value}`,
method: 'GET',
headers: {
'access-token': sessionStorage.getItem('access-token')
}
})
.then((res) => {
// likeDiaryInfo.value = res.data
// console.log(likeDiaryInfo.value)
// console.log(res.data)
if (res.data > 0) {
likeFlag.value = true;
}
});
});


const newComment = ref({
diaryId: "",
userId: "",
writeDate: "",
parent_comment: 0,
content: ""
});


//댓글 작성
const createComment = function () {
var today = new Date();

var year = today.getFullYear();
var month = ('0' + (today.getMonth() + 1)).slice(-2);
var day = ('0' + today.getDate()).slice(-2);

var hours = ('0' + today.getHours()).slice(-2);
var minutes = ('0' + today.getMinutes()).slice(-2);
var seconds = ('0' + today.getSeconds()).slice(-2);

var dateString = year + '-' + month + '-' + day;
var timeString = hours + ':' + minutes + ':' + seconds;

newComment.value.writeDate = dateString + " " + timeString;
newComment.value.diaryId = diaryId.value;
newComment.value.userId = userStore.loginUser.userId;
newComment.value.content = newContent.value;
console.log(newComment.value);
diaryStore.createComment(newComment.value);
newContent.value = "";
// console.log(newComment.value)
router.go();
};

//댓글 수정
const updateComment = function (com) {
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

var dateString = year + '-' + month + '-' + day;
var timeString = hours + ':' + minutes + ':' + seconds;
com.updateDate = dateString + " " + timeString;
com.content = updateContent.value;
console.log(com);
axios.put("http://localhost:8080/diary-api/diary/comment", com, {
headers: {
'access-token': sessionStorage.getItem('access-token')
}
});
// isActive.value = false
// router.go()
};
const diaryComment = computed(() => {
return diaryStore.comments.filter((comment) => {
return comment.diaryId == diaryStore.diary.diaryId;
});
});
const deleteComment = function (commentId) {
var flag = confirm("정말로 댓글을 삭제하시겠습니까?");
console.log(flag);
if (flag) {
axios.delete(`http://localhost:8080/diary-api/diary/comment/${commentId}`, {
headers: {
'access-token': sessionStorage.getItem('access-token')
}
});
router.go();
}
// store.reviews = diaryStore.comments.filter((review) => review.reviewNo != reviewNo)
// emit('deleteComment', commentId)
//page 새로고침
};

const back = () => { router.go(-1); };
const __VLS_publicComponent = (await import('vue')).defineComponent({
setup() {
return {};
},
});

const __VLS_componentsOption = {};

let __VLS_name!: 'DiaryDetailView';
function __VLS_template() {
let __VLS_ctx!: InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_publicComponent, new () => {}>> & InstanceType<import('./__VLS_types.js').PickNotAny<typeof __VLS_internalComponent, new () => {}>> & {};
/* Components */
let __VLS_localComponents!: NonNullable<typeof __VLS_internalComponent extends { components: infer C; } ? C : {}> & typeof __VLS_componentsOption & typeof __VLS_ctx;
let __VLS_otherComponents!: typeof __VLS_localComponents & import('./__VLS_types.js').GlobalComponents;
let __VLS_own!: import('./__VLS_types.js').SelfComponent<typeof __VLS_name, typeof __VLS_internalComponent & typeof __VLS_publicComponent & (new () => { $slots: typeof __VLS_slots; }) >;
let __VLS_components!: typeof __VLS_otherComponents & Omit<typeof __VLS_own, keyof typeof __VLS_otherComponents>;
/* Style Scoped */
type __VLS_StyleScopedClasses = {} &
{ 'container'?: boolean; } &
{ 'diray-img'?: boolean; } &
{ 'card-body'?: boolean; } &
{ 'comment-line'?: boolean; } &
{ 'reviews'?: boolean; } &
{ 'reviews'?: boolean; } &
{ 'comment-btn'?: boolean; } &
{ 'writer'?: boolean; } &
{ 'comment'?: boolean; } &
{ 'back-icon'?: boolean; } &
{ 'container'?: boolean; };
let __VLS_styleScopedClasses!: __VLS_StyleScopedClasses | keyof __VLS_StyleScopedClasses | (keyof __VLS_StyleScopedClasses)[];
/* CSS variable injection */
/* CSS variable injection end */
let __VLS_templateComponents!: {} &
import('./__VLS_types.js').WithComponent<'VBtn', typeof __VLS_components, 'VBtn', 'vBtn', 'v-btn'> &
import('./__VLS_types.js').WithComponent<'VIcon', typeof __VLS_components, 'VIcon', 'vIcon', 'v-icon'> &
import('./__VLS_types.js').WithComponent<'Comment', typeof __VLS_components, 'Comment'>;
__VLS_components.VBtn; __VLS_components.VBtn; __VLS_components.vBtn; __VLS_components.vBtn; __VLS_components['v-btn']; __VLS_components['v-btn'];
// @ts-ignore
[VBtn, VBtn,];
__VLS_components.VIcon; __VLS_components.VIcon; __VLS_components.vIcon; __VLS_components.vIcon; __VLS_components['v-icon']; __VLS_components['v-icon'];
// @ts-ignore
[VIcon, VIcon,];
__VLS_components.Comment;
// @ts-ignore
[Comment,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("container"), };
{
__VLS_templateComponents.VBtn;
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.VBtn>) = { class: ("ma-2"), color: ("grey-darken-4"), };
const __VLS_0 = new __VLS_templateComponents.VBtn({ class: ("ma-2"), color: ("grey-darken-4"), });
const __VLS_1 = __VLS_templateComponents.VBtn({ class: ("ma-2"), color: ("grey-darken-4"), });
let __VLS_2!: import('./__VLS_types.js').PickNotAny<typeof __VLS_0, typeof __VLS_1>;
type __VLS_3 = import('./__VLS_types.js').InstanceProps<typeof __VLS_2, typeof __VLS_templateComponents.VBtn>;
const __VLS_4: import('./__VLS_types.js').EventObject<typeof __VLS_2, 'click', typeof __VLS_templateComponents.VBtn, __VLS_3['onClick']> = {
click: (__VLS_ctx.back)
};
// @ts-ignore
[back,];
{
__VLS_templateComponents.VIcon;
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.VIcon>) = { start: (true), icon: ("mdi-arrow-left"), };
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("card-body"), };
{
({} as JSX.IntrinsicElements).h3;
({} as JSX.IntrinsicElements).h3;
(__VLS_x as JSX.IntrinsicElements)['h3'] = { class: ("card-title"), };
(__VLS_ctx.diaryStore.diary.title);
// @ts-ignore
[diaryStore,];
}
{
({} as JSX.IntrinsicElements).img;
(__VLS_x as JSX.IntrinsicElements)['img'] = { class: ("card-img-top diray-img"), width: ("500"), height: (""), src: ((`../src/assets/diary_image/${__VLS_ctx.diaryStore.diary.userId}/${__VLS_ctx.diaryStore.diary.saveImage}`)), };
// @ts-ignore
[diaryStore, diaryStore,];
}
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = { class: ("card-text"), style: ({}), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = {};
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fas fa-user-circle"), style: ({}), };
}
(__VLS_ctx.diaryStore.diary.userId);
// @ts-ignore
[diaryStore,];
}
{
({} as JSX.IntrinsicElements).small;
({} as JSX.IntrinsicElements).small;
(__VLS_x as JSX.IntrinsicElements)['small'] = { class: ("text-body-secondary"), };
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fas fa-eye"), style: ({}), };
}
{
({} as JSX.IntrinsicElements).strong;
({} as JSX.IntrinsicElements).strong;
(__VLS_x as JSX.IntrinsicElements)['strong'] = {};
(__VLS_ctx.diaryStore.diary.viewCount);
// @ts-ignore
[diaryStore,];
}
}
{
({} as JSX.IntrinsicElements).small;
({} as JSX.IntrinsicElements).small;
(__VLS_x as JSX.IntrinsicElements)['small'] = { class: ("text-body-secondary"), };
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fa-regular fa-thumbs-up"), style: ({}), };
}
{
({} as JSX.IntrinsicElements).strong;
({} as JSX.IntrinsicElements).strong;
(__VLS_x as JSX.IntrinsicElements)['strong'] = {};
(__VLS_ctx.diaryStore.likeCount(__VLS_ctx.diaryId));
// @ts-ignore
[diaryStore, diaryId,];
}
}
{
({} as JSX.IntrinsicElements).small;
({} as JSX.IntrinsicElements).small;
(__VLS_x as JSX.IntrinsicElements)['small'] = { class: ("text-body-secondary"), };
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fa-regular fa-thumbs-up"), style: ({}), };
}
{
({} as JSX.IntrinsicElements).strong;
({} as JSX.IntrinsicElements).strong;
(__VLS_x as JSX.IntrinsicElements)['strong'] = {};
(__VLS_ctx.diaryStore.);
// @ts-ignore
[diaryStore,];
}
}
{
({} as JSX.IntrinsicElements).small;
({} as JSX.IntrinsicElements).small;
(__VLS_x as JSX.IntrinsicElements)['small'] = { class: ("card-text"), };
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fas fa-calendar-alt"), style: ({}), };
}
(__VLS_ctx.diaryStore.diary.createDate);
// @ts-ignore
[diaryStore,];
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { style: ({}), };
(__VLS_ctx.diaryStore.diary.content);
// @ts-ignore
[diaryStore,];
}
if (__VLS_ctx.likeFlag) {
// @ts-ignore
[likeFlag,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { style: ({}), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = {};
type __VLS_5 = JSX.IntrinsicElements['button'];
const __VLS_6: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_5['onClick']> = {
click: $event => {
__VLS_ctx.unlike(), __VLS_ctx.likeFlag = !__VLS_ctx.likeFlag;
}
};
// @ts-ignore
[unlike, likeFlag, likeFlag,];
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fa-solid fa-heart"), style: ({}), };
}
}
}
}
else {
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { style: ({}), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = {};
type __VLS_7 = JSX.IntrinsicElements['button'];
const __VLS_8: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_7['onClick']> = {
click: $event => {
__VLS_ctx.like(), __VLS_ctx.likeFlag = !__VLS_ctx.likeFlag;
}
};
// @ts-ignore
[like, likeFlag, likeFlag,];
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("fa-regular fa-heart"), style: ({}), };
}
}
}
}
}
{
({} as JSX.IntrinsicElements).p;
({} as JSX.IntrinsicElements).p;
(__VLS_x as JSX.IntrinsicElements)['p'] = {};
(await import('./__VLS_types.js')).directiveFunction(__VLS_ctx.vShow)(!__VLS_ctx.userStore.loginUser);
// @ts-ignore
[userStore,];
}
if (__VLS_ctx.userStore.loginUser) {
// @ts-ignore
[userStore,];
{
({} as JSX.IntrinsicElements).form;
({} as JSX.IntrinsicElements).form;
(__VLS_x as JSX.IntrinsicElements)['form'] = { class: ("row gx-3 gy-2 align-items-end justify-content-center"), id: ("commentForm"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-sm-3"), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { class: ("visually-hidden"), for: ("specificSizeInputGroupUsername"), };
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("input-group"), };
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("input-group-text"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control"), id: ("specificSizeInputGroupUsername"), name: ("userId"), value: ((__VLS_ctx.userStore.loginUser.userId)), readonly: (true), };
// @ts-ignore
[userStore,];
}
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-sm-6"), };
{
({} as JSX.IntrinsicElements).label;
({} as JSX.IntrinsicElements).label;
(__VLS_x as JSX.IntrinsicElements)['label'] = { for: ("floatingInputValue"), };
}
{
({} as JSX.IntrinsicElements).input;
(__VLS_x as JSX.IntrinsicElements)['input'] = { type: ("text"), class: ("form-control"), id: ("floatingInputValue"), value: ((__VLS_ctx.newContent)), placeholder: ("댓글을 작성해주세요"), };
type __VLS_9 = JSX.IntrinsicElements['input'];
const __VLS_10: import('./__VLS_types.js').EventObject<typeof undefined, 'keyup', {}, __VLS_9['onKeyup']> = {
keyup: (__VLS_ctx.createComment)
};
// @ts-ignore
[newContent, createComment,];
}
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-auto"), };
}
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("col-auto"), };
{
({} as JSX.IntrinsicElements).button;
({} as JSX.IntrinsicElements).button;
(__VLS_x as JSX.IntrinsicElements)['button'] = { type: ("button"), class: ("btn btn-outline-success"), };
type __VLS_11 = JSX.IntrinsicElements['button'];
const __VLS_12: import('./__VLS_types.js').EventObject<typeof undefined, 'click', {}, __VLS_11['onClick']> = {
click: (__VLS_ctx.createComment)
};
// @ts-ignore
[createComment,];
{
({} as JSX.IntrinsicElements).i;
({} as JSX.IntrinsicElements).i;
(__VLS_x as JSX.IntrinsicElements)['i'] = { class: ("far fa-paper-plane"), style: ({}), };
}
}
}
}
}
if (__VLS_ctx.diaryComment.length > 0) {
// @ts-ignore
[diaryComment,];
for (const [comment] of (await import('./__VLS_types.js')).getVForSourceType(__VLS_ctx.diaryStore.comments)) {
// @ts-ignore
[diaryStore,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { class: ("comment-box"), };
if (comment.parentComment == 0) {
{
(__VLS_x as import('./__VLS_types.js').ComponentProps<typeof __VLS_templateComponents.Comment>) = { comment: ((comment)), };
}
}
}
}
}
if (__VLS_ctx.diaryComment.length <= 0) {
// @ts-ignore
[diaryComment,];
{
({} as JSX.IntrinsicElements).div;
({} as JSX.IntrinsicElements).div;
(__VLS_x as JSX.IntrinsicElements)['div'] = { style: ({}), };
}
}
}
if (typeof __VLS_styleScopedClasses === 'object' && !Array.isArray(__VLS_styleScopedClasses)) {
__VLS_styleScopedClasses['container'];
__VLS_styleScopedClasses['ma-2'];
__VLS_styleScopedClasses['card-body'];
__VLS_styleScopedClasses['card-title'];
__VLS_styleScopedClasses['card-img-top'];
__VLS_styleScopedClasses['diray-img'];
__VLS_styleScopedClasses['card-text'];
__VLS_styleScopedClasses['fas'];
__VLS_styleScopedClasses['fa-user-circle'];
__VLS_styleScopedClasses['text-body-secondary'];
__VLS_styleScopedClasses['fas'];
__VLS_styleScopedClasses['fa-eye'];
__VLS_styleScopedClasses['text-body-secondary'];
__VLS_styleScopedClasses['fa-regular'];
__VLS_styleScopedClasses['fa-thumbs-up'];
__VLS_styleScopedClasses['text-body-secondary'];
__VLS_styleScopedClasses['fa-regular'];
__VLS_styleScopedClasses['fa-thumbs-up'];
__VLS_styleScopedClasses['card-text'];
__VLS_styleScopedClasses['fas'];
__VLS_styleScopedClasses['fa-calendar-alt'];
__VLS_styleScopedClasses['fa-solid'];
__VLS_styleScopedClasses['fa-heart'];
__VLS_styleScopedClasses['fa-regular'];
__VLS_styleScopedClasses['fa-heart'];
__VLS_styleScopedClasses['row'];
__VLS_styleScopedClasses['gx-3'];
__VLS_styleScopedClasses['gy-2'];
__VLS_styleScopedClasses['align-items-end'];
__VLS_styleScopedClasses['justify-content-center'];
__VLS_styleScopedClasses['col-sm-3'];
__VLS_styleScopedClasses['visually-hidden'];
__VLS_styleScopedClasses['input-group'];
__VLS_styleScopedClasses['input-group-text'];
__VLS_styleScopedClasses['form-control'];
__VLS_styleScopedClasses['col-sm-6'];
__VLS_styleScopedClasses['form-control'];
__VLS_styleScopedClasses['col-auto'];
__VLS_styleScopedClasses['col-auto'];
__VLS_styleScopedClasses['btn'];
__VLS_styleScopedClasses['btn-outline-success'];
__VLS_styleScopedClasses['far'];
__VLS_styleScopedClasses['fa-paper-plane'];
__VLS_styleScopedClasses['comment-box'];
}
declare var __VLS_slots: {};
return __VLS_slots;
}
const __VLS_internalComponent = (await import('vue')).defineComponent({
setup() {
return {
Comment: Comment,
diaryStore: diaryStore,
userStore: userStore,
newContent: newContent,
diaryId: diaryId,
likeFlag: likeFlag,
like: like,
unlike: unlike,
createComment: createComment,
diaryComment: diaryComment,
back: back,
};
},
});
return {} as typeof __VLS_publicComponent;
};
return {} as typeof __VLS_setup extends () => Promise<infer T> ? T : never;
})({} as any);
