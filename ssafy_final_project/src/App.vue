<template>
  <div>
    <TheHeaderNav />
    <RouterView />
    <TheFooter />

  </div>
</template>

<script setup>
import TheHeaderNav from '@/components/common/TheHeaderNav.vue';
import TheFooter from './components/common/TheFooter.vue';

</script>

<style scoped>
@font-face {
  font-family:'GmarketSansTTFLight';
  src: url('assets/fonts/GmarketSansTTFLight.ttf') format('truetype');
}
@font-face {
  font-family:'GmarketSansTTFBold';
  src: url('assets/fonts/GmarketSansTTFBold.ttf') format('truetype');
}
@font-face {
  font-family:'GmarketSansTTFMedium';
  src: url('assets/fonts/GmarketSansTTFMedium.ttf') format('truetype');
}
/* * {
  font-family:'GmarketSansTTFMedium' !important;
} */

/* h1 {
  font-family:'GmarketSansTTFBold';
} */
</style>