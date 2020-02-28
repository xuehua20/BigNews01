$(function() {
  $.ajax({
    type: "get",
    url: BigNews.user_info, //引入封装好的获取用户信息的地址
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

  //2点退出跳回登录页
  $(".logout").click(function() {
    //点退出的时候删除指令标识
    localStorage.removeItem("token");
    //跳回登录页
    location.href = "./login.html";
  });
  //3点左侧导航栏有点击事件.并且自己高亮.其他兄弟暗色
  $(".level01").click(function() {
    //3.1排他思想
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
    //3.6让小>括号旋转
    $(this)
      .find("b")
      .toggleClass("rotate0");
    //3.2文章列表部分有点击显示它兄弟标签,所以需要判断一下.如果有二级标签类名就让它显示出来 .next()直接获取紧邻的下一个同辈元素集合
    if (
      $(this)
        .next()
        .hasClass("level02")
    ) {
      //3.3让它滑动显示/或者隐藏
      $(this)
        .next()
        .slideToggle();
      //3.4默认选中第一个儿子显示,
      $(this)
        .next()
        .find("li")
        // .find()搜索所有与指定表达式匹配的元素。这个函数是找出正在处理的元素的!后代元素!的好方法。
        .eq(0)
        //然后索引为0的第一个li元素
        .addClass("active");
    } else {
      //3.7,如果没有在二级菜单了.就让默认的选中的高亮效果去掉
      $(".level02 ")
        .find("li")
        .removeClass("active");
    }
  });
  //3.5让它的儿子出现选中高亮其他暗
  $(".level02 li").click(function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
