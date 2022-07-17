import React, { useEffect, useRef, useState } from 'react'
import { Divider } from 'rsuite'
import CreateRoomButtonModal from './CreateRoomButtonModal'
import DashBoardToggle from './DashBoard/DashBoardToggle'
import ChatRoom from './Rooms/ChatRoom'

function Sidebar() {

  const topSideRef=useRef();;
  const [isHeight, setIsHEight]=useState(0);
  useEffect(()=>{
    if(topSideRef.current){
      setIsHEight(topSideRef.current.scrollHeight)
  
    }

  },[topSideRef])
  return (
    <div className='h-100 pt-2'>
        <div ref={topSideRef}>
            <DashBoardToggle/>
            <CreateRoomButtonModal/>
        </div>
        <Divider>Join Conversation</Divider>
        <ChatRoom topHeight={isHeight}/>
    </div>
  )
}

export default Sidebar
