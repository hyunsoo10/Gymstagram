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

avtyRate.value = Object.values(props.avtyData)
avtyName.value = Object.keys(props.avtyData)

const chartOptions = ref({
    chart:{
        width: 200,
        height: 300,
        type: 'donut',
    },
    labels: ['ENJ', 'ENP', 'ESJ', 'ESP', 'INJ', 'INP', 'ISJ', 'ISP'],
    colors:["#A099FB", "#FE79AB", "#01CECB", "#f32c52", "#FCE38A", "#79AC78", "#96B6C5", "#B3A492"],
    fill: {
    colors: ["#A099FB", "#FE79AB", "#01CECB", "#f32c52", "#FCE38A", "#79AC78", "#96B6C5", "#B3A492"]
    },

    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200
            },
            legend: {
                position: 'bottom'
            },
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
