$(function(){ 
    $("#register0").click(function(){ 
        location.href = 'register';
    });
    $("#login0").click(function(){ 
        var username = $("#username").val();
        var password = $("#password").val();
        var userdata = {"uname":username,"upwd":password};
        if(username != '' &&password != ''){
        $.ajax({ 
            url :'/loginhandle',
            type : 'post',
            data : userdata,
            success : function(data){ 
                //alert("AJAX 请求已成功完成");
                alert(data);

                    location.href = "home";
                //log.console(data);
                //location.href = 'home';
            }
        })
        }
    });
});