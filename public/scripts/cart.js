$(document).ready(function() {
    
    $(this).on('click','.plus',function(){
        itemID = this.id
        
        selector = '#aaa'+itemID
        console.log(selector)
        
        num = $(selector).val();
        num++;
        //AJAX INC
        $(selector).val(num);
        
        add = parseInt($('#atcNumIn').text());
        add++;
        $('#atcNumIn').text(add);
        
        $.ajax({
                type: "POST",
                url: "/cart/inc/"+itemID,
            }).done(function(data){});
    });
    
    $(this).on('click','.minus',function(){
        itemID = this.id
        
        selector = '#aaa'+itemID
        console.log(selector)
        
        num = $(selector).val();
        if(num == 1){
            console.log("CANNOT GO LOWER THAN 1")
        }else{
            num--;
            add = parseInt($('#atcNumIn').text());
            add--;
            $('#atcNumIn').text(add);
            //AJAX DEC
            
             $.ajax({
                type: "POST",
                url: "/cart/dec/"+itemID,
            }).done(function(data){});
            
        }
        $(selector).val(num);
    });
    
    
    //ADMIN
//    $(this).on('click', '.delButton', function(){
//        $(".roe").remove();
//    });
    
    
});


//    $('.addToCart').on("click",function(){
//        itemID = this.id;
//        
//        console.log(itemID);
//        var object = {
//            product : itemID,
//        }
//        
//        $.ajax({
//                type: "POST",
//                url: "/menu/addToCart/"+itemID,
//            }).done(function(data){});
//        
//        //Increment Cart Counter
//        add = parseInt($('#atcNumIn').text());
//        add++;
//        $('#atcNumIn').text(add);
//    });