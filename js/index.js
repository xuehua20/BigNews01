$(function() {
  //全部分类
  $.ajax({
    type: "get",
    url: BigNews.category,

    success: function(response) {
      let htmlstr = template("categorylist", response);
      $(".level_two").html(htmlstr);
      $(".left_menu").html(htmlstr);
    }
  });
  //热门排行
  $.ajax({
    type: "get",
    url: BigNews.rank,
    success: function(response) {
      let htmlstr = template("artitlerank", response);
      console.log(htmlstr);

      $(".hotrank_list").html(htmlstr);
    }
  });
  //最新评论
  $.ajax({
    type: "get",
    url: BigNews.latest_comment,

    success: function(response) {
      let htmlstr = template("commentlist", response);
      $(".comment_list").html(htmlstr);
    }
  });
  //焦点关注
  $.ajax({
    type: "get",
    url: BigNews.attention,

    success: function(response) {
      let htmlstr = template("attention", response);
      $(".guanzhu_list").html(htmlstr);
    }
  });
  function ajaxdata(url, strid, select) {
    $.ajax({
      type: "get",
      url: url,

      success: function(response) {
        console.log(response);
        let htmlstr = template(strid, response);
        $(select).html(htmlstr);
      }
    });
  }
  // debugger;
  // //最新资讯
  // ajaxdata(BigNews.latest, "latest", ".common_news");
  //热点图
  ajaxdata(BigNews.hotpic, "hotpic", ".focus_list");
});
