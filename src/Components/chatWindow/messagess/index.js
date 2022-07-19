import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { database } from '../../../misc/firebase';
import { convertToArray } from '../../../misc/hepler';
import MessageList from './MessageList';

const ChatMessages = () => {
  const [message, setMessage]=useState(null);
  const {chatId}=useParams();
console.log("messages", message) 
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
  return (
    <ul className='msg-list custom-scroll '>
      {
        chatBoxisEmpty&&
        <span> no messages yet</span>
      }
      {
        canShowMessage&&
        message.map(msg=><MessageList key={msg.id} message={msg}/>)
      }
      
    
    </ul>
  )
}

export default ChatMessages
