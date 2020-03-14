(function(w) {
  //封装请求接口
  const baseUrl = "http://localhost:8080/api/v1";
  const BigNews = {
    // 文章信息接口
    category: `${baseUrl}/index/category`, // 2、获取文章类型
    search: `${baseUrl}/index/search`, // 3、获取文章搜索
    rank: `${baseUrl}/index/rank`, // 5、文章热门排行
    artitle: `${baseUrl}/index/artitle`, // 9、文章详细内容

    // 其他接口
    hotpic: `${baseUrl}/index/hotpic`, // 4、获取热点图
    latest: `${baseUrl}/index/latest`, // 6、最新资讯
    attention: `${baseUrl}/index/attention`, // 8、焦点关注

    // 评论接口
    latest_comment: `${baseUrl}/index/latest_comment`, // 7、最新评论
    post_comment: `${baseUrl}/index/post_comment`, // 10、发表评论
    get_comment: `${baseUrl}/index/get_comment` // 11、评论列表
  };
  //把BigNews变成全局变量,好方便调用
  w.BigNews = BigNews;
})(window);
