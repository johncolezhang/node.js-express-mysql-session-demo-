$(function() {
	$.ajax( { 
    	url : '/producthandle',
    	type : 'get',
        success : function(data) { 		
			var html = "<table class='table table-striped table-bordered'>";
			html +="<thead><tr><th>名字</th><th>价格</th><th>路径</th><th>操作</th></tr></thead>";
			html +="<tbody>";
			for(var i = 0; i < data.length; i++) {
				html +="<tr><td>";
				html += data[i].product_name;
				html +="</td><td>";
				html += data[i].product_price;
				html +="</td><td>";
				html += data[i].product_path1;
				html +="</td><td style='text-align:center;vertical-align:middle;'>";
			/*	html +="<a href='change_product' class='btn btn-small btn-warning'><i class='icon-edit'>修改</i>	</a>";	*/			
                html +="<a href='delete_product?product_name=";
				html +=data[i].product_name+"'";
				html +="class='delete btn btn-small'><i class='icon-remove'>删除</i></a>";
				html +="</td></tr>";			
			}
			html +="</tbody></table>";  
		//	 $("#widget-content").html(html);
			 $('#widget-content').append(html);
        }
    });

	$("#widget-content").on("click","button", function() {
    	//alert("ky");
 	});
 	$("#widget-content").on("click","a", function() {
    	//alert("kys");
 	});

});


/*
$(document).ready(function() {
    $("button").click(function(){
		$(this).slideToggle("slow");	 //.parent().
	});  
});*/