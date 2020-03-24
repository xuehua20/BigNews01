$(function() {
  //文章评论总搜索
  let page = ""; //页数
  let totalPages = ""; //总页数

  ajaxlist(page);
  console.log(totalPages);
  function ajaxlist(page) {
    $.ajax({
      type: "get",
      url: BigNews.comment_search,
      data: {
        page
      },
      success: function(response) {
        console.log(response.data);
        totalPages = response.data.totalPage;

        let htmlstr = template("commentlist", response.data);

        $("tbody").html(htmlstr);
        //引入分页器
        page = 1;
        pagingDevice(totalPages, page);
      }
    });
  }

  function pagingDevice(lPages, startPage) {
    //  分页器
    //1. 先销毁旧的分页器，传入字符串 destroy 即可,要写动态分页器固定写法
    $("#pagination-demo").twbsPagination("destroy");

    $("#pagination").twbsPagination({
      first: "首页", //首页
      prev: "上一页", //上一页
      next: "下一页", //下一页
      last: "末页", //末页
      //可见的页数上限
      startPage: startPage,
      totalPages: lPages, //总页数

      visiblePages: 7, //显示的页码数
      onPageClick: function(event, cpage) {
        //点击页码触发的函数
        console.log(cpage);

        if (cpage !== startPage) {
          page = cpage;
          ajaxlist(page);
        }
      }
    });
  }
  //点批准  拒绝 删除 事件委托
  $("tbody").on("click", ".btn-refuse", function() {
    //获取到标识id
    let id = $(this).attr("data-id");
    function audit(id, url) {
      $.ajax({
        type: "post",
        url: url,
        data: { id },
        success: function(response) {
          console.log(response);
          let { code, msg } = response;
          if (code === 200) {
            alert(msg);
            ajaxlist(page);
          }
        }
      });
    }
    if ($(this).text() === "批准") {
      //点批准

      audit(id, BigNews.comment_pass);
    } else if ($(this).text() === "拒绝") {
      //点拒绝
      audit(id, BigNews.comment_reject);
    } else {
      //点删除
      $("#myModal2").modal();
      $("#myModal2 .modal-body").text(
        " 您确定要删除这个评论嘛?删除后将不再存在哦"
      );
      $("#myModal2 .btn-primary").text("确定删除");
      $("#myModal2 .btn-primary").attr("data-id", id);

      $("#myModal2 .btn-primary").click(function() {
        if ($("tbody tr").length === 1) {
          page -= 1; //让当前点击的页数自身-1

          audit(id, BigNews.comment_delete);
        } else {
          audit(id, BigNews.comment_delete);
        }
        //删除成功后隐藏模态框
        $("#myModal2").modal("hide");
      });
    }
  });
});
