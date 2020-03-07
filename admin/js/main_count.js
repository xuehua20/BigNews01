$(function() {
  //发送ajax请求获得数据
  $.ajax({
    type: "get",
    url: BigNews.data_article,

    success: function(response) {
      console.log(response);
      let time = response.date;
      console.log(time);
      //使用map方法映射一个新的数组出来
      let date = time.map(item => {
        return item.date;
      });
      let count = time.map(item => {
        return item.count;
      });
      console.log(count);

      //折线图
      let myChart = echarts.init(document.getElementById("main")); //初始化,这里是不会变的

      option = {
        title: {
          show: true,
          text: "月新增文章数量",
          left: "center" //内容居中
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date //一般要改的地方就是数据
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: count,
            type: "line",
            name: "新增文章" //给小圆点显示名字用的
            // areaStyle: {
            //里面设置颜色用的
            //   backgroundColor: " #cccccc"
            // }
          }
        ],
        tooltip: {
          //点小圆点出现分界线
          trigger: "axis",
          position: function(pt) {
            return [pt[0], "10%"];
          }
        }
      };
      // 使用刚指定的配置项和数据显示图表。这里也是不会变得
      myChart.setOption(option);
    }
  });
});
