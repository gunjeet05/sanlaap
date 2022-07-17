import React from 'react'
import { Nav } from 'rsuite'
import RoomItems from './RoomItems'

const ChatRoom = ({topHeight}) => {
    console.log("Height of upper component", topHeight)
  return (
    <Nav 
    
    appearance='subtle'
    vertical
    reversed
    className='overflow-y-scroll custom-scroll '
    style={{
        height:`calc(100%-${topHeight}px)`,
    }}
    >

    <Nav.Item>
        <RoomItems/>
    </Nav.Item>

    </Nav>
  )
}

export default ChatRoom
