<template>
<div>
  <body>
    gg
  </body>
</div>
</template>

<script setup>

</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat&display=swap");
* {
  padding: 0;
  margin: 0;
}


div {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@keyframes scale {
  100% {
    transform: scale(1);
  }
}

body {
  display: inline-block;
  opacity: 0;
  filter: blur(4px);
}

body {
  animation: fade-in 0.8s 0.1s forwards cubic-bezier(0.11, 0, 0.5, 0);
}

</style>
