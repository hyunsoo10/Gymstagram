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
          <!-- <figure class="snip1445">
            <figcaption>
              <div>
                <div class="quiz">
                  <template v-if="userStore.loginUser != null">
                    <RouterLink to="/quiz">QUIZ START</RouterLink>
                  </template>
                  <template v-else>
                    <RouterLink to="/login">QUIZ START</RouterLink>
                  </template>
                </div>
              </div>
            </figcaption>
            <template v-if="userStore.loginUser != null">
              <RouterLink to="/quiz">quiz</RouterLink>
            </template>
            <template v-else>
              <RouterLink to="/login"></RouterLink>
            </template>
          </figure> -->
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
/* @import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap"); */

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
  }

  to {
    opacity: 1;
    ;
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


#home-quiz-img {
  width: 10em;
  height: 10em;
  animation: img-fade-in 2.5s forwards cubic-bezier(0.5, 1, 0.89, 1);
  /* padding-top: 2.5em;; */
}

.home-img-box {
  text-align: center;
  padding-top: 1.5em;
  width: 15em;

}


/* quiz 바로가기 화면 */
.snip1445 {
  font-family: 'Raleway', Arial, sans-serif;
  position: relative;
  overflow: hidden;
  margin: 1em;
  min-width: 230px;
  max-width: 600px;
  width: 100%;
  color: #ffffff;
  text-align: start;
  font-size: 16px;
  background-color: #00000000;
}

.snip1445 *,
.snip1445 *:before,
.snip1445 *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-transition: all 0.55s ease;
  transition: all 0.55s ease;
}

.snip1445 img {
  max-width: 80%;
  backface-visibility: hidden;
  vertical-align: top;
}

.snip1445 figcaption {
  position: absolute;
  bottom: 100px;
  left: 370px;
  padding: 5px 10px 10px;
}

.snip1445 figcaption:before,
.snip1445 figcaption:after {
  height: 2px;
  width: 400px;
  position: absolute;
  content: '';
  background-color: #776B5D;
}

.snip1445 figcaption:before {
  top: 0;
  left: 0;
  -webkit-transform: translateX(100%);
  transform: translateX(100%);
}

.snip1445 figcaption:after {
  bottom: 0;
  right: 0;
  -webkit-transform: translateX(-150%);
  transform: translateX(-150%);
}

.snip1445 figcaption div:before,
.snip1445 figcaption div:after {
  width: 2px;
  height: 300px;
  position: absolute;
  content: '';
  background-color: #776B5D;
}

.snip1445 figcaption div:before {
  top: 0;
  left: 0;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
}

.snip1445 figcaption div:after {
  bottom: 0;
  right: 0;
  -webkit-transform: translateY(-120%);
  transform: translateY(-120%);
}

.snip1445 a {
  text-decoration: none;
  color: #776B5D;
}

.snip1445:hover img,
.snip1445.hover img {
  zoom: 1;
  filter: alpha(opacity=50);
  -webkit-opacity: 0.5;
  opacity: 0.5;
}

.snip1445:hover figcaption:before,
.snip1445.hover figcaption:before,
.snip1445:hover figcaption:after,
.snip1445.hover figcaption:after,
.snip1445:hover figcaption div:before,
.snip1445.hover figcaption div:before,
.snip1445:hover figcaption div:after,
.snip1445.hover figcaption div:after {
  -webkit-transform: translate(0, 0);
  transform: translate(0, 0);
}

.snip1445:hover figcaption:before,
.snip1445.hover figcaption:before,
.snip1445:hover figcaption:after,
.snip1445.hover figcaption:after {
  -webkit-transition-delay: 0.15s;
  transition-delay: 0.15s;
}
</style>
