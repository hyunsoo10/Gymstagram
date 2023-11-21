<template>
  <div>
    <div class="home-content">
      <span>AVTY</span>
      <span>&nbsp;테스트하고,</span>
      <br>
      <span>하루를 기록해보세요</span>
    </div>
    <WeatherForecast />
    <!--Brian Tracy-->
  </div>
</template>

<script setup>
import HomeView2 from '@/views/HomeView2.vue'
import WeatherForecast from '@/components/weather/WeatherForecast.vue'
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
* {
  padding: 0;
  margin: 0;
}

body {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
}

.home-content {
  font-weight: 900;
  font-size: 2.5em;
  max-width: 40ch;
  text-align: start;
  transform: scale(0.94);
  animation: scale 3s forwards cubic-bezier(0.5, 1, 0.89, 1);
}

@keyframes scale {
  100% {
    transform: scale(1);
  }
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


@keyframes fade-in {
  100% {
    opacity: 1;
    filter: blur(0);
  }
}
</style>
