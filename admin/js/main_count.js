$(function() {
  //发送ajax请求获得数据.月新增文章
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
            name: "新增文章", //给小圆点显示名字用的
            areaStyle: {
              //里面设置颜色用的
              backgroundColor: " #cccccc"
            }
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
  //.所有文章的统计
  $.ajax({
    type: "get",
    url: BigNews.data_info,

    success: function(response) {
      console.log(response);
      //模板引擎
      let htmlstr = template("info", response);

      $(".container-fluid1").html(htmlstr);
    }
  });
  //各分类文章总数
  $.ajax({
    type: "get",
    url: BigNews.data_category,

    success: function(response) {
      console.log(response);
      let date = response.date.map(function(item) {
        return { value: item.articles, name: item.name };
      });
      console.log(date);

      //饼图
      let myChart = echarts.init(document.getElementById("pie_show")); //初始化,这里是不会变的
      option = {
        backgroundColor: "#2c343c",

        title: {
          text: "分类文章数量比",
          left: "center", //文章标题居中
          top: 20,
          textStyle: {
            color: "#ccc"
          }
        },

        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        visualMap: {
          show: false,
          min: 80,
          max: 600,
          inRange: {
            colorLightness: [0, 1]
          }
        },
        series: [
          {
            name: "分类名称",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: date,
            roseType: "radius",
            label: {
              color: "rgba(255, 255, 255, 0.3)"
            },
            labelLine: {
              lineStyle: {
                color: "rgba(255, 255, 255, 0.3)"
              },
              smooth: 0.2,
              length: 10,
              length2: 20
            },
            itemStyle: {
              color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。这里也是不会变得
      myChart.setOption(option);
    }
  });
});
