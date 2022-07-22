import { ReactMic } from 'react-mic';

import React, { useCallback, useState } from 'react'
import { Alert, Icon, InputGroup } from 'rsuite';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';

const MicButtonModal = ({afteruploadfile}) => {
    const {chatId}=useParams();
    
    const [isRecording,setIsRecording]=useState();
    const[isLoading, setIsLoading]=useState(false);


    const onclick=useCallback(()=>{
        setIsRecording(p=>!p);

    },[])

    const onUpload=useCallback(async (data)=>{

        setIsLoading(true);
        try {

        

        const snap=await storage.ref(`/chat/${chatId}`).child(`audio_${Date.now()}.mp3`).put(data.blob, {
            cacheControl:`public,max-age=${3600*24*3}`
        });
        const files={
            contentType:snap.metadata.contentType,
            name:snap.metadata.name, 
            url: await snap.ref.getDownloadURL(), 

        }
        setIsLoading(false);
        afteruploadfile([files])

    }
    catch(error){
        Alert.error(error.message);
        setIsLoading(false);


    }
    }, [chatId, afteruploadfile])
  return (
    <InputGroup.Button onClick={onclick}
     disabled={isLoading}
     className={isRecording?"animate-blink":" "}>


        <Icon icon="microphone"/>
        <ReactMic 
        record={isRecording} 
        className="d-none"
        onStop={onUpload}
        mimeType="audio/mp3"
        />

       


    </InputGroup.Button>
  )
}

export default MicButtonModal
