<template>
  <div>
    <div class="home">
      <div class="home-content">
        <div class="home-desc">
          <span class="avty-test-underline">AVTY 테스트</span>
          <span>하고,</span>
          <br>
          <span>하루를 기록해보세요</span>
        </div>

        <div class="quiz-container">
          <div class="chevron"></div>
          <div class="chevron"></div>
          <div class="chevron"></div>
        </div>

        <div class="home-img-box" v-show="show">
          <!-- <img src="@/assets/home-quiz.png" /> -->
          <template v-if="userStore.loginUser != null">
            <RouterLink to="/quiz"> <img src="@/assets/home-quiz.png" /></RouterLink>
          </template>
          <template v-else>
            <RouterLink to="/login"> <img src="@/assets/home-quiz.png" /></RouterLink>
          </template>
        </div>

      </div>
      <div class="weather-content">
        <WeatherForecast class="weather-content" />
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherForecast from '@/components/weather/WeatherForecast.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()

const show = ref(false)

setTimeout(() => {
  show.value = true
}, 1500)

</script>

<style scoped>

* {
  padding: 0;
  margin: 0;
}

.home {
  min-height: 80vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  margin: auto;
}

.home-content {
  width: 70%;
  font-size: 3em;
  text-align: start;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
}

.home-desc {
  padding-top: 2em;
  font-weight: 600;
}

.weather-content {
  padding-top: 3em;
}

.avty-test-underline {
  background: linear-gradient(to top, #EBE3D5 20%, transparent 30%);
}

span {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
}

span:nth-child(1) {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(2) {
  animation: fade-in 0.8s 0.2s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(3) {
  animation: fade-in 0.8s 0.3s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

span:nth-child(4) {
  animation: fade-in 0.8s 0.4s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

@keyframes scale {
  100% {
    transform: scale(1);
  }
}

@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

@keyframes img-fade-in {
  from {
    opacity: 0;
    filter: blur(1px);
  }

  to {
    opacity: 1;
    filter: blur(0);
  }
}

@-webkit-keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}

.quiz-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2.3em;
}

.chevron {
  position: absolute;
  width: 2.1rem;
  height: 0.48rem;
  opacity: 0;
  transform: scale(0.3);
  animation: move-chevron 3s ease-out infinite;
}

.chevron:first-child {
  animation: move-chevron 3s ease-out 1s infinite;
}

.chevron:nth-child(2) {
  animation: move-chevron 3s ease-out 2s infinite;
}

.chevron:before,
.chevron:after {
  content: "";
  position: absolute;
  top: 0;
  height: 100%;
  width: 50%;
  background: #EBE3D5;
}

.chevron:before {
  left: 0;
  transform: skewY(30deg);
}

.chevron:after {
  right: 0;
  width: 50%;
  transform: skewY(-30deg);
}

@keyframes move-chevron {
  25% {
    opacity: 1;
  }

  33.3% {
    opacity: 1;
    transform: translateY(2.28rem);
  }

  66.6% {
    opacity: 1;
    transform: translateY(3.12rem);
  }

  100% {
    opacity: 0;
    transform: translateY(4.8rem) scale(0.5);
  }
}

.home-img-box {
  text-align: start;
  padding-top: 1.5em;
  width: 10em;
  animation: img-fade-in 2.5s forwards cubic-bezier(0.5, 1, 0.89, 1);
}

</style>
