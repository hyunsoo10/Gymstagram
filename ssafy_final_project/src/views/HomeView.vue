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
      </div>
      <div class="weather-content">
        <WeatherForecast class="weather-content"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import WeatherForecast from '@/components/weather/WeatherForecast.vue'
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");

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

.home-desc{
  padding-top: 2em;
  font-weight: 600;
}

.weather-content{
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

@-webkit-keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
