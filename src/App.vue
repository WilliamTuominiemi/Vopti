<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

import { onMounted, ref, computed } from 'vue'
import { readData } from './utils/Parser'

const seriesData = ref<[Date, number][]>([])

onMounted(async () => {
  seriesData.value = await readData()
  console.log(seriesData.value)
})

use([
  ScatterChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
])

const option = computed(() => ({
  title: {
    text: 'OMX Helsinki 25',
  },
  xAxis: {
    type: 'time',
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: 'dashed',
      },
    },
    scale: true,
  },
  series: [
    {
      type: 'scatter',
      data: seriesData.value,
    },
  ],
}))
</script>

<template>
  <div class="row">
    <div class="option-controls col hz-center">
      <label for="start-date">Start date: </label>
      <input id="start-date" name="start-date" type="date" />
      <label for="expiration-date">Expiration date: </label>
      <input id="expiration-date" name="expiration-date" type="date" />
      <label for="strike-price">Strike price: </label>
      <input id="strike-price" name="strike-price" type="number" />
    </div>
    <div class="chart-container">
      <VChart class="chart" :option="option" />
    </div>
  </div>
</template>

<style scoped>
.chart-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart {
  width: 100%;
  height: 600px;
}

.option-controls {
  width: 20em;
  font-size: xx-large;
}
</style>
