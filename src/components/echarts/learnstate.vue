<template>
  <div id="main" :style="{width:'100%', height: '300px'}"></div>
</template>

<script>


var option;
export default {
  name: 'learnstate',

  mounted() {
  this.drawBar()
    },

  methods:{
    drawBar(){
      var echarts = require('echarts');
      var chartDom = document.getElementById('main');
      var myChart = echarts.init(chartDom);

      myChart.setOption({
        title: {
          text: 'Learn progressive'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['班级1', '班级2', '班级3', '班级4', '班级5', '班级6']
        },
        series: [
          {
            name: 'Total Learnprogress',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230]
          }
        ]
      })
    }
  }
}
</script>

<style scoped>

</style>
