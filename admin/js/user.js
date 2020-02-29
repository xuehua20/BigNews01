//入口函数
$(function() {
  //1.先查询到数据
  $(".form-group .btn").click(function(e) {
    e.preventDefault();

    // fd = new FormData();

    // console.log(fd);
    //2.先实现本地预览
    $("#exampleInputFile").change(function(e) {
      e.preventDefault();
      const fileImg = this.files[0]; //获取到上传的图片对象
      //把浏览器本地缓存的随机生成的文件路径获取到
      const newUrl = URL.createObjectURL(fileImg);
      //把路径赋值给图片
      $("img.urer_pic").attr({
        src: newUrl
      });
    });
    //功能3 修改了用户信息
    $(".btn").click(function(e) {
      e.preventDefault(); //3.1阻止默认行为
      //FormData 可以把它看做是特殊的参数的数据格式,可用于图片上传, 它传输的图片都是自动转换为二进制进行传输的
      //可以把表单域序列化 new FormData(表单域)
      //每一个表单域.都可以通过this.form访问到整个表单域
      //this代表当前的元素.代表当前点击的元素

      // const fd = new FormData(this.form);
      // console.log(fd.get(username));//检测内容是否获取成功
      console.log(document.forms[0]);
      console.log(document.forms[0]);
      const fd = new FormData(document.forms[0]);
      console.log(fd.get("username"));
    });
  });
});
