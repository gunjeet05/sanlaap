import React from 'react'
import TimeAgo from 'react-timeago'
import ProfileAvatar from '../ProfileAvatar';

const RoomItems = ({room}) => {

  const {createdAt, name, lastmessage}=room;
  console.log("last message format", lastmessage);


  return (
    <div>
  <div className='d-flex justify-content-between align-items-center'>
    <h3 className='text-disappear'>{name}</h3>
    <TimeAgo 
    date={lastmessage ? new Date(lastmessage.createdAt) : new Date(createdAt)}  className='font-normal text-black-45'/>
  </div>

  <div className='d-flex align-items-center text-black-70'>

  {lastmessage?
  <>
<div className='d-flex align-items-center'>
  <ProfileAvatar 
  src={lastmessage.author.avatar}
  name={lastmessage.author.name}
  size="sm"
  />
</div> 

<div className='text-disappear ml-2' >
  <div className=' italic'>{lastmessage.author.name}</div>
  <span>{lastmessage.text}</span>
</div>
  </>:
  
  <span >No Messages Yet</span>
  

}
  </div>
    </div>
  )
}

export default RoomItems
