import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useYoutubeStore = defineStore("youtube", () => {
  const videos = ref([]);

  const avtyMusicList = [
    "Baddie-IVE(아이브) ",
    "음악의 신-세븐틴(SEVENTEEN)",
    "Seven(feat.Latto)-정국",
    "챔피언-싸이(PSY)",
    "그라데이션-10CM",
    " 사람 Pt.2 (feat.아이유)-Agust D",
    "나의 별에게-수영(SOOYOUNG)",
    "다시 여기 바닷가-싹쓰리(유두래곤, 린다G, 비룡)"
  ]

  const youtubeSearch = function (code) {
    const URL = "https://www.googleapis.com/youtube/v3/search";
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    axios({
      url: URL,
      method: "GET",
      params: {
        key: API_KEY,
        part: "snippet",
        q: avtyMusicList[code],
        type: "video",
        maxResults: 1,
      },
    })
      .then((response) => {
        videos.value = response.data.items;
      })
      .catch(() => { });
  };
  const youtubeSearchByKeyword = function (keyword) {
    const URL = "https://www.googleapis.com/youtube/v3/search";
    const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
    axios({
      url: URL,
      method: "GET",
      params: {
        key: API_KEY,
        part: "snippet",
        q: keyword,
        type: "video",
        maxResults: 1,
      },
    })
      .then((response) => {
        videos.value = response.data.items;
      })
      .catch(() => { });
  };

  return { videos, youtubeSearch, youtubeSearchByKeyword };
});
