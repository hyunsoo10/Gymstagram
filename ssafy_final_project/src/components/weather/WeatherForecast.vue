<template>
    <div>
        <h4>날씨정보</h4>
        <div> 현재 위치 : {{ location }} </div>
        <div>기온 : {{ tmp }}℃</div>
        <div>하늘상태 : {{ sky }}</div>
        <div>강수형태 : {{ pty }}</div>
        <div>강수확률 : {{ pop }}%</div>
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
const tmp = ref(null);
const sky = ref(null);
const pty = ref(null);
const pop = ref(0);

onMounted(() => {

    // 내 위치정보 구하기
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            latitude.value = position.coords.latitude; // 위도
            longitude.value = position.coords.longitude; // 경도
            console.log("위도, 경도 : " + latitude.value + " " + longitude.value)
            // 내 위치(경도, 위도) -> 법정동
            const Location_API_URL = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude.value}&y=${latitude.value}`;
            axios
                .get(Location_API_URL, {
                    headers: {
                        Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
                    }
                }).then((response) => {
                    //법정동 기준으로 동단위의 값을 가져온다
                    console.log(response)
                    location.value = response.data.documents[0].address_name;
                    console.log(location.value)
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
            console.log("기상청 좌표 : " + x + " " + y)

            // 공공데이터에서 요청 날리라고 한 URL
            const Weather_API_URL = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst`;

            // 매일 날짜 갱신을 위해서 !
            const today = new Date();
            let year = today.getFullYear();
            let month = today.getMonth() + 1;
            let day = today.getDate();
            month = month < 10 ? "0" + month : month;
            day = day < 10 ? "0" + day : day;
            const todayStr = `${year}${month}${day}`;
            console.log(todayStr);
            //발표시간을 전부 넣어둬
            const times = ['0200', '0500',] // 8개넣어
            axios
                .get(Weather_API_URL, {
                    params: {
                        ServiceKey: import.meta.env.VITE_WEATHER_API_KEY,
                        dataType: "JSON",
                        base_date: todayStr, //20231905 형태
                        base_time: "0200",   //이것은 총 8회 발표 
                        numOfRows: 15,
                        nx: x,
                        ny: y,
                    },
                })
                .then((response) => {
                    console.log(response)
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
                                    break;
                                case "3":
                                    sky.value = "구름많음";
                                    break;
                                case "4":
                                    sky.value = "흐림";
                                    break;
                            }
                        } else if (item.category === "PTY") {
                            pty.value = item.fcstValue;
                        } else if (item.category === "POP") {
                            pop.value = item.fcstValue;
                        }
                    });
                });
        })
    }
});
</script>
  
<style scoped></style>
  