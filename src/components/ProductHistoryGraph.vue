<template>
  <LineChart v-bind="lineChartProps" />
</template>

<script setup lang="ts">
import type { ProductPriceModel } from '@/models/Product'
import { computed } from 'vue'
import { Chart, registerables, type ChartData } from 'chart.js'
import { LineChart, useLineChart } from 'vue-chart-3'
import 'chartjs-adapter-luxon'
import colors from 'tailwindcss/colors'

Chart.register(...registerables)

const props = defineProps<{
  history: ProductPriceModel[],
}>()

const priceColor = colors.green[500]
const basePriceColor = colors.gray[300]

const chartData = computed((): ChartData<"line"> => {
  const labels = props.history.map((v) => new Date(v.time))
  const data = props.history.map((v) => v.price)
  return {
    labels,
    datasets: [{
      label: 'Цена',
      borderColor: priceColor,
      pointBorderColor: priceColor,
      backgroundColor: priceColor,
      data,
      cubicInterpolationMode: 'monotone',
    }, {
      label: 'Цена без скидки',
      borderColor: basePriceColor,
      pointBorderColor: basePriceColor,
      backgroundColor: basePriceColor,
      data: props.history.map((v) => v.basePrice),
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
