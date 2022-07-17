


export function getnameinitials(name){
   const namearray=name.toUpperCase().split();
    if(namearray.length>1){
        return namearray[0][0]+namearray[1][0];
    }
    
       return namearray[0][0]
    }


    export function convertToArray(snapVal){
      return snapVal?Object.keys(snapVal).map(roomId=>{
         return{...snapVal[roomId], id:roomId}
      }): []
    }