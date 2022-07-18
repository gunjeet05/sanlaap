import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Nav , Loader} from 'rsuite'
import { useChatRoom } from '../../Context/RoomContext'
import RoomItems from './RoomItems'

const ChatRoom = ({topHeight}) => {
  const location=useLocation();

  const rooms=useChatRoom();
    console.log("Height of upper component", topHeight)
    console.log("Loaction ", location.pathname)
  return (
    <Nav 
    
    appearance='subtle'
    vertical
    reversed
    className='overflow-y-scroll custom-scroll '
    style={{
        height:`calc(100%-${topHeight}px)`,
    }}

    activeKey={Location.pathname}
    >

      {!rooms&&(
      <Loader center vertical content='Loading' speed='slow'/>
      )}

      {
        rooms&&rooms.length>0&&
        rooms.map(room=>(
              
    <Nav.Item componentClass={Link}
     to={`/chat/${room.id}`} 
     key={room.id}
     eventKey={`/chat/${room.id}`}
     >
    <RoomItems room={room}/>
</Nav.Item>

        ))
      }
  

    </Nav>
      
  )


}

export default ChatRoom
