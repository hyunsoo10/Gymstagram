<template>
    <div style="text-align: center;">
        <div id="chart">
            <p>GYM STAGRAM 회원AVTY 현황</p>
            <VueApexCharts type="donut" :options="chartOptions" :series="avtyRate"></VueApexCharts>
        </div>
    </div>
</template>

<script setup>
import {ref} from 'vue'
import VueApexCharts from 'vue3-apexcharts'

 const props = defineProps({
    avtyData: Object
})
const avtyRate = ref([])
const avtyName= ref( [])
// console.log(props.genresData)
avtyRate.value = Object.values(props.avtyData)
avtyName.value = Object.keys(props.avtyData)
// for(x of Object.keys(props.genresData)){
//     console.logs(x)
// }
// const temp = ref([2, 3, 4, 10])

// genreName.value = props.value.genresData.map((key)=>key.value)
// console.log(genreRate.value)
const chartOptions = ref({
    chart:{
        width: 200,
        height: 300,
        type: 'donut',
    },
    // labels: avtyName.value,
    labels: ['ENJ', 'ENP', 'ESJ', 'ESP', 'INJ', 'INP', 'ISJ', 'ISP'],
    // fill: {
    // colors: ["#447b40", "#cc7870", "#e74ce4"]
    // },
    // backgroundColor: [
    //         "#447b40", "#cc7870", "#e74ce4"
    // ],
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            },
            // colors: ["#447b40", "#cc7870", "#e74ce4" ],
            // backgroundColor: [
            // "#447b40", "#cc7870", "#e74ce4"
            // ],
            
         }
    }]
})

</script>

<style scoped>
#chart{
    width: 40em;
    margin: 1em auto;
}
</style>
