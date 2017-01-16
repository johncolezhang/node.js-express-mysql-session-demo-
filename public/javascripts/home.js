$(function() {
  //var list = [1];
  //加载货物
	$.ajax( { 
    	url : '/producthandle',
    	type : 'get',
        success : function(data) { 
       		//alert(data);
          //显示在前端处理的html
          var html = "<div class='content-top'>"; 
          //var list = [];
          for(var i = 0; i < data.length; i++) {
            //处理显示所有的货物的html
            var productjson = "{'name':'" + data[i].product_name + "', 'price':'" + data[i].product_price + "'}";
            //alert(productjson);
            //list.push(productjson);
            html += "<div class='col-md-3 col-md2 top-bottom'><div class='col-md1 simpleCart_shelfItem'><a href='#'><img class='img-responsive item_image' src=";
            html += "'" + data[i].product_path1 + "'";
            html += " alt='' /></a>";
            /*html +="<div class='item_image' style='display: none'>";//放置图片
            html += data[i].product_path;//放置图片
            html += "</div>";//放置图片*/
            html += "<h3 class='item_id item_name'><a href='#'>";
            html += data[i].product_name;
            html += "</a></h3><div class='price'><h5 class='item_price'>";
            html += data[i].product_price + "元";
            html += "</h5><a class='item_add' id='item_add'>添加到购物车</a></div></div></div>";
            //记录所有的货物
            //list.push("item_add" + data[i].product_path);
          }
          html += "</div>";
          //alert(html);
       		$("#responsediv").html(html);      
        }
     });

  //alert(list);

  //  加载购物车
  /*
  $.ajax({
    url : '/cartinfo',
    type : 'get',
    success : function(data) {
      alert(data);
      //alert(simpleCart.showlist());
    } 
  });*/

  var name = Cookies.get("name");
  //alert(name);
  if(name !== undefined) {//已经有cookie
    $("#home_login").text("欢迎！" + name);
    $("#home_login").attr("href", "userinfo");
    $("#home_register").text("注销");
    $("#home_register").attr("href", "");
  }

  $('#home_register').click(function() {
    if(name !== undefined) {
      Cookies.remove("name");
      alert("注销成功")
    }
    $("#home_register").attr("href", "home");
  });

//测试showlist
/*$("#show_list").click(function() {
  alert(2);
  alert(simpleCart.showlist());
  });
  */
});
