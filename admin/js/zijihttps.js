//沙箱模式
(function(_w) {
  //设置全局请求头,因为每次都需要这个请求头.所以我们封装
  $.ajaxSetup({
    //设置指令头
    headers: {
      //设置请求头指令
      Authorization: localStorage.getItem("token")
    },
    beforeSend: function() {
      //发送请求前
    },
    error: function() {
      //发送失败
      //向服务器发送请求失败时.提醒用户登录失败,并继续在登录页
      $(".modal").modal();
      $(".modal-body p").html("登录失败,请重新登录");
      $(".btn").html("确认");
      //点完确认后跳转回登录页面
      $(".btn").click(function() {
        location.href = "./login.html";
      });
    },
    complete: function() {
      //发送完成
    }
  });
  //封装请求接口
  const baseUrl = "http://localhost:8080/api/v1";
  const BigNews = {
    // 用户信息接口
    user_info: `${baseUrl}/admin/user/info`, // 2、获取用户信息
    user_detail: `${baseUrl}/admin/user/detail`, // 3、获取用户详情
    user_edit: `${baseUrl}/admin/user/edit`, // 4、编辑用户信息
    // 分类接口
    category_list: `${baseUrl}/admin/category/list`, // 5、所有文章类别
    category_add: `${baseUrl}/admin/category/add`, // 6、新增文章类别
    category_search: `${baseUrl}/admin/category/search`, // 7、根据id查询指定文章类别
    category_edit: `${baseUrl}/admin/category/edit`, // 8、编辑文章类别
    category_delete: `${baseUrl}/admin/category/delete`, // 9、删除文章类别
    // 文章接口
    article_query: `${baseUrl}/admin/article/query`, // 10、文章搜索
    article_publish: `${baseUrl}/admin/article/publish`, // 11、发布文章
    article_search: `${baseUrl}/admin/article/search`, // 12、根据id获取文章信息
    article_edit: `${baseUrl}/admin/article/edit`, // 13、文章编辑
    article_delete: `${baseUrl}/admin/article/delete`, // 14、删除文章
    // 数据统计接口
    data_info: `${baseUrl}/admin/data/info`, // 15、获取统计数据
    data_article: `${baseUrl}/admin/data/article`, // 16、日新增文章数量统计
    data_category: `${baseUrl}/admin/data/category`, // 17、各类型文章数量统计
    data_visit: `${baseUrl}/admin/data/visit`, // 18、日文章访问量
    // 评论接口
    comment_search: `${baseUrl}/admin/comment/search`, // 19、文章评论搜索
    comment_pass: `${baseUrl}/admin/comment/pass`, //  20、评论审核通过
    comment_reject: `${baseUrl}/admin/comment/reject`, // 21、评论审核不通过
    comment_delete: `${baseUrl}/admin/comment/delete` // 22、删除评论
  };
  //把BigNews变成全局变量,好方便调用
  _w.BigNews = BigNews;
  console.log(BigNews.user_info);
})(window);
