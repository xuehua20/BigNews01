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
      console.log(response);

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
      console.log(response);
      let htmlstr = template("commentlist", response);
      $(".comment_list").html(htmlstr);
    }
  });
});
