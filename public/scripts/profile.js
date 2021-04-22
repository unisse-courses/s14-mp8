$(document).ready(function() {
    
    $('#updateUser').submit(function() {
        userID = $("#userID").val();
        
        var name = $("#updatename").val();
        var username = $("#updateusername").val();
        var password = $("#updatepassword").val();
        var address = $("#updateaddress").val();
        

        var object = {
            name: name,
            username: username,
            address: address
        }
        
        console.log(object);
        
        $.ajax({
                type: "POST",
                data : JSON.stringify(object),
                processData: false,
                contentType: 'application/json',
                url: "/profile/updateUser/"+userID,
            }).done(function(data){
                $("#"+userID+".name").val(name);
                $("#"+userID+".username").val(username);
                $("#"+userID+".address").val(address);
            });
        })    
});

//
//    var deleteID;
//    $(this).on('click','.launchDelete',function(){
//        deleteID = $(this).data('id');
//    });
//
//    $(this).on('click','#btnDeleteItem',function(){
//        $.ajax({
//            url: "/inventory/deleteItem/"+deleteID,
//            type: 'DELETE'
//        });
//    });
