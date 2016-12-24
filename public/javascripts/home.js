var list = [];
$(function() {
	$.ajax({ 
    	url :'/producthandle',
    	type : 'get',
        success : function(data) { 
       		//alert(data);
          //显示在前端处理的html
          var html = "<div class='content-top'><div class='content-top1'>"; 
          //var list = [];
          for(var i = 0; i < data.length; i++){
            //处理显示所有的货物的html
            var productjson = "{'name':'" + data[i].product_name + "', 'price':'" + data[i].product_price + "'}";
            //alert(productjson);
            list.push(productjson);
            html += "<div class='col-md-3 col-md2'><div class='col-md1 simpleCart_shelfItem'><a href='#'><img class='img-responsive' src=";
            html += "'" + data[i].product_path + "'";
            html += " alt='' /></a><h3 class='item_id item_name'><a href='#'>";
            html += data[i].product_name;
            html += "</a></h3><div class='price'><h5 class='item_price'>";
            html += "$" + data[i].product_price;
            html += "</h5><a href='#' class='item_add'>添加到购物车</a><div class='clearfix'> </div></div></div></div>";
            //记录所有的货物
          }
          html += "<div class='clearfix'></div></div>";
          alert("1" + list);
       		$("#responsediv").html(html);      
        }
     });
  
  //alert("2" + list);
});
/*simpleCart({
  cartColumns:[
      {attr : "image", label : "图片展示", view : "image"},
      {attr : "name", label : "商品名称"},
      {attr : "quantity", label : "数量"},
      {attr : "remove", label : "操作", text : "移除"},
      {attr : "price", label : "单价"},
      {attr : "total", label : "总价", view : "currency"}
  ]
});*/