//注意事项
/*编辑按钮的链接,有没有把id进行传递,格式 链接?=值*/
$(function() {
  //文章分类的渲染
  $.ajax({
    type: "get",
    url: BigNews.category_list,
    success: function(response) {
      let htmlstr = template("selectvray", response);
      console.log(htmlstr);
      $(".category").html(htmlstr);
    }
  });
  //需求1,根据网页传的id发送ajax请求获取到数据,渲染到页面上
  let locaId = location.search;
  //1.1把获取下来的id值进行分割
  let articleId = Number(locaId.split("=")[1]);
  console.log(articleId);
  $.ajax({
    type: "get",
    url: BigNews.article_search,
    data: {
      id: articleId
    },
    success: function(response) {
      console.log(response);
      let title = response.data.title; //标题
      let cover = response.data.cover; //图片
      let categoryId = response.data.categoryId; //类别id
      let date = response.data.date; //日期
      let content = response.data.content;
      $("#inputTitle").val(title);
      $(".article_cover").attr({ src: cover });
      $(".dateicon").val(date);
      //1.2下拉框.选中那条显示哪条
      $(".category").val(categoryId); //选中那条就显示哪条
      //1.4文章的内容编辑.使用mce插件,富文本插件
      //首先准备一个定时器.因为加载会比较慢
      setTimeout(function() {
        //设置富文本框的内容
        tinymce.activeEditor.setContent(content);
      }, 500);
    }
  });
  //图片给change事件 ,实现网页预览图效果
  $("#inputCover").change(function(e) {
    e.preventDefault();
    let fileImg = this.files[0]; //获取到图片路径
    //this.files这个获取的是整个文件 [0]文件下面存放图片的地方File子元素里面才是存放图片的
    let fileImgurl = URL.createObjectURL(fileImg); //转换找到浏览器缓存路径
    console.log(this.files);
    $(".article_cover").attr({ src: fileImgurl });
  });
  //点击修改
  $(".btn-success").click(function(e) {
    //ajax是自己会提交的.所以要阻止默认的表单提交行为
    e.preventDefault();
    //获取到内容然后使用formData数据提交
    console.log(this.form);
    //局部的话以this当前传参过去.也可以用call
    ajaxformTextSetting(this, "已发布");
  });
  //需求封装一下.因为有两个请求,一个是修改,一个是存草稿
  function ajaxformTextSetting(presentForm, state) {
    //获取到当前点击的form表单
    let fd = new FormData(presentForm.form);
    //id属性没有需要通过append添加
    fd.append("id", articleId);
    //state属性没有,需要自己添加
    fd.append("state", state);
    //文章内容也没有需要自己添加
    //先获取富文本框的内容
    const htmlStr = tinymce.activeEditor.getContent(); //固定写法获取内容
    fd.append("content", htmlStr);
    //发送请求
    $.ajax({
      type: "post",
      url: BigNews.article_edit,
      data: fd,
      contentType: false, //取消默认设置请求头
      processData: false, //取消转换字符串
      success: function(response) {
        console.log(response);
        //修改成功后返回页面
        if (response.code === 200) {
          alert("修改成功");
          location.href = "./article_list.html";
        }
      }
    });
  }
  //点存草稿按钮
  $(".btn-draft").click(function(e) {
    e.preventDefault();
    // alert("嘻嘻");
    ajaxformTextSetting(this, "草稿");

    location.href = "./article_list.html";
  });
});
