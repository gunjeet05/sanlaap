import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router';
import { Alert, Button } from 'rsuite';
import { auth, database, storage } from '../../../misc/firebase';
import { convertToArray, groupby } from '../../../misc/hepler';
import MessageList from './MessageList';


const messageRef=database.ref('/messages');



const PAGE_SIZE = 15;


function shouldScrollToBottom(node, threshold = 30) {
  const percentage =
    (100 * node.scrollTop) / (node.scrollHeight - node.clientHeight) || 0;

  return percentage > threshold;
}
const ChatMessages = () => {
  const [message, setMessage]=useState(null);
  const {chatId}=useParams();
  const [limit, setLimit] = useState(PAGE_SIZE);
  const selfRef = useRef();

  const canShowMessage= message && message.length>0;
  const chatBoxisEmpty=message&&message.length===0;

  const loadMessages = useCallback(limitToLast => {
      const node = selfRef.current;
      
      messageRef.off();

      messageRef
        .orderByChild('roomId')
        .equalTo(chatId)
        .limitToLast(limitToLast || PAGE_SIZE)
        .on('value', snap => {
          const data = convertToArray(snap.val());
          setMessage(data);

          if (shouldScrollToBottom(node)) {
            node.scrollTop = node.scrollHeight;
          }
        });

      setLimit(p => p + PAGE_SIZE);
    },
    [chatId]
  );

  const onLoadMore = useCallback(() => {
    const node = selfRef.current;
    const oldHeight = node.scrollHeight;

    loadMessages(limit);

    setTimeout(() => {
      const newHeight = node.scrollHeight;
      node.scrollTop = newHeight - oldHeight;
    }, 200);
  }, [loadMessages, limit]);

  useEffect(()=>{
   
  const node=selfRef.current;
  loadMessages();
  setTimeout(() => {
    node.scrollTop = node.scrollHeight;
  }, 200);

  return ()=>{
    messageRef.off('value')
  }
    },[loadMessages])


    
 


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

    const messageRefs=database.ref(`/messages/${msgId}`)
    let alrtmsg;
    const {uid}=auth.currentUser;
    
    await messageRefs.transaction(msg=>{

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
  
      
      
      <ul ref={selfRef} className="msg-list custom-scroll">
      {message && message.length >= PAGE_SIZE && (
        <li className="text-center mt-2 mb-2">
          <Button onClick={onLoadMore} color="green">
            Load more
          </Button>
        </li>
      )}
      
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
