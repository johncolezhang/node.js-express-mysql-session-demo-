$(function(){ 
    $("#login1").click(function(){ 
        location.href = 'login';
    });
    $("#register1").click(function(){ 
        var username = $("#username").val();
        var password = $("#password").val();
        var password1 = $("#password1").val();
        if(password !== password1){ 
            $("#password").css("border","1px solid red");//显示红框
            $("#password1").css("border","1px solid red");
        }else if(password === password1){
        var signupdata = {"uname":username,"upwd":password};
        $.ajax({ 
            url: '/registerhandle',
            type: 'post',
            data: signupdata,
            success: function(data){
                //alert(data);
                if(data != false){ 
                    alert('注册成功:' + data);
                    location.href = 'login';
                }else{
                    alert('注册失败');
                }
            }
        }); 
    }
    });
});