//1入口函数
$(function() {
  //2.发送ajax请求
  $.ajax({
    type: "get",
    url: BigNews.category_list,
    success: function(response) {
      //2.1发送完后要打印一下结果

      //3 渲染到下拉框里面
      //3.1使用模板引擎
      let htmlstr = template("select", response);
      $("#selCategory").html(htmlstr);
    }
  });
  //方便全局复用
  let page = ""; //总页数
  let typeId = ""; //文章类型id
  let state = ""; //文章状态
  let startPage = 1; //当前点击页数
  //4.需求筛选
  //4.1给筛选一个点击事件
  $("#btnSearch").click(function(e) {
    e.preventDefault();
    //4.2发送搜索请求
    //4.2.1先获取到type就是id值和state状态值,赋值给全局变量typeId state
    typeId = $("#selCategory").val();
    state = $("#selStatus").val();
    //每次点击的时候让当前显示页从1开始
    startPage = 1;
    searchRendering(typeId, state, page);
  });
  //每次打开页面都让它自己触发一次搜素并渲染上页面
  $("#btnSearch").click();
  //分页器
  //封装分页器因为每次都要使用
  function pagination(page) {
    // 1. 先销毁旧的分页器，传入字符串 destroy 即可,要写动态分页器固定写法
    $("#pagination-demo").twbsPagination("destroy");
    $("#pagination-demo").twbsPagination({
      totalPages: page,
      //总页数
      visiblePages: 7,
      //可见的页数上限
      startPage: startPage,
      //当前显示的第几页
      first: "首页",
      last: "页尾",
      prev: "上一页",
      next: "下一页",
      onPageClick: function(e, cpage) {
        //每点击一次分页的时候再触发ajax请求
        //需要加个判断.因为这个分页器每次都会自动点击一次
        //startPage 显示当前点击页面
        //cpage正在点击的页面

        if (cpage != startPage) {
          //正在点击的页面不等于显示的当前页进来
          //发送ajax请求
          searchRendering(typeId, state, cpage);
          //发送完成后把当前点击的页面赋值给全局的显示当前点击页startPage
          startPage = cpage;
        }
      }
    });
  }
  //封装ajax
  function searchRendering(typeId, state, page) {
    // 文章搜索
    //请求地址：/admin/article/query
    //请求方式：get
    // 请求参数：
    // | 名称 | 类型 | 说明 |
    // | key | string | 搜索关键词，可以为空，为空返回某类型所有文章 |
    // | type | string | 文章类型id，可以为空，为空返回所有类型文章 |
    // | state | string | 文章状态，草稿 ，已发布, 为空返回所有状态文章 |
    // | page | number | 当前页，为空返回第1页 |
    // | perpage | number | 每页显示条数，为空默认每页6条 |
    $.ajax({
      type: "get",
      url: BigNews.article_query,
      data: {
        type: typeId, //文章id
        state: state, //文章状态
        page: page //当前页
      },
      success: function(response) {
        page = response.data.totalPage; //获取到总页数赋值给全局变量page总页数
        console.log(page);
        pagination(page); //分页器 把总页数传进分页器让它动态生成总共几页
        let htmlstr = template("tbodystr", response.data); //模板字符
        //渲染数据
        $(".table tbody").html(htmlstr);
        //技术点.页面链接?参数=值  这是跳转页面传参形式, a标签跳转都是这样
        //5.1使用链接上加?id=系统后台获取到的id值
      }
    });
  }
});
