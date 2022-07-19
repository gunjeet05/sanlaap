import React from 'react'
import TimeAgo from 'react-timeago'
import ProfileAvatar from '../../ProfileAvatar';

const MessageList = ({message}) => {
    const {author , createdAt, text }=message;
 console.log("message format", message)
 console.log("author", author)
  return (
    <li className='padded mb-1'>
    <div className='d-flex align-item-center font-bolder mb-1'>
        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />
        <span className='ml-2'>{author.name}</span>
        <TimeAgo 
    date={new Date(createdAt)}  className='font-normal text-black-45  ml-2'/>
      
      </div> <div className='ml-3'>
         <span className='word-break-all ml-3' >{text}</span>
         </div>
    
    </li>
  )
}

export default MessageList
