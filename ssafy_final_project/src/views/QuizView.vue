<template>
    <v-sheet id="outer" class="d-flex align-center justify-center flex-wrap text-center mt-5 mb-20 mx-auto py-7 px-4"
        elevation="4" height="auto" rounded max-width="800" width="100%">
        <div class="avty-test">
            <section id="main" :style="styleObjMain">
                <br>
                <h1 class="text-h3 font-weight-black text-black">🥇AVTY TEST🥇</h1>
                <br>
                <img :src=MainImgSrc alt="" id="mainImg" width="400">
                <p class="text-body-2 my-4">아래 버튼을 눌러 시작해 주세요</p>
                <v-btn elevation="3" @click="begin">시작하기</v-btn>
            </section>
            <section id="qna" :style="styleObjQna">
                <div class="status mx-auto mt-5">
                    <div class="statusBar" :style="styleObjStatusBar" />
                </div>
                <br>
                <div class="qBox my-5 py- mx-auto" :style="styleQbox">

                </div>
                <div class="answerBox">

                </div>
            </section>
            <section id="result" :style="styleObjResult">
                <h3>✨검사 결과✨</h3>
                <br>
                <div class="resultName"> 결과 이름 </div>
                <div id="resultImg" class="my-3 col-lg-6 col-md-8 col-sm-10 col-12 mx-auto"></div>
                <div class="resultDesc">
                </div>

                <p><strong>추천 음악 들어보세요!</strong></p>
                <div class="play-box">
                    <button @click="playMusic(avty), isPlaying = true"><i class="fas fa-volume-up"
                            style="color: cornflowerblue;"></i></button>
                    <button @click="isPlaying = false"><i class="fas fa-volume-mute" style="color: tomato;"></i></button>

                </div>
                <template v-if="isPlaying">
                    <div class="container">
                        <YoutubeMusicPlayer class="youtube-list" v-for="(video, index) in store.videos"
                            :key="video.id.videoId" :video="video" :index="index" :current="current" />
                    </div>
                </template>
            </section>
        </div>
    </v-sheet>
</template>

<script setup>
import { qnaList, infoList } from "@/assets/data/data.js";
import { ref, onMounted } from 'vue'
import YoutubeMusicPlayer from "@/components/youtube/YoutubeMusicPlayer.vue";
import { useUserStore } from "@/stores/user";
import { useYoutubeStore } from "@/stores/youtube";
import axios from "axios";


const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const avty = ref()
const isPlaying = ref(false)
const userStore = useUserStore();
const store = useYoutubeStore();

const current = ref(0)
const prev = function () {
    current.value = (current.value + 9) % 10;
}
const next = function () {
    current.value = (current.value + 1) % 10
}

const playMusic = (avty) => {
    console.log(avty)
    store.youtubeSearch(avty)
}

// 질문 9개
const endPoint = 9;

const styleObjMain = ref(
    {
        display: '',
    }
)

const styleObjStatusBar = ref(
    {
        display: 'none',
        width: '',
    }
)

const styleQbox = ref(
    {
        display: 'none'
    }
)

const styleObjQna = ref(
    {
        display: 'none',
    }
)

const styleObjResult = ref(
    {
        display: 'none',
    }

)
let imgNum = 0;
const MainImgSrc = ref("src/assets/avty_image/avty-0.jpg")

setInterval(function () {
    imgNum++;
    MainImgSrc.value = "src/assets/avty_image/avty-" + imgNum + ".jpg";
    if (imgNum >= 7)
        imgNum = 0;
}, 1000)

// 1. 메인 페이지에서 질문 페이지로 넘어가기
const begin = function () {
    setTimeout(() => {
        styleObjMain.value['display'] = 'none';
        styleObjStatusBar.value['display'] = 'block';
        styleQbox.value['display'] = 'block';
        styleObjQna.value['display'] = 'block';
    }, 200)

    // 질문 나오게 하는 goNext() 호출
    let qIdx = 0;
    goNext(qIdx);
}

// 2. 질문 페이지의 첫 번째 질문과 응답 나오게 하기
function goNext(qIdx) {
    // 마지막 질문이면 결과 나오게하는 goResult() 호출하고 return
    if (qIdx === endPoint) {
        goResult();
        return;
    }

    let qBox = document.querySelector('.qBox');
    // `qnaList`의 qIdx번째 인덱스의 `q`가 들어오도록
    qBox.innerHTML = qnaList[qIdx].q;

    // `qnaList`의 qIdx번째 인덱스의 `a` 배열 i번 반복(선택지)
    for (let i in qnaList[qIdx].a) {
        // addAnswer()에 `qnaList`의 qIdx번째 인덱스의 `a` 배열의 i번째 인덱스의 answer와 qIdx를 인자로 전달
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }

    // 진행상태 보여주는 var
    let status = document.querySelector('.statusBar');
    styleObjStatusBar.value['width'] = (100 / endPoint) * (qIdx + 1) + '%';
}

