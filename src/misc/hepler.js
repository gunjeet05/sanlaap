


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


    export  async function getUserupdates(userId , keyToUpdate , value , db ) {
      const updates={}; 
      updates[`profile/${userId}/${keyToUpdate}`]=value;


      const getMessage =db.ref('/messages').orderByChild('author/uid').equalTo(userId).once('value');
      const getRooms =db.ref('/rooms').orderByChild('lastMessage/author/uid').equalTo(userId).once('value');
      const [msnap, rsnap]=await Promise.all([getMessage, getRooms]);
      msnap.forEach(messagesnapval=>{
updates[`messages/${messagesnapval.key}/author/${keyToUpdate}`]=value;

      })

      rsnap.forEach(roomssnap=>{
         updates[`/messages/${roomssnap.key}/lastmessage/authors/${keyToUpdate}`]=value;

      })


      return updates;

    }