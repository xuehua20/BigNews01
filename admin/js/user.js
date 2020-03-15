//入口函数
$(function() {
  //1.先查询到数据
  $.ajax({
    type: "get",
    url: BigNews.user_detail,
    success: function(response) {
      const data = response.data;
      //1.2查询到数据后渲染到页面上
      //我们可以用for in遍历
      //input.${key} 交集选择器
      for (key in data) {
        $(`input.${key}`).val(data[key]);
      }
      $("img.user_pic").attr({ src: response.data.userPic });
    }
  });

  //2.先实现本地预览
  $("#exampleInputFile").change(function(e) {
    e.preventDefault();
    const fileImg = this.files[0]; //获取到上传的图片对象
    //把浏览器本地缓存的随机生成的文件路径获取到

    const newUrl = URL.createObjectURL(fileImg);
    //把路径赋值给图片
    console.log(newUrl);
    $("img.user_pic").attr("src", newUrl);
  });
  //功能3 修改了用户信息

  $(".btn-edit").click(function(e) {
    e.preventDefault(); //3.1阻止默认行为
    //FormData 可以把它看做是特殊的参数的数据格式,可用于图片上传, 它传输的图片都是自动转换为二进制进行传输的
    //可以把表单域序列化 new FormData(表单域)
    //每一个表单域.都可以通过this.form访问到整个表单域
    //this代表当前的元素.代表当前点击的元素

    const fd = new FormData(this.form);
    // console.log(fd.get(username));//检测内容是否获取成功
    // console.log(document.forms[0]);
    // console.log(document.forms[0]);
    // const fd = new FormData(document.forms[0]);
    console.log(fd.get("username"));
    console.log(fd.get("nickname"));
    console.log(fd.get("email"));
    console.log(fd.get("email"));
    $.ajax({
      type: "post",
      url: BigNews.user_edit,
      data: fd,
      //jq这个方法默认会加请求头和转换为字符串.而我们fd是特殊数据不需要这样,所以需要把下面两个属性改为 false
      contentType: false, //取消默认请求头
      processData: false, //取消转换字符串

      success: function(response) {
        console.log(response);
        if (response.code === 200) {
          //更新成功后获取当前页面的头像
          alert("修改成功");
          let userImg = $("img.user_pic").attr("src");

          let username = $(".nickname").val();

          //想要操作上iframe的里面的子页面,需要加上window.parent,这样就可以设置了
          window.parent.$(".user_info span strong").text(username);

          window.parent.$(".user_info  img").attr({ src: userImg });
          // 右侧头像
          window.parent.$(".user_center_link img").attr({ src: userImg });
        }
      }
    });
  });
});
