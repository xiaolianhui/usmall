<template>
<div id=main>
  
</div>
</template>
<script>

export default {
components:{
 },
data () {
 return {
 }
},
methods:{
},
mounted(){

var echarts = require('echarts');

// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
myChart.setOption({

      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
    }]
 
});

}
}
</script>
<style scoped>
#main{
    width: 100%;
    height: 470px;
}
</style>