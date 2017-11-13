$(document).ready(function(){
    $('.down_arrow').click(function(){
        $('html, body').animate({
            scrollTop: $('.about_section').offset().top
        }, 2000);    
        $('.slider_slider').addClass('slider-animation');
    });
    $('.about').click(function(){
        $('html, body').animate({
            scrollTop: $('.about_section').offset().top
        }, 2000);    
        $('.slider_slider').addClass('slider-animation');
    });
}); 