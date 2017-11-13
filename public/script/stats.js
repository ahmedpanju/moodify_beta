$(function(){ 
    if (window.location.href.toLowerCase().indexOf("loaded") < 0) {
        window.location = window.location.href + '?loaded=1'
    }
});