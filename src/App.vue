<script setup lang="ts">
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { ScatterChart, LineChart } from 'echarts/charts'
import {
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  MarkLineComponent,
} from 'echarts/components'
import VChart from 'vue-echarts'

import { onMounted, ref, computed } from 'vue'
import { readData } from './utils/Parser'

const seriesData = ref<[Date, number][]>([])

onMounted(async () => {
  seriesData.value = await readData()
})

use([
  ScatterChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
  MarkLineComponent,
  LineChart,
])

const expirationDate = ref('2026-01-01')
const strikePrice = ref(12400)

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
      symbolSize: 5,
      markLine: {
        symbol: 'none',
        label: { show: false },
        lineStyle: {
          color: '#042326',
          type: 'solid',
          width: 2,
        },
        data: [
          {
            xAxis: expirationDate.value
              ? new Date(expirationDate.value).getTime()
              : new Date('2026-01-01').getTime(),
          },
          { yAxis: strikePrice.value },
        ],
      },
    },
    {
      type: 'line',
      data: seriesData.value,
      showSymbol: false, // hides the line's own dots
      lineStyle: {
        color: 'rgba(99, 110, 190, 0.5)',
        width: 1,
      },
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
      <input id="expiration-date" name="expiration-date" v-model="expirationDate" type="date" />
      <label for="strike-price">Strike price: </label>
      <input id="strike-price" name="strike-price" v-model="strikePrice" type="number" />
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
