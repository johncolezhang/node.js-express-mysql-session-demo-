$(function() {
	$.ajax({ 
    	url :'/producthandle',
    	type : 'get',
        success : function(data){ 
       		//alert(data);
       		$("#responsediv").html(data);
        }
     });
});