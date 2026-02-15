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
import { ref } from 'vue'

use([
  ScatterChart,
  GridComponent,
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  CanvasRenderer,
])

const option = ref({
  title: {
    text: 'OMX Helsinki 25',
  },
  xAxis: {
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
      data: [
        [1, 1],
        [2, 2],
        [3, 3],
        [4, 4],
      ],
    },
  ],
})
</script>

<template>
  <div class="chart-container">
    <VChart class="chart" :option="option" />
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
</style>
