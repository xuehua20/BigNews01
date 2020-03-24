$(function() {
  //发送ajax请求获得数据.月新增文章
  $.ajax({
    type: "get",
    url: BigNews.data_article,

    success: function(response) {
      let time = response.date;

      //使用map方法映射一个新的数组出来
      let date = time.map(item => {
        return item.date;
      });
      let count = time.map(item => {
        return item.count;
      });

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
      let date1 = response.date.map(function(item) {
        //使用map映射出一个新的数组
        return { value: item.articles, name: item.name };
      });

      //饼图
      let myChart = echarts.init(document.getElementById("pie_show")); //初始化,这里是不会变的
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: response.date
        },
        series: [
          {
            name: "分类名称",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "16",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: date1 //要按照它的格式才行
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。这里也是不会变得
      myChart.setOption(option);
    }
  });
  //分类访问量

  // let myChart = echarts.init(document.getElementById("visit")); //初始化,这里是不会变的
  // option = {
  //   title: {
  //     text: "阶梯瀑布图",
  //     subtext: "From ExcelHome",
  //     sublink: "http://e.weibo.com/1341556070/Aj1J2x5a5"
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       // 坐标轴指示器，坐标轴触发有效
  //       type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
  //     },
  //     formatter: function(params) {
  //       var tar;
  //       if (params[1].value !== "-") {
  //         tar = params[1];
  //       } else {
  //         tar = params[0];
  //       }
  //       return tar.name + "<br/>" + tar.seriesName + " : " + tar.value;
  //     }
  //   },
  //   legend: {
  //     data: ["支出", "收入"]
  //   },
  //   grid: {
  //     left: "3%",
  //     right: "4%",
  //     bottom: "3%",
  //     containLabel: true
  //   },
  //   xAxis: {
  //     type: "category",
  //     splitLine: { show: false },
  //     data: (function() {
  //       var list = [];
  //       for (var i = 1; i <= 11; i++) {
  //         list.push("11月" + i + "日");
  //       }
  //       return list;
  //     })()
  //   },
  //   yAxis: {
  //     type: "value"
  //   },
  //   series: [
  //     {
  //       name: "辅助",
  //       type: "bar",
  //       stack: "总量",
  //       itemStyle: {
  //         barBorderColor: "rgba(0,0,0,0)",
  //         color: "rgba(0,0,0,0)"
  //       },
  //       emphasis: {
  //         itemStyle: {
  //           barBorderColor: "rgba(0,0,0,0)",
  //           color: "rgba(0,0,0,0)"
  //         }
  //       },
  //       data: [0, 900, 1245, 1530, 1376, 1376, 1511, 1689, 1856, 1495, 1292]
  //     },
  //     {
  //       name: "收入",
  //       type: "bar",
  //       stack: "总量",
  //       label: {
  //         show: true,
  //         position: "top"
  //       },
  //       data: [900, 345, 393, "-", "-", 135, 178, 286, "-", "-", "-"]
  //     },
  //     {
  //       name: "支出",
  //       type: "bar",
  //       stack: "总量",
  //       label: {
  //         show: true,
  //         position: "bottom"
  //       },
  //       data: ["-", "-", "-", 108, 154, "-", "-", "-", 119, 361, 203]
  //     }
  //   ]
  // };
  // // 使用刚指定的配置项和数据显示图表。这里也是不会变得
  // myChart.setOption(option);
});
