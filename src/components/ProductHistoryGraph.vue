<template>
  <LineChart v-bind="lineChartProps" />
</template>

<script setup lang="ts">
import type { ProductPriceModel } from '@/models/Product'
import { computed } from 'vue'
import { Chart, registerables, type ChartData } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import 'chartjs-adapter-luxon'

Chart.register(...registerables)

const props = defineProps<{
  history: ProductPriceModel[],
}>()

const chartData = computed((): ChartData<"line"> => {
  const labels = props.history.map((v) => new Date(v.time))
  const data = props.history.map((v) => v.price)
  return {
    labels,
    datasets: [{
      label: 'Цена',
      borderColor: '#F87171',
      pointBorderColor: '#F87171',
      backgroundColor: '#F87171',
      data,
      cubicInterpolationMode: 'monotone',
    }]
  }
})

const { lineChartProps, lineChartRef } = useLineChart({
  chartData,
  options: {
    scales: {
      x: {
        type: 'time',
      },
      y: {
        ticks: {
          callback: (v: any) => `${v}₽`
        }
      },
    }
  }
})

</script>
