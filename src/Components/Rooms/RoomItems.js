import React from 'react'
import TimeAgo from 'react-timeago'

const RoomItems = ({room}) => {

  const {createdAt, name}=room;

  return (
    <div>
  <div className='d-flex justify-content-between align-items-center'>
    <h3 className='text-disappear'>{name}</h3>
    <TimeAgo date={new Date(createdAt)}  className='font-normal text-black-45'/>
  </div>

  <div className='d-flex align-items-center text-black-70'>

    <span >No Messages Yet</span>
  </div>
    </div>
  )
}

export default RoomItems
