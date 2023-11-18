<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear :active="isActive" color="deep-purple" height="4" indeterminate></v-progress-linear>
    </template>

    <v-img cover height="auto" :src="`../src/assets/avty_image/avty-${userStore.loginUser.avtyCode}.jpg`"></v-img>

    <v-card-item>
      <v-card-title>My AVTY: <strong>{{ infoList[userStore.loginUser.avtyCode].name }}</strong></v-card-title>

      <v-card-subtitle>
        <!-- <span class="me-1">Local Favorite</span> -->

        <!-- <v-icon color="error" icon="mdi-fire-circle" size="small"></v-icon> -->
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <!-- <v-rating :model-value="4.5" color="amber" density="compact" half-increments readonly size="small"></v-rating> -->
      </v-row>

      <!-- <div class="my-4 text-subtitle-1">
        $ • Italian, Cafe
      </div> -->
      <div v-for ="info in infoList[userStore.loginUser.avtyCode].desc" style="text-align: left !important">
          <div style="margin: 1.5em;"> {{ info }} </div>
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Your cup of tea 🎙️</v-card-title>
        
    <div class="px-4" style="margin-bottom: 2em;;">
      <v-chip-group v-model="selection" selected-class="text-deep-purple-accent-4"  style="justify-content: center;">
        <template  v-for ="song in infoList[userStore.loginUser.avtyCode].songs">
          <v-chip @click="playMusic(song),  isPlaying=!isPlaying">🎶 {{ song }}</v-chip>
        </template>  
      </v-chip-group>
    </div>

    <div class="play-box">
      <!-- <button @click="playMusic(avty), isPlaying=true"><i class="fas fa-volume-up" style="color: cornflowerblue;"></i></button>
      <button @click=" isPlaying=false"><i class="fas fa-volume-mute"  style="color: tomato;"></i></button> -->
    </div>
  <template v-if="isPlaying">
      <div class="container">
                  <YoutubeMusicPlayer
                      class="youtube-list"
                      v-for="(video, index) in youtubeStore.videos"
                      :key="video.id.videoId"
                      :video="video"
                      :index="index"
                      :current="current"
                  />
      </div>
  </template>
<!-- 
    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<script setup>
import {ref} from 'vue'
import {useUserStore} from '@/stores/user'
import { useYoutubeStore } from "@/stores/youtube";
import YoutubeMusicPlayer from "@/components/youtube/YoutubeMusicPlayer.vue";
const userStore = useUserStore()
const youtubeStore = useYoutubeStore()
const playMusic = (keyword)=>{
    console.log(keyword)
    youtubeStore.youtubeSearchByKeyword(keyword)
}
const changeBtn = function(e) {
    let btns = document.querySelectorAll(".btn");
  btns.forEach(function (btn, i) {
    if (e.currentTarget == btn) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
    console.log(e.currentTarget.value);
  }

const isPlaying = ref(false)

const infoList = ref( [
  {
    name: 'ENJ',
    desc: [
      "계획 세우는 것🗓️을 좋아하는 사람이에요.",
      "운동하기로 마음 먹은 날에 계획을 세워 바로 실천할 수 있는 운동이 어울려요.",
      "추천하는 운동은 러닝과 헬스🏃🏻‍♂️에요!",
    ],
    songs:['Baddie - IVE(아이브)' , 'Hype Boy - NewJeans(뉴진스)', 'Perfect Night - 르세라핌']
  },
  {
    name: 'ENP',
    desc: [
      "가장 활발한 유형으로 일은 잘 벌이지만 마무리가 약해서 팀 플레이 운동이 어울려요.",
      "사람들과 팀을 이루고 루틴을 지켜하는 운동이 잘 어울려요.",
      "추천하는 운동은 축구와 농구🏀에요!",
    ],
    songs: ['음악의 신 - 세븐틴(SEVENTEEN)', 'REALLY REALLY - 위너(WINNER)', '깡 - 비(RAIN)']
  },
  {
    name: 'ESJ',
    desc: [
      "긍정적인 에너지와 사람들과 어울리는 것을 좋아하는 사람이에요.",
      "목적 의식을 중요하게 생각하는 유형으로 도전적인 운동이 잘 어울려요.",
      "추천하는 운동은 승마🏇🏻, 골프⛳ 그리고 크로스핏이에요!",
    ],
    songs:['Seven(feat.Latto) - 정국', 'Dynamite - BTS(방탄소년단)', '거짓말 - 빅뱅']
  },
  {
    name: 'ESP',
    desc: [
      "도전 욕구가 매우 강하고 사람들과 경쟁하며 스릴을 즐기는 사람이에요.",
      "신나는 음악에 맞춰 자신을 드러내는 운동이 어울려요.",
      "추천하는 운동은 복싱🥊, 폴댄스, 에어로빅이에요!",
    ],
    songs:['챔피언 - 싸이(PSY)', '순정 - 코요태', '피땀눈물 - BTS(방탄소년단)']
  },
  {
    name: 'INJ',
    desc: [
      "혼자서 생각 정리하는 것을 좋아하는 유형으로 수련을 통해 마음의 균형을 찾고<br>자기 몸에 대해 알아볼 수 있는 운동이 어울려요.",
      "추천하는 운동은 요가🧘🏻‍♀️ 에요!",
    ],
    songs: ['그라데이션 - 10CM', '너의 모든 순간(Every moment of you) - 성시경', '끝사랑 - 김범수']
  },
  {
    name: 'INP',
    desc: [
      "스트레스에 취약하고 감정 기복이 심한 사람👧🏻이에요.",
      "강사와 호흡을 맞추며 몸의 균형⚖️을 찾기 좋은 운동이 어울려요.",
      "추천하는 운동은 필라테스에요!",
    ],
    songs:['사람 Pt.2 (feat.아이유) - Agust D' , '다음 생(Re-Birth) - B.I(비아이)','Kiss me more - Doja cat']
  },
  {
    name: 'ISJ',
    desc: [
      "즉흥적인 것을 싫어하고, 계획을 세우는 규칙적인 사람이에요.",
      "개인적인 성향이 강한 유형으로 팀플레이 스포츠보다 개인 종목이 더 어울려요.",
      "추천하는 운동은 수영🏊🏻‍♂️ 이에요!",
    ],
    songs:['나의 별에게 - 수영(SOOYOUNG)','연애소설(Love Story) - 에픽하이', '힘내 - 소녀시대']
  },
  {
    name: 'ISP',
    desc: [
      "한 가지에 쉽게 질리는 편이지만 위기 대처 능력에 강한 사람이에요.",
      "혼자만의 시간을 가지는 것을 중요하게 생각해요.",
      "추천하는 운동은 서핑🏄🏻‍♂️, 등산🌄이에요.",
    ],
    songs:['다시 여기 바닷가 - 싹쓰리(유두래곤, 린다G, 비룡)', '합정역 5번출구 - 유산슬', '우리의 꿈 - 코요태']
  },
]);


</script>

<style scoped>
</style>