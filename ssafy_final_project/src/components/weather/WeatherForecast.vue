<!-- <template>
    <div>
        <h4>날씨정보</h4>
        <div> 현재 위치 : {{ location }} </div>
        <div>기온 : {{ tmp }}℃</div>
        <div>하늘상태 : {{ sky }}</div>
        <div>강수형태 : {{ pty }}</div>
        <div>강수확률 : {{ pop }}%</div>
    </div>
</template> -->
<template>
    <div class="home-weather-info">
        <v-card class="weather-info" max-width="500">
            <v-card-item :title="location">
                <div class="today-date">
                    <p v-html="timeContent"></p>
                    <br>
                </div>
            </v-card-item>
            <v-card-text class="py-0">
                <v-row align="center" no-gutters>
                    <v-col cols="6" class="text-center">
                        <div class="weather-icon">
                            <p v-html="weatherIcon"></p>
                            <br>
                        </div>
                    </v-col>
                    <v-col class="tmp-info" cols="6">
                        &nbsp;{{ tmp }} ℃
                    </v-col>
                </v-row>
            </v-card-text>
            <br>
            <div class="d-flex py-3 justify-space-around">
                <v-list-item density="compact" prepend-icon="mdi-weather-windy">
                    <v-list-item-subtitle>{{ wsd }} m/s</v-list-item-subtitle>
                </v-list-item>

                <v-list-item density="compact" prepend-icon="mdi-weather-pouring">
                    <v-list-item-subtitle>{{ pop }}%</v-list-item-subtitle>
                </v-list-item>
            </div>
        </v-card>
        <v-card>
            안녕 오늘은 무슨 운동이 추천이야 ~~~~~~~!~~~~
        </v-card>
    </div>
</template>

  
<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// 위도, 경도
const latitude = ref(0)
const longitude = ref(0)

// 내 위치 -> (법정동 기준)
const location = ref('')

// 날씨 정보
const tmp = ref(null); // 기온
const sky = ref(null); // 하늘 상태
const pty = ref(null); // 강수 형태
const pop = ref(0); // 강수 확률
const wsd = ref(0); // 풍속
const weatherIcon = ref('');

// 실시간 정보
let days = ['일', '월', '화', '수', '목', '금', '토'];
let today = new Date();
let year = String(today.getFullYear());
let month = String(today.getMonth() + 1)
let date = String(today.getDate())
let day = String(days[today.getDay()])
let hour = String(today.getHours()).padStart(2, "0");
let minute = String(today.getMinutes()).padStart(2, "0");
let seconds = String(today.getSeconds()).padStart(2, "0");
let timeContent = ref(`<div class="today-date">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${year}년 ${month}월 ${date}일 ${day}요일 ${hour}시 ${minute}분 ${seconds}초</div>`)

const getClock = function () {
    today = new Date();
    year = String(today.getFullYear());
    month = String(today.getMonth() + 1)
    date = String(today.getDate())
    day = String(days[today.getDay()])
    hour = String(today.getHours()).padStart(2, "0");
    minute = String(today.getMinutes()).padStart(2, "0");
    seconds = String(today.getSeconds()).padStart(2, "0");
    timeContent.value = `<div class="today-date">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${year}년 ${month}월 ${date}일 ${day}요일 ${hour}시 ${minute}분 ${seconds}초</div>`;
}

getClock;
setInterval(getClock, 1000); //1초 주기로 새로실행


// 시간 맞춰서 날씨 예보 받아오기
let basetime = ''
const timeChange = function (hour) {
    switch (hour) {
        case "02":
        case "03":
        case "04":
            basetime = "0200";
            break;
        case "05":
        case "06":
        case "07":
            basetime = "0500";
            break;
        case "08":
        case "09":
        case "10":
            basetime = "0800";
            break;
        case "11":
        case "12":
        case "13":
            basetime = "1100";
            break;
        case "14":
        case "15":
        case "16":
            basetime = "1400";
            break;
        case "17":
        case "18":
        case "19":
            basetime = "1700";
            break;
        case "20":
        case "21":
        case "22":
            basetime = "2000";
            break;
        case "23":
        case "00":
        case "01":
            basetime = "2300";
            break;
    }
    return basetime
}

