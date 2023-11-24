import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/user/QuizView.vue'
import DiaryView from '@/views/diary/DiaryView.vue'
import LoginView from '@/views/user/LoginView.vue'
import MypageView from '@/views/diary/MypageView.vue'
import MyDiary from '@/components/diary/mydiary/MyDiary.vue'
import SignupView from '@/views/user/SignupView.vue'
import DiaryDetailView from '@/views/diary/DiaryDetailView.vue'
import UpdateView from '@/views/user/UpdateView.vue'
import DiaryCreateView from '@/components/diary/DiaryCreate.vue'
import DiaryUpdate from '@/components/diary/diaryUpdate.vue'
import KakaoLoginView from '@/views/user/KakaoLoginView.vue'


import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: QuizView,
      beforeEnter: (to, from) => {
        //로그인 안했으면 못들어간다
        const userStore = useUserStore();
        if (userStore.loginUser == null) {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView,
      beforeEnter: (to, from) => {
        //로그인 했으면 못들어간다
        const userStore = useUserStore();
        if (userStore.loginUser != null) {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        //로그인 했으면 못들어간다
        const userStore = useUserStore();
        if (userStore.loginUser != null) {
          return { name: 'home' }
        }
      }
    },
    {
      path: '/update/:userId',
      name: 'update',
      component: UpdateView
    },
    {
      path: '/diary',
      name: 'diary',
      component: DiaryView,
    },
    {
      path: '/create',
      name: 'diaryCreate',
      component: DiaryCreateView,
    },
    {
      path: '/detail/:diaryId',
      name: 'diaryDetail',
      component: DiaryDetailView,
    },
    {
      path: '/update/:diaryId',
      name: 'diaryUpdate',
      component: DiaryUpdate,

    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
      beforeEnter: (to, from) => {
        //로그인 안했으면 못들어간다
        const userStore = useUserStore();
        if (userStore.loginUser == null) {
          return { name: 'home' }
        }
      },
      children: [{
        path: ":userId",
        name: "mydiary",
        component: MyDiary,
        beforeEnter: (to, from) => {
          //본인 my page 아니면 못들어간다
          const userStore = useUserStore();
          if (userStore.loginUser.userId != to.params["userId"]) {
            return { name: 'home' }
          }
        },
      }
      ]
    },
    {
      path: '/kakaoLogin',
      name: 'kakaoLogin',
      query: {
        code: ''
      },
      component: KakaoLoginView,
    },

  ]
})

export default router
