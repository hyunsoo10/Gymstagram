import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import QuizView from '@/views/QuizView.vue'
import DiaryView from '@/views/DiaryView.vue'
import LoginView from '@/views/LoginView.vue'
import MypageView from '@/views/MypageView.vue'
import MyDiary from '@/components/diary/MyDiary.vue'
import SignupView from '@/views/SignupView.vue'
import DiaryDetailView from '@/views/DiaryDetailView.vue'
import UpdateView from '@/views/UpdateView.vue'

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
      component: QuizView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      beforeEnter: (to, from) => {
        if (false) {
          console.log("이미 로그인한 상태입니다.")
          return { name: 'home' }
        }
      }
    },
    {
      path: '/update',
      name: 'update',
      component: UpdateView
    },
    {
      path: '/diary',
      name: 'diary',
      component: DiaryView,
      // children: [{
      //   path: ":diaryId",
      //   name: "diaryDetail",
      //   component: DiaryDetailView
      // }
      // ]
    },
    {
      path: '/detail/:diaryId',
      name: 'diaryDetail',
      component: DiaryDetailView,
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MypageView,
      children: [{
        path: ":userId",
        name: "mydiary",
        component: MyDiary
      }
      ]
    },
  ]
})

export default router