// 3. 9개의 질문에 대한 답 선택하고 -> 다음 질문으로 넘어가기
function addAnswer(answerText, qIdx, idx) {

    // 응답 전체를 담는 박스
    let answerBox = document.querySelector('.answerBox');

    // 2가지 응답버튼
    let answer = document.createElement('button');
    answer.classList.add('answerList');
    // 부트스트랩 css 및 애니메이션 적용
    // answer.classList.add('my-3');
    // answer.classList.add('py-3');
    // answer.classList.add('mx-auto');
    // answer.classList.add('fadeIn');

    // 응답 전체 박스에 개별 응답버튼 넣기
    answerBox.appendChild(answer);
    // 개별 응답 버튼에 파라미터로 받은 answerText(=qnaList[qIndx].a[i].answer) 넣기
    answer.innerHTML = answerText;

    // 버튼 클릭할 때마다 발생하는 이벤트 적용
    answer.addEventListener("click", function () {
        // 모든 응답버튼 children에 담기
        let children = document.querySelectorAll('.answerList');

        // 모든 응답버튼 반복
        for (let i = 0; i < children.length; i++) {
            // 모든 응답버튼 비활성화
            children[i].disabled = true;
        }

        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for (let i = 0; i < target.length; i++) {
                select.value[target[i]] += 1;
            }

            for (let i = 0; i < children.length; i++) {
                children[i].style.display = 'none';
            }
            // 다음 질문으로 넘어가기
            goNext(++qIdx);
        }, 200)
    }, false);
}

// 4. 마지막 질문에서 응답결과로 넘어가기
function goResult() {
    // 0.2초 뒤에
    setTimeout(() => {
        // qna는 완전히 사라지고, 결과는 완전히 나타나기 적용
        styleObjQna.value['display'] = 'none';
        styleObjResult.value['display'] = 'block';
    }, 200)

    // 결과를 구현하는 함수 호출
    setResult();
}

// 5. 최종결과를 보여주기 위한 알고리즘 구현

// 고른 응답들의 점수를 매기기 위한 변수
const select = ref([0, 0, 0, 0, 0, 0, 0, 0]);

// 최종 응답 결과 계산 함수
function calResult() {
    console.log(select.value);
    // 고른 응답들의 점수를 매기기위한 select 변수를 전개
    // Math메서드에 넣어 점수가 매겨진 배열의 최대값을 구함!
    // indexOf메서드의 인수로 전달된 요소를 검색해서
    let result = select.value.indexOf(Math.max(...select.value));
    // 검색된 해당 인덱스 번호를 반환
    return result;
}

function setResult() {
    // return된 result값 point에 담기
    // result -> 최대값이 발견된 인덱스 번호!
    let point = calResult();

    // 결과 이름 담기
    const resultName = document.querySelector('.resultName');
    // infoList[최대값이 발견된 index번호]의 name을 담기
    const loginUser = JSON.parse(localStorage.getItem('loginUser'))
    loginUser.avtyCode = point;
    avty.value = loginUser.avtyCode
    const userName = loginUser.userName;

    // 검사 결과를 DB에 반영
    axios
        .put(`http://localhost:8080/user-api/user/${loginUser.userId}`, loginUser)
        .then(() => {
            alert('정보수정에 성공하였습니다!');
        }).catch(() => {
            console.log("정보수정에 실패하였습니다!")
        })
    localStorage.setItem('loginUser', JSON.stringify(loginUser))

    resultName.innerHTML = userName + `님은 ` + infoList[point].name + ` 유형입니다 !`;
    // 결과 이미지 띄우기
    let resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    let imgURL = 'src/assets/avty_image/avty-' + point + '.jpg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.width = 250;
    imgDiv.appendChild(resultImg);

    // 결과 설명 담기
    const resultDesc = document.querySelector('.resultDesc');
    // infoList[최대값이 발견된 index번호]의 desc를 담기
    for (let i = 0; i < infoList[point].desc.length; i++) {
        resultDesc.innerHTML += '<p id="descList">' + infoList[point].desc[i] + '</p>';
    }
    // resultDesc.innerHTML = infoList[point].desc;
}
</script>

<style>
#outer {
    margin-bottom: 10rem;
}

.avty-test {
    margin: 20px;
    width: 700px;
    height: 700px;
}

#main {
    margin-top: 20px;
    width: 100%;
    height: 350px;
    text-align: center;
    border-radius: 20px;
}

#qna {
    height: 600px;
    padding: 100px 0;
}


.test-img {
    height: 350px;
}

p {
    font-size: 20px;
}

.qBox {
    text-align: center;
    font-size: 23px;
    width: 80%
}

.answerBox {
    text-align: center;
}

.answerList {
    margin: 20px auto;
    background-color: whitesmoke;
    border-radius: 20px;
    display: block;
    width: 80%;
    height: 100px;
    border: 0px;
    font-size: 17px;
}

.answerList:hover,
focus {
    background-color: pink;
    color: whitesmoke;
}

.status {
    height: 5px;
    width: 80%;
    background-color: white;
    border-radius: 20px;
}

.statusBar {
    height: 100%;
    border-radius: 20px;
    /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#febbbb+0,fe9090+52,ff5c5c+100;Red+3D+%231 */
    background: #febbbb;
    /* Old browsers */
    background: -moz-linear-gradient(top, #febbbb 0%, #fe9090 52%, #ff5c5c 100%);
    /* FF3.6-15 */
    background: -webkit-linear-gradient(top, #febbbb 0%, #fe9090 52%, #ff5c5c 100%);
    /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to bottom, #febbbb 0%, #fe9090 52%, #ff5c5c 100%);
    /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#febbbb', endColorstr='#ff5c5c', GradientType=0);
    /* IE6-9 */
}

.resultName {
    font-size: 40px;
    font-weight: bold;
}

#descList {
    font-size: 15px;
    text-align: text-align;

}

.play-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px auto;
    width: 5rem;
    font-size: 1.5rem;
}
</style>


  