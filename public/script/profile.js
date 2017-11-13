$(document).ready(function(){
    $('.new_journal').click(function(){
        $(this).toggleClass('new_journal_animate');
        $(this).html('New Journal');
    });
    $('#settings').click(function(){
        $('.modal').fadeIn();   
    });
});
    
var modal = document.getElementsByClassName('modal');

window.onclick = function(event) {
    if (event.target == modal[0]) {
        $('.modal').fadeOut();
    }
}
