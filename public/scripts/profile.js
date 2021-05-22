$(document).ready(function() {
    
    $("#passHide").hide();
    
    $("#passBtnMod").click(function(){
        $("#passHide").show();
        $(".EditProfile").removeClass("EditProfile").addClass("EditProfilePass");
        $(".profilePic").removeClass("profilePic").addClass("profilePicPass");
        $('#currPass').attr('name', 'currPass');
        $('#newPass1').attr('name', 'newPass1');
        $('#newPass2').attr('name', 'newPass2');
        $(this).hide();
    })
    
    $("#passBtnCan").click(function(){
        $("#passHide").hide();
        $("#currPass").removeAttr("name");
        $("#newPass1").removeAttr("name");
        $("#newPass2").removeAttr("name");
        $(".EditProfilePass").removeClass("EditProfilePass").addClass("EditProfile");
        $(".profilePicPass").removeClass("profilePicPass").addClass("profilePic");
        $("#passBtnMod").show();
    })
});

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

