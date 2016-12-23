$(function() {
	$.ajax({ 
    	url :'/producthandle',
    	type : 'get',
        success : function(data) { 
       		//alert(data);
       		$("#responsediv").html(data);
        }
     });

	//修改了购物车时触发
	simpleCart.bind('update', function() {
		console.log("total: " + simpleCart.toCurrency(simpleCart.grandTotal()));
	});

	
});