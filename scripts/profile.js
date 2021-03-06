$(document).ready(function() {
    
    $(this).on('click','.launchUpdate',function(){
        userID = $(this).data('id');

      $.ajax({
            type: "GET",
            url: "/inventory/getItemDetails/"+itemID,
          }).done(function(data) {
              $("#updateproductname").val(data.productName);
              $("#updatequantity").val(data.quantity);
              $("#updatebaseprice").val(data.basePrice);
              $("#updatesellingprice").val(data.sellingPrice);
              $("#updatelocation").val(data.location);
              $("#updateForm").attr('data-id', data._id);
              var parsedDate = new Date(data.expirationDate);
              var finalDate = parsedDate.getFullYear() + "-" + ("0" + (parsedDate.getMonth() + 1)).slice(-2) + "-" + ("0" + parsedDate.getDate()).slice(-2);
              $("#updateexpiry").val(finalDate);
              parsedDate = new Date(data.dateBought);
              finalDate = parsedDate.getFullYear() + "-" + ("0" + (parsedDate.getMonth() + 1)).slice(-2) + "-" + ("0" + parsedDate.getDate()).slice(-2);
              $("#updatebought").val(finalDate);
          }).fail(function(){
              alert("Can't fetch this item.")
          });
    });
    
    //$('#updateForm').submit(function() {
    $(this).on('submit','#updateForm', function() {
        console.log("ID" + itemID)
        var productName = $("#updateproductname").val();
        var quantity = $("#updatequantity").val();
        var basePrice = $("#updatebaseprice").val();
        var sellingPrice = $("#updatesellingprice").val();
        var expiryDate = $("#updateexpiry").val();
        var bought = $("#updatebought").val();
        var location = $("#updatelocation").val();

        var object = {
            name: productName,
            quantity: quantity,
            base: basePrice,
            selling: sellingPrice,
            expiry: expiryDate,
            bought: bought,
            location: location
        }
        
        const diffTime = expiry-bought;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if ((diffDays) > 0) {
            $.ajax({
                type: "POST",
                data : JSON.stringify(object),
                processData: false,
                contentType: 'application/json',
                url: "/inventory/updateItem/"+itemID,
            }).done(function(data){
            
                $("#"+itemID+".productName").val(productName);
                $("#"+itemID+".quantity").val(quantity);
                $("#"+itemID+".basePrice").val(basePrice);
                $("#"+itemID+".sellingPrice").val(sellingPrice);
                $("#"+itemID+".expiry").val(expiryDate);
                $("#"+itemID+".bought").val(bought);
                $("#"+itemID+".location").val(location);
            });
        } else
            alert("Illegal Date")
    })

    var deleteID;
    $(this).on('click','.launchDelete',function(){
        deleteID = $(this).data('id');
    });

    $(this).on('click','#btnDeleteItem',function(){
        $.ajax({
            url: "/inventory/deleteItem/"+deleteID,
            type: 'DELETE'
        });
    });
});