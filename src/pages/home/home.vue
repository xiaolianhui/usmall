<template>
  <div id="main">
      {{list}}
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import echarts from "echarts"
export default {
  computed: {
    ...mapGetters({
      list: "classify/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqCateList: "classify/reqCateList",
    }),

  },
  watch: {
    list: {
      handler() {
          if(this.list.length>0){
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById("main"));
        // 绘制图表
             var option = {
            title: {
                text: '商品分类详情'
            },
            tooltip: {},
            legend: {
                data:["子分类数量"]
            },
            xAxis: {
                data: this.list.map(item=>item.catename)
            },
            yAxis: {},
            series: [
                {
                    name: '子分类数量',
                    type: 'line',
                    data: this.list.map(item=>item.children?item.children.length:0)
                },
                
            ]
          };
          myChart.setOption(option)
          }
       },
    },
  },
  mounted() {
      this.reqCateList({istree:true})
  },
};
</script>
<style scoped>
#main {
  width: 100%;
  height: 470px;
}
</style>