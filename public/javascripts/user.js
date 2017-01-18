$(function() {

	simpleCart({
  		checkout: { //处理购物请求
	        type: "SendForm" , 
	        success: true
	     }
	});

	$.ajax( { 
    	url : '/selectorder',
    	type : 'post',
        success : function(data) {
        	var length = data.length;
        	var html = "";
        	for( var i = 0; i < length; i++ ) {
        		var items = data[i].itemCount;
        		html += "<table class='table table-striped table-bordered'>";
        		html +="<thead><tr><th>名字</th><th>价格</th><th>数量</th><th>单货物总价</th></tr></thead>";
				html +="<tbody>";
        		for(var j = 1; j <= items; j++){
        			var name = data[i]['item_name_' + j];
        			var quantity = data[i]['item_quantity_' + j];
        			var price = data[i]['item_price_' + j];
        			//alert('name:' + name +'\nquantity:' + quantity + '\nprice:' + price);
        			html += "<tr><td>";
        			html += name;
        			html += "</td><td>";
        			html += price;
        			html += "</td><td>";
        			html += quantity;
        			html += "</td><td>";
        			html += price * quantity;
        			html += "</td></tr>";
        		}
        		html +="</tbody></table>"; 
        	}
        	$('#main').append(html);
        }
    });

	var name = Cookies.get("name");
  //alert(name);
  if(name !== undefined) {
    $("#home_login").text("欢迎！" + name);
    $("#home_login").attr("href", "user");
    $("#home_register").text("注销");
    $("#home_register").attr("href", "");
  }

  $('#home_register').click(function() {//注销
    if(name !== undefined) {
      Cookies.remove("name");
      alert("注销成功")
    }
    $("#home_register").attr("href", "home");
  });
})