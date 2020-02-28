$(function() {
  //           请求地址：/admin/user / info
  //           请求方式：get
  //           请求参数：无
  //           返回数据：
  // | 名称 | 类型 | 说明 |
  // | nickname | string | 用户昵称 |
  // | userPic | string | 用户图片地址 |
  //获取用户的唯一秘钥
  $.ajax({
    type: "get",
    url: BigNews.user_info,
    // headers: {
    //   Authorization: localStorage.getItem("token") //添加指令头
    // },
    dataType: "json",
    success: function(response) {
      console.log(response);
      //渲染上页面
      $(".user_info span strong").text(response.data.nickname);
      console.log(response.data.userPic);

      $(".user_info  img").attr({ src: response.data.userPic });
      // 右侧头像
      $(".user_center_link img").attr({ src: response.data.userPic });
    }
  });

  //等退出跳回登录页
  $(".logout").click(function() {
    //点退出的时候删除指令标识
    localStorage.removeItem("token");
    //跳回登录页
    location.href = "./login.html";
  });
});
