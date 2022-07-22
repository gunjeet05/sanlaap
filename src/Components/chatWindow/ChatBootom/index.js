import React, { useCallback, useState } from 'react'
import { useParams } from 'react-router';
import firebase from 'firebase/app'
import { Alert, Icon, Input, InputGroup } from 'rsuite';
import { useProfile } from '../../../Context/Profile.context';
import { database } from '../../../misc/firebase';
import AttachMentBtnModal from './AttachMentBtnModal';
import MicButtonModal from './MicButtonModal';

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
    createdAt:firebase.database.ServerValue.TIMESTAMP,
    likeCount:0,
  }

}

const ChattBottom = () => {

  const [input, setInput]=useState(' ');
  const {profile}=useProfile();
  const {chatId}=useParams();
  const [isLoading, setIsLoading]=useState(false);

 
  
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

  const afteruploadfile=useCallback(async(files)=>{
    setIsLoading(true);
    const updates={};
    files.forEach(file=>{
      const messageData=assembleMessage(profile, window.chatId);
      messageData.file=file;
      const messageId=database.ref('messages').push().key;
      updates[ `/messages/${messageId}`]=messageData;

    })

    const lastmessageId=Object.keys(updates).pop();
    updates[`/rooms/${window.chatId}/lastmessage`]={
      ...updates[lastmessageId], 
      messageId:lastmessageId
    }



    try {
      setIsLoading(true);
      await database.ref().update(updates)
     
      setIsLoading(false);


    } catch (err) {
      Alert.error(err.message)
      
      setIsLoading(false);
      
    }


  },[ profile])


  
  return (
    <div>
      
     <InputGroup >
     <AttachMentBtnModal afteruploadfile={afteruploadfile}/>
     <MicButtonModal  afteruploadfile={afteruploadfile}/>
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
