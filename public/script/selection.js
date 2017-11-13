$(document).ready(function(){
    $('#sleep').on('click', function(){
        $('#sleep2').attr('disabled', $(this).is(':checked'));    
    });
    $('#diet').on('click', function(){
        $('#diet2').attr('disabled', $(this).is(':checked'));    
    });
    $('#exercise').on('click', function(){
        $('#exercise2').attr('disabled', $(this).is(':checked'));    
    });
    $('#mood').on('click', function(){
        $('#mood2').attr('disabled', $(this).is(':checked'));    
    });
    $('#happiness').on('click', function(){
        $('#happiness2').attr('disabled', $(this).is(':checked'));    
    });
    $('#sadness').on('click', function(){
        $('#sadness2').attr('disabled', $(this).is(':checked'));    
    });
});