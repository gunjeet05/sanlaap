import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router';
import firebase from 'firebase/app'
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../Context/Profile.context';
import { database } from '../../../misc/firebase';

// We basically want to save the data in this format only to the database under new root

function assembleMessage(profile, chatId){
  return {
    roomId:chatId, 
    author:{
      name:profile.name,
      uid:profile.uid, 
      createdAt:profile.createdTime, 
      ...(profile.avatar?{avatar:profile.avatar}:{})
    }, 
    createdAt:firebase.database.ServerValue.TIMESTAMP
  }

}

const ChattBottom = () => {

  const [input, setInput]=useState(' ');
  const {profile}=useProfile();
  const {chatId}=useParams();
  const [isLoading, setIsLoading]=useState(false);

  console.log("profile", profile)
  console.log("chatId", chatId)
  
  const onInputChange=useCallback((value)=>{
    setInput(value);


  },[])

  const OnSubmitClick=async()=>{
    if(input.trim===''){
      return ;
    }
    const messageData=assembleMessage(profile ,chatId);
    messageData.text=input

    const updates={};
    const messageId=database.ref('messages').push().key;
    updates[`/messages/${messageId}`]=messageData;
    updates[`/rooms/${chatId}/lastmessage`]={
      ...messageData, 
      msgId:messageId, 
    };


    try {
      setIsLoading(true);
      await database.ref().update(updates)
      setInput(' ');
      setIsLoading(false);


    } catch (err) {
      Alert.error(err.message)
      
      setIsLoading(false);
      
    }
  }

  const onKeyDown=(ev)=>{
if(ev.keyCode===13){
  ev.preventDefault();
  OnSubmitClick();


}
  }
  return (
    <div>
     <InputGroup>
     <Input 
     placeholder="Enter your message Here"
     value={input}
     onChange={onInputChange} 
     onKeyDown={onKeyDown}/>
     
     <InputGroup.Button color='blue' appearance='primary' onClick={OnSubmitClick}  disabled={isLoading}>
      <Icon icon='send'/>
     </InputGroup.Button>
     </InputGroup>
    </div>
  )
}

export default ChattBottom
