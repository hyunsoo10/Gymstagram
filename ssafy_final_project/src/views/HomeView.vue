<template>
  <div>
    <WeatherForecast />
    <div class=home-content>
    <p>
      <span style="font-size: 0.8em;">Enjoy</span>
      <span class="light">GYM</span>
      <span>WITH</span>
      <span class="light">GYM STAGRAM</span>
    </p>
  </div>
  </div>
</template>

<script setup>
import WeatherForecast from '@/components/weather/WeatherForecast.vue'
</script>

<style scoped>
.home-content {
  width: 80%;
  margin: 30px auto;
  /* text-align: center; */
  background: #776B5D;
  padding: 2rem;
  /* height: 100vh; */
}


p {
  font-family: "Arial";
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 5rem;
  line-height: 0.75;
  margin-left: 30px;
}

span {
  display: block;
}

span:not(.light) {
  opacity: 0;
  animation: flashText 0.5s ease-out alternate infinite;
}

span.light {
  position: relative;
  display: inline-block;
}

span.light:before {
  position: absolute;
  left: 0;
  top: -10%;
  width: 100%;
  height: 120%;
  background: #fff;
  filter: blur(10px);
  content: "";
  opacity: 0;
  animation: flash 0.7s ease-out alternate infinite;
}

@keyframes flash {
  to {
    opacity: 1;
  }
}

@keyframes flashText {
  to {
    opacity: 0.15;
  }
}
</style>
