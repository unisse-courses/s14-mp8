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
    
    // Get the modal
    var modal = document.getElementById("passmodalCont");

    // Get the button that opens the modal
    var btn = document.getElementById("passBtnMod");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    btn.onclick = function() {
      modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
      modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
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

