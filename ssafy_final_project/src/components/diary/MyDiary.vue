<template>
    <!-- <v-card
      class="mx-auto"
      max-width="344"
    > -->
    <v-card
      class="mx-auto"
      width="300"
    >
      <v-img
        :src="`../src/assets/diary_image/${diary.userId}/${diary.saveImage}`"
        height="200px"
        cover
      ></v-img>
  
      <v-card-title>
        {{ diary.title }}
      </v-card-title>
  
      <v-card-subtitle>
        {{ diary.userId }}
      </v-card-subtitle>
  
      <v-card-subtitle>
        {{ diary.createDate }}
      </v-card-subtitle>
  
      <v-card-actions>
        <v-btn
          color="orange-lighten-2"
          variant="text"
        >
          Explore
        </v-btn>
  
        <v-spacer></v-spacer>
  
        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        ></v-btn>
      </v-card-actions>
  
      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>
  
          <v-card-text>
            {{ diary.content }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </template>

<script setup>
import {useRoute, useRouter} from 'vue-router'
import {ref, onMounted} from 'vue'
import {useUserStore} from '@/stores/user'

const props = defineProps({
  diary: Object
})

const route = useRoute()

const show = ref(false)

const store = useUserStore()
const userId = ref(route.params.userId)

onMounted (()=>{

})
</script>

<style scoped>

</style>