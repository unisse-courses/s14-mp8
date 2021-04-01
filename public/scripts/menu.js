$(document).ready(function() {
    
    var milkIDs=[]
    
    $('.addToCart').click(function(){
        itemID = this.id;
        
        add = parseInt($('#atcNumIn').text());
        add++;
        $('#atcNumIn').text(add);
        
        console.log(add);
        console.log(itemID);
        
        if(milkIDs.length == 0){
            var item = {
                id : itemID,
                count : 1
            }
            
            milkIDs.push(item);
        }
        else{
            for(i=0; i < milkIDs.length; i++){
                if(milkIDs[i].id == itemID){
                    milkIDs[i].count++;
                    break;
                }
            } 
        }
        
        console.log(milkIDs);
    });
    
    
    
    
});