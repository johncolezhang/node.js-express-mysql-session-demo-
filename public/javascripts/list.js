$(function() {
	simpleCart({
  		checkout: { //处理购物请求
	        type: "SendForm" , 
	        url: '/checkouthandle' ,
	        method: 'POST',
	        success: "user"
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

	/*$('#checkoutlist').click(function() {
		alert(SimpleCart.items()); 
	});*/
});



