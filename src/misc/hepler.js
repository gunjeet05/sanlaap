export function getnameinitials(name){
   const namearray=name.toUpperCase().split();
    if(namearray.length>1){
        return namearray[0][0]+namearray[1][0];
    }
    
       return namearray[0][0]
    }
