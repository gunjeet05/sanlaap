import React, { memo } from 'react'
import TimeAgo from 'react-timeago'
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../Context/Currentroom.context';
import { useHover } from '../../../misc/CustomHook';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import IconButtonControl from './IconButtonControl';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageList = ({message, onhandleClick}) => {
    const {author , createdAt, text }=message;

    const[selfRef, isHovered]=useHover();
    const isAdmin=useCurrentRoom(v=>v.isAdmin);
    const admins=useCurrentRoom(v=>v.admins);
    const isMsgauthorAdmin=admins.includes(author.uid);
    const isAuthor=auth.currentUser.uid===author.uid;

    const canMakeAdmin=isAdmin && !isAuthor;


  return (
    <li className={`padded mb-1 cursror-pointer ${isHovered?'bg-black-02':''}`} ref={selfRef}>

    <div className='d-flex align-item-center font-bolder mb-1'>

      <PresenceDot uid={author.uid}/>
        <ProfileAvatar src={author.avatar} name={author.name} className="ml-1" size="xs" />
       

      <ProfileInfoBtnModal profile={author} appearance='link' className='p-0 ml-1 text-black'>

        {canMakeAdmin&&
        
        <Button block onClick={()=>onhandleClick(author.uid)} color='blue'>
{
  isMsgauthorAdmin ? "Remove From admn ":"Make admin"
}

        </Button>
        }
     
      </ProfileInfoBtnModal>
            <TimeAgo 
    date={new Date(createdAt)}  className='font-normal text-black-45  ml-2'/>



    <IconButtonControl 
    {...(true?{color:'red'}:{})}
    isVisible
    iconName="heart"
    tooltip='Like'
    onClick={()=>{}} 
    badgeContent={5}
     />
    



    
      
      </div> <div className='ml-3'>
         <span className='word-break-all ml-3' >{text}</span>
         </div>
    
    </li>
  )
}

export default memo(MessageList)
