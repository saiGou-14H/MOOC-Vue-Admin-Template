
<template>


    <div class="areaEchartB">
      <div ref="myDiv" :style="{ width: '300px', height: '250px' }"></div>
    </div>
      <!-- 雷达图  图表必须给高和宽度-->
      <!-- <div ref="myDiv" class="radar-echart"></div> -->


    </template>

    <script>
    // 完成加载过程
    // var echarts = require('echarts')
    var echarts = require('echarts/lib/echarts') // 引入echarts主模块
    require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
  require('echarts/lib/chart/pie')

    export default {
      name :'VisitRadar',
      data(){
        return {
          chart:''
        }
      },
      // 页面渲染完毕事件
      mounted() {
        const myChart = echarts.init(this.$refs.myDiv) // 得到图表实例
        myChart.setOption({


          tooltip: {
            trigger: 'item',
          },
          legend: {
            bottom: '-2%',

            left: 'center',
          },
          series: [
            {
              color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
              name: '访问来源',
              type: 'pie',
              radius: ['60%', '30%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,

              },
              label: {
                show: false,
                position: 'center',
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '12',
                  fontWeight: 'bold',

                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: 1048, name: '搜索' },
                { value: 735, name: '访问' },
                { value: 580, name: '热点' },
                { value: 484, name: '购买' },

              ],
              animationType: 'scale',
              animationEasing: 'exponentialInOut',
              animationDelay: function () {
                return Math.random() * 200;
              },
            },
          ],
        })
      }
    }
    </script>

    <style>

  .areaEchartB{
    margin-top: 2px;
    padding-left: 14%;
    width: 86%;
    height: 250px;
   background-color: pink;
  }

    </style>
