import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { Loader } from 'rsuite'
import ChattBottom from '../../Components/chatWindow/ChatBootom'
import Chatttop from '../../Components/chatWindow/ChatTop'
import ChatMessages from '../../Components/chatWindow/messagess'
import { CurrentRoomProvider } from '../../Context/Currentroom.context'
import { useChatRoom } from '../../Context/RoomContext'
import { auth } from '../../misc/firebase'
import { convertToArraywithoutid } from '../../misc/hepler'


const Chat = () => {

  const {chatId}=useParams();
  const rooms=useChatRoom();
  useEffect(() => {
    window.chatId = chatId;
  }, [chatId]);
  

 
  if(!rooms){
    return <Loader center vertical size='md' content='Loading' speed='slow' />
  }

  const currentRoom=rooms.find(room=>room.id===chatId)
  const {name, description}=currentRoom;
  const admins=convertToArraywithoutid(currentRoom.admins);
const isAdmin=admins.includes(auth.currentUser.uid);

  

  
  const roomData={
    name,
     description,
     admins, 
     isAdmin
  };
  if(!currentRoom){
    return <h6 className='text-center mt-page'> chat {chatId} not found</h6>
  }
  return (
  <CurrentRoomProvider data= { roomData }>
  <div className='chat-top' >
<Chatttop/>
  </div>
  <div className='chat-middle'  >
    
    <ChatMessages/>
  </div>
  <div className='chat-bottom '>
    <ChattBottom/>
    
  </div>
  </CurrentRoomProvider>

  )
}

export default Chat
