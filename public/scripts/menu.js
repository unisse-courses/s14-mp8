$(document).ready(function() {
    
    
    $('.addToCart').on("click",function(){
        itemID = this.id;
        
        console.log(itemID);
        var object = {
            product : itemID,
        }
        
        $.ajax({
                type: "POST",
                url: "/menu/addToCart/"+itemID,
            }).done(function(data){});
        
        //Increment Cart Counter
        add = parseInt($('#atcNumIn').text());
        add++;
        $('#atcNumIn').text(add);
    });
    
    
//    $('.a').submit(function() {
//        userID = $("#userID").val();
//        
//        var name = $("#updatename").val();
//        var username = $("#updateusername").val();
//        var password = $("#updatepassword").val();
//        var address = $("#updateaddress").val();
//        
//
//        var object = {
//            name: name,
//            username: username,
//            address: address
//        }
//        
//        console.log(object);
//        
//        $.ajax({
//                type: "POST",
//                data : JSON.stringify(object),
//                processData: false,
//                contentType: 'application/json',
//                url: "/profile/updateUser/"+userID,
//            }).done(function(data){
//                $("#"+userID+".name").val(name);
//                $("#"+userID+".username").val(username);
//                $("#"+userID+".address").val(address);
//            });
//    })   
     
});