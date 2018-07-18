$(document).ready(function(){
    $('.parallax').parallax();

    $('.psalmist .details ul li').each(function(i, objLi1){
        var pad = i * 8;
        $('.psalmist .details ul li:eq('+i+')').animate({'margin-left': pad + 'px'}, 700);
    });

    $(document).on('click', '.btn-glogin', function(){
        $(this).animate({
            height: 0
        }, 400, function(){
            setTimeout(function(){
                $('.glogin-name').fadeIn(400);
            }, 400);
        });
    });

    $(document).on('click', '.btn-glogin-back', function(){
        $('.glogin-name').fadeOut(300, function(){
            $('.btn-glogin').animate({height: '36px'}, 400);
        });
    });

    $(document).on('click', '.btn-wlogin', function(){
        $('.btn-wlogin, .btn-fblogin').animate({
            height: 0
        }, 400, function(){
            $('.login-sep').fadeOut(300, function(){
                setTimeout(function(){
                    $('.wlogin-form').fadeIn(400);
                }, 400);
            })
        });
    });

    $(document).on('click', '.btn-wlogin-back', function(){
        $('.wlogin-form').fadeOut(300, function(){
            $('.btn-wlogin, .btn-fblogin').animate({height: '36px'}, 300, function(){
                $('.login-sep').fadeIn(400);
            });
        });
    });

    $(document).on('click', '.glogin-login', function(e){
        
    });
});
