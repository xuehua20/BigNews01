//入口函数
$(function() {
  //需求1,先给服务器发送请求,获取到数据列表并渲染上页面
  //渲染经常用,所以我们封装起来以方便复用
  function htmlRendering() {
    $.ajax({
      type: "get",
      url: BigNews.category_list,
      success: function(response) {
        //获取成功后准备模板引擎进行渲染页面
        let htmlstr = template("Rendering", response);
        $(".table tbody").html(htmlstr);
      }
    });
  }
  htmlRendering();
  //需求2点新增分类的时候添加内容
  $(".btn-success").click(function() {
    //2.1使用弹窗太不完美了.所以用模态框
    $("#myModal3").modal();
    $("#myModal3 #myModalLabel").text("新增分类");
    $("#myModal3 .btn-primary")
      .text("新增分类") //2.2改变按钮文字
      .attr("class", "btn  btn-primary btn-success"); //2.3改变按钮颜色
  });
  //需求3点编辑的时候能编辑内容,
  //但是由于这些元素是动态生成的所以我们需要使用事件委托;
  $(".table tbody").on("click", ".btn-info", function() {
    //3.1获取到自定义属性里面的id 方便确定自己到底修改的是哪条
    let id = $(this).attr("data-id");
    console.log(id);
    //调用模态框
    $("#myModal3").modal();
    $("#myModal3 #myModalLabel").text("编辑分类");
    $("#myModal3 .btn-primary")
      .html("编辑") //2.2改变按钮文字
      .attr("class", "btn btn-primary  btn-info ") //2.3改变按钮颜色
      .attr("data-id", id); //把id赋值给模态框按钮.好后面点击按钮时能有参数返回给后台
    //并获取到当前点击条的文本,需要使用到父辈元素parents来获取儿子children()的文本 eq(0)第几个儿子 trim()去除首尾空格
    let nametext = $(this)
      .parents("tr")
      .children()
      .eq(0)
      .text()
      .trim();
    let slugtext = $(this)
      .parents("tr")
      .children()
      .eq(1)
      .text()
      .trim();
    console.log(nametext);
    console.log(slugtext);

    //获取到文本添加到模态框里面
    $("#inputEmail3").val(nametext);
    $("#inputPassword3").val(slugtext);
  });
  //模态框的一个按钮有两个分支.第一个分支.新增,第二个分支是编辑.所以使用if来判断分支条件
  $("#myModal3 .btn-primary").click(function() {
    if ($(this).text() === "新增分类") {
      // 2.5点击完新增分类后出现在服务器里面并且渲染到页面
      //2.6 获取到文本内容
      let nametext = $("#inputEmail3")
        .val()
        .trim();
      let slugtext = $("#inputPassword3")
        .val()
        .trim();
      //向服务器发送请求
      $.ajax({
        type: "post",
        url: BigNews.category_add,
        data: {
          name: nametext,
          slug: slugtext
        },
        success: function(response) {
          //判断一下是否创建成功.成功渲染页面并让模态框隐藏
          if (response.code === 201) {
            $("#myModal3").modal("hide");
            htmlRendering();
          }
        }
      });
    } else {
      //文章类别的编辑;
      $.ajax({
        type: "post",
        url: BigNews.category_edit,
        data: {
          id: $(this).attr("data-id"),
          name: $("#inputEmail3")
            .val()
            .trim(),
          slug: $("#inputEmail3")
            .val()
            .trim()
        },
        success: function(response) {
          //修改成功后,隐藏模态框
          if (response.code === 200) {
            $("#myModal3").modal("hide");
            $("#myModal3 .btn-primary").text(""); //2.2改变按钮文字

            //渲染页面
            htmlRendering();
          }
        }
      });
    }
  });
  //需求4,点击删除能删除数据
  $(".table tbody").on("click", ".btn-danger", function() {
    let id = $(this).attr("data-id");
    $("#myModal2").modal();
    $("#myModal2 .modal-body").text(
      " 您确定要删除这个分类嘛?删除后将不再存在哦"
    );
    $("#myModal2 .btn-primary").text("确定删除");
    $("#myModal2 .btn-primary").attr("data-id", id);
  });
  //4.1删除前给个提示框
  $("#myModal2 .btn-primary").click(function() {
    let id = $(this).attr("data-id");
    $.ajax({
      type: "post",
      url: BigNews.category_delete,
      data: {
        id: id
      },
      success: function(response) {
        console.log(response);
        if (response.code === 204) {
          $("#myModal2").modal("hide");
          htmlRendering();
        }
      }
    });
  });

  //2.4,让模态框隐藏后文本清空
  $("#myModal3").on("hide.bs.modal", function() {
    $("form")[0].reset(); //使用原生的快速清空表单
  });
});
