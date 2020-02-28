$(function() {
  $(".input_sub").click(function(e) {
    //阻止默认提交
    e.preventDefault();
    //.获取用户输入的用户名和密码
    let usertext = $(".input_txt")
      .val()
      .trim();
    let pass = $(".input_pass")
      .val()
      .trim();
    //判断非空
    if (usertext === "" || pass === "") {
      $(".modal").modal();
      return;
    } else {
      $.ajax({
        type: "post",
        url: "http://localhost:8080/api/v1/admin/user/login",
        data: {
          username: usertext,
          password: pass
        },
        success: function(response) {
          console.log(response);
          //如果客户端返回的是200,把token保存到浏览器本地存储里面,如果400提示用户登录错误
          if (response.code === 200) {
            //存进本地存储
            localStorage.setItem("token", response.token);
            //跳转到首页
            location.href = "./index.html";
          } else {
            $(".modal-body p").html(response.msg);
            $(".modal").modal();
          }
        }
      });
    }
  });
});
