//入口函数
$(function() {
  //需求1,渲染分类列表
  $.ajax({
    type: "get",
    url: BigNews.category_list,

    success: function(response) {
      console.log(response);
      //模板引擎渲染
      if (response.code === 200) {
        let htmlstr = template("classifylist", response);
        $(".category").html(htmlstr);
      }
    }
  });
  //需求2,给上传文件一个监听变化
  $("#inputCover").change(function(e) {
    e.preventDefault();
    //2.1获取到文件里面图片储存的路径
    let file = this.files[0];
    //2.2访问到浏览器生成的随机储存图片路径
    let fileurl = URL.createObjectURL(file);
    //2.3把路径赋值给显示图片的地方
    $(".article_cover").attr("src", fileurl);
  });
  //需求3,给发布时间加个日期插件,好能选择日期
  jeDate("#test", {
    format: "YYYY-MM-DD",
    isTime: false,
    minDate: "2014-09-19 00:00:00"
  });
  //需求4.引入富文本框.能刚好的编辑页面
  //需求5.点修改能提交
  $(".btn-release").click(function(e) {
    e.preventDefault(); //阻止表单默认提交
    ajaxarticlepub(this, "已发布");
  });
  //封装方便共用
  function ajaxarticlepub(present, state) {
    //获取整个表单内容

    let id = $(".category").val();
    console.log(id);
    //文章内容是没有在表单里面的.要获取到文章内容后再设置给fd
    const articletext = tinymce.activeEditor.getContent(); //固定写法获取富文本内容
    console.log(present.form);

    let fd = new FormData(this.form);
    // fd.append("categoryId", id);
    fd.append("content", articletext);
    $.ajax({
      type: "post",
      url: BigNews.article_publish,
      data: fd,
      state: state,
      contentType: false, //取消默认设置请求头
      processData: false, //取消转换字符串
      success: function(response) {
        console.log(response);
        if (response.code === 200) {
          alert("文章操作成功");
        }
      }
    });
  }
  //点击存草稿
  $(".btn-draft").click(function(e) {
    e.preventDefault(); //阻止默认提交
    ajaxarticlepub(this, "草稿");
  });
});
