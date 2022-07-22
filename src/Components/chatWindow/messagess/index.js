import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Alert } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { convertToArray, groupby } from '../../../misc/hepler';
import MessageList from './MessageList';



const ChatMessages = () => {
  const [message, setMessage]=useState(null);
  const {chatId}=useParams();

  const canShowMessage= message && message.length>0;
  const chatBoxisEmpty=message&&message.length===0;

  useEffect(()=>{
    const messageRef=database.ref("/messages");
    messageRef
    .orderByChild('roomId')
    .equalTo(chatId)
    .on('value', (snap)=>{
      const data=convertToArray(snap.val());
      setMessage(data);



    })


    return ()=>{
      messageRef.off('value')
    }
  }, [chatId])


  const onhandleClick=useCallback(async(uid)=>{

    const adminref=database.ref(`/rooms/${chatId}/admins`)
    let alrtmsg;
    await adminref.transaction(admins=>{

      if(admins){
      if(admins[uid]){
        admins[uid]=null;
        alrtmsg="Removed from admin"
      }

      else{
        admins[uid]=true;

        alrtmsg="Added as admin";

      }

     
    }
  
    return admins
  })

  Alert.info(alrtmsg, 4000);

   

  },[chatId])



  const handleLikeClick=useCallback(async msgId=>{

    const messageRef=database.ref(`/messages/${msgId}`)
    let alrtmsg;
    const {uid}=auth.currentUser;
    
    await messageRef.transaction(msg=>{

      if(msg){
      if(msg.likes&&msg.likes[uid]){
        msg.likeCount-=1;

        msg.likes[uid]=null;

      

        alrtmsg="Romoved Like Click again to Like"
      }

      else{
        msg.likeCount+=1;
        if(!msg.likes){
          msg.likes={};

        }
        msg.likes[uid]=true;
        alrtmsg="Added Like";

      }

     
    }
  
    return msg;

  })

  Alert.info(alrtmsg, 4000);

   

  },[ ])

  const handleDelete=useCallback(async (messageId, file)=>{
    if(!window.confirm("Do you really want to delete the message?")){
      return ;
    }
    const isLast=message[message.length-1].id===messageId;

    const updates={};
    updates[`/messages/${messageId}`]=null;
    if(isLast&&message.length>1){
      updates[`/rooms/${chatId}/lastmessage`]={
        ...message[message.length-2],
        messageId: message[message.length-2].id, 

      }


    }

    if(isLast&&message.length===1){
      updates[`/rooms/${chatId}/lastmessage`]=null;

    }

    try {

      await database.ref().update(updates);
      
       Alert.success("Message Deleted Sucessfully", 4000)
      
    } catch (error) {
// eslint-disable-next-line consistent-return
 return Alert.error(error.message, 4000);




      
    }

    try {

    const fileRef=storage.refFromURL(file.url)
    fileRef.delete()
    
      
    } catch (error) {

Alert.error(error.message, 4000);



      
    }






  },[chatId, message])


  const renderMessage=()=>{
    const group=groupby(message, items=>new Date(items.createdAt).toDateString()

    );



    const items=[];
    Object.keys(group).forEach((date)=>{

items.push(<li key={date} className="text-center mb-1 padded">
  {date}

</li>)

const msgs =group[date].map(msg=>(
  <MessageList 
  key={msg.id}
   message={msg} 
   onhandleClick={onhandleClick} 
   handleLikeClick={handleLikeClick}
    handleDelete={handleDelete}/>

))
items.push(...msgs);

    });
  return items;
  }


 
  return (
    <ul className='msg-list custom-scroll '>
      {
        chatBoxisEmpty&&
        <span> no messages yet</span>
      }
      {
        canShowMessage&&

        renderMessage()
       
      }
      
    
    </ul>
  )
}

export default ChatMessages
