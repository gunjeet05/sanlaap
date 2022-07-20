import React from 'react'
import TimeAgo from 'react-timeago'
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageList = ({message}) => {
    const {author , createdAt, text }=message;

  return (
    <li className='padded mb-1'>
    <div className='d-flex align-item-center font-bolder mb-1'>

      <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />
       

      <ProfileInfoBtnModal profile={author} appearance='link' className='p-0 ml-1 text-black'/>
        <TimeAgo 
    date={new Date(createdAt)}  className='font-normal text-black-45  ml-2'/>
      
      </div> <div className='ml-3'>
         <span className='word-break-all ml-3' >{text}</span>
         </div>
    
    </li>
  )
}

export default MessageList
