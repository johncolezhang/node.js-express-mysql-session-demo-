$(function() {
	simpleCart({
  		checkout: { 
	        type: "SendForm" , 
	        url: '/checkouthandle' ,
	        method: 'POST',
	        success: function(data) {
	        	//alert(data);
	        }
	    },
	});

  var name = Cookies.get("name");
  //alert(name);
  if(name !== undefined) {
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

	/*$('#checkoutlist').click(function() {
		alert(SimpleCart.items()); 
	});*/
});



