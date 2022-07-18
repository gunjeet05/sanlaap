import React from 'react'
import { useParams } from 'react-router'
import { Loader } from 'rsuite'
import ChattBottom from '../../Components/chatWindow/ChatBootom'
import Chatttop from '../../Components/chatWindow/ChatTop'
import ChatMessages from '../../Components/chatWindow/messagess'
import { useChatRoom } from '../../Context/RoomContext'

const Chat = () => {

  const {chatId}=useParams();
  const rooms=useChatRoom();
  if(!rooms){
    return <Loader center vertical size='md' content='Loading' speed='slow' />
  }

  const currentRoom=rooms.find(room=>room.id===chatId)

  if(!currentRoom){
    return <h6 className='text-center mt-page'> chat {chatId} not found</h6>
  }
  return (
  <>
  <div className='chat-top' >
<Chatttop/>
  </div>
  <div className='chat-middle'  >
    
    <ChatMessages/>
  </div>
  <div className='chat-bottom '>
    <ChattBottom/>
    
  </div>
  </>

  )
}

export default Chat
