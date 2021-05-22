$(document).ready(function() {
    
    $(this).on('click','.plus',function(){
        itemID = this.id;
        
        selSub = '#sub'+itemID;
        subtotal = $(selSub).html();
        
        selPrice ='#price'+itemID;
        price = $(selPrice).html();
        
        subtotal = parseInt(subtotal) + parseInt(price);
        
        $(selSub).html(subtotal);
        
        selQty = '#qty'+itemID
        
        num = $(selQty).val();
        num++;
        //AJAX INC
        $(selQty).val(num);
        
        add = parseInt($('#atcNumIn').text());
        add++;
        $('#atcNumIn').text(add);
        
        endPrice = $('#totPriceID').html();
        totalPrice = parseInt(endPrice) + parseInt(price);
        $('#totPriceID').html(totalPrice);
        
        
        $.ajax({
                type: "POST",
                url: "/cart/inc/"+itemID,
            }).done(function(data){});
    });
    
    $(this).on('click','.minus',function(){
        itemID = this.id
        
        selQty = '#qty'+itemID
        console.log(selQty)
        
        num = $(selQty).val();
        if(num == 1){
            console.log("CANNOT GO LOWER THAN 1")
        }else{
            num--;
            add = parseInt($('#atcNumIn').text());
            add--;
            $('#atcNumIn').text(add);
            
            selSub = '#sub'+itemID;
            subtotal = $(selSub).html();

            selPrice ='#price'+itemID;
            price = $(selPrice).html();

            subtotal = parseInt(subtotal) - parseInt(price);


            $(selSub).html(subtotal);
            
            endPrice = $('#totPriceID').html();
            totalPrice = parseInt(endPrice) - parseInt(price);
            $('#totPriceID').html(totalPrice);
            
            $.ajax({
                type: "POST",
                url: "/cart/dec/"+itemID,
            }).done(function(data){});
            
        }
            $(selQty).val(num);
    });
    
    $(this).on('dblclick','.closePic',function(){
        itemID = this.id;
        
        totalPrice = parseInt($('#totPriceID').html());
        selSub = '#sub'+itemID;
        subtotal = $(selSub).html();
        totalPrice = totalPrice - parseInt(subtotal);
        $('#totPriceID').html(totalPrice);
        
        selQty = '#qty'+itemID
        num = $(selQty).val();
        
        add = parseInt($('#atcNumIn').text());
        
        add = add - num;
        if(add == 0){
            $('.btnCheck').addClass("disabled");
            $('.toolTip').removeClass("toolTip").addClass("toolTipHide");
            $('tbody').html("<tr><td></td><td>Shopping Cart is Empty</td><td></td><td></td><td></td><td></td></tr>");
            $('#atcNumIn').text(add);
        }else{
            $('#atcNumIn').text(add);    
        }
        
        
        $.ajax({
                type: "POST",
                url: "/cart/removeItem/"+itemID,
        }).done(function(data){});
        
        selRow = "#row"+itemID
        $(selRow).remove();
    });
    
    $(".closePic").hover(function(){
        $(".toolTipHide").removeClass("toolTipHide").addClass("toolTip");
    },function(){
        $(".toolTip").removeClass("toolTip").addClass("toolTipHide");
    });
    
    
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