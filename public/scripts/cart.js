$(document).ready(function() {
    
    $(this).on('click','.plus',function(){
        num = $('#milkNum').val();
        num++;
        $("#milkNum").val(num);
    });
    
    $(this).on('click','.minus',function(){
        num = $('#milkNum').val();
        if(num > 1){
            num--;    
        }
        $("#milkNum").val(num);
    });
    
    $(this).on('click', '.delButton', function(){
        $(".roe").remove();
    });
});


//$(document).ready(function() {
//    $(“p”).click(function() {
//        $(this).css(“color”, “green”)
//        ;
//    });
//});