onMounted(() => {
    // 내 위치정보 구하기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude.value = position.coords.latitude; // 위도
            longitude.value = position.coords.longitude; // 경도
            // console.log("위도, 경도 : " + latitude.value + " " + longitude.value)
            // 내 위치(경도, 위도) -> 법정동
            const Location_API_URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude.value}&y=${latitude.value}`;
            axios
                .get(Location_API_URL, {
                    headers: {
                        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
                    }
                }).then((response) => {
                    //법정동 기준으로 동단위의 값을 가져온다
                    location.value = '🗺️ ' + response.data.documents[0].address_name;
                    // console.log(location.value)
                })

            // 좌표로 행정구역 정보 받기
            // 위도, 경도 -> 기상청 좌표로 변환
            let RE = 6371.00877; // 지구 반경(km)
            let GRID = 5.0; // 격자 간격(km)
            let SLAT1 = 30.0; // 투영 위도1(degree)
            let SLAT2 = 60.0; // 투영 위도2(degree)
            let OLON = 126.0; // 기준점 경도(degree)
            let OLAT = 38.0; // 기준점 위도(degree)
            let XO = 43; // 기준점 X좌표(GRID)
            let YO = 136; // 기1준점 Y좌표(GRID)

            function dfs_xy_conv(v1, v2) {
                let DEGRAD = Math.PI / 180.0;
                let RADDEG = 180.0 / Math.PI;

                let re = RE / GRID;
                let slat1 = SLAT1 * DEGRAD;
                let slat2 = SLAT2 * DEGRAD;
                let olon = OLON * DEGRAD;
                let olat = OLAT * DEGRAD;

                let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
                sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
                let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
                sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
                let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
                ro = re * sf / Math.pow(ro, sn);
                let rs = {};

                rs['lat'] = v1;
                rs['lng'] = v2;
                let ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
                ra = re * sf / Math.pow(ra, sn);
                let theta = v2 * DEGRAD - olon;
                if (theta > Math.PI) theta -= 2.0 * Math.PI;
                if (theta < -Math.PI) theta += 2.0 * Math.PI;
                theta *= sn;
                rs['x'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
                rs['y'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

                return rs;
            }
            let x = dfs_xy_conv(latitude.value, longitude.value)['x']
            let y = dfs_xy_conv(latitude.value, longitude.value)['y']
            // console.log("기상청 좌표 : " + x + " " + y)

            // 공공데이터에서 요청 날리라고 한 URL
            const Weather_API_URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;

            month = month < 10 ? "0" + month : month;
            date = date < 10 ? "0" + date : date;
            const todayStr = `${year}${month}${date}`;
        
            axios
                .get(Weather_API_URL, {
                    params: {
                        ServiceKey: import.meta.env.VITE_WEATHER_API_KEY,
                        dataType: "JSON",
                        base_date: todayStr, //20231905 형태
                        base_time: timeChange(hour),   //이것은 총 8회 발표 
                        numOfRows: 15,
                        nx: x,
                        ny: y,
                    },
                })
                .then((response) => {
                    return response.data.response.body.items.item;
                })
                .then((response) => {
                    //TMP : 1시간 기온 ℃
                    //UUU : 풍속(동서) m/s
                    //VVV : 풍속(남북) m/s
                    //VEC : 풍향 deg
                    //WSD : 풍속 m/s
                    //SKY : 하늘상태 --> 코드 : 맑음(1), 구름많음(3), 흐림(4)
                    //PTY : 강수형태 --> 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4)
                    //POP : 강수확률 %
                    //WAV : 파고 M
                    //PCP : 1시간 강수량 범주(1mm)
                    //REH : 습도 %
                    //SNO : 1시간 적설량
                    //TMN : 일 최저기온 ℃ x
                    //TMX : 일 최고기온 ℃ x
                    response.forEach((item) => {
                        // 1시간 기온
                        if (item.category === "TMP") {
                            tmp.value = item.fcstValue;
                        } else if (item.category === "SKY") {
                            switch (item.fcstValue) {
                                case "1":
                                    sky.value = "맑음";
                                    weatherIcon.value = "☀";
                                    break;
                                case "3":
                                    sky.value = "구름많음";
                                    weatherIcon.value = "⛅";
                                    break;
                                case "4":
                                    sky.value = "흐림";
                                    weatherIcon.value = "☁";
                                    break;
                            }
                        } else if (item.category === "PTY") {
                            // pty.value = item.fcstValue;
                            switch (item.fcstValue) {
                                case "1":
                                    weatherIcon.value = "☔";
                                    break;
                                case "2":
                                    weatherIcon.value = "❄";
                                    break;
                                case "3":
                                    weatherIcon.value = "❄";
                                    break;
                                case "4":
                                    weatherIcon.value = "☔";
                                    break;
                            }
                        } else if (item.category === "POP") {
                            pop.value = item.fcstValue;
                        } else if (item.category === "WSD") {
                            wsd.value = item.fcstValue;
                        }
                    });
                });
        })
    }
});
</script>
  
<style scoped>
.home-weather-info {
    margin: 0 20em;
    display: flex;
    justify-content: center;
}

.weather-info {
    width: 30em;
}
.today-date p {
    font-size: 1em;
}

.weather-icon p {
    font-size: 6em;
}

.tmp-info {
    text-align: center;
    font-size: 3.5em;
}
</style>
  