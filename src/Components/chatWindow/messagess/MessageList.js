import React, { memo } from 'react'
import TimeAgo from 'react-timeago'
import { Button } from 'rsuite';
import { useCurrentRoom } from '../../../Context/Currentroom.context';
import { useHover, useMediaQuery } from '../../../misc/CustomHook';
import { auth } from '../../../misc/firebase';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import IconButtonControl from './IconButtonControl';
import ImageBtnModal from './ImageBtnModal';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageList = ({message, onhandleClick, handleLikeClick, handleDelete}) => {
    const {author , createdAt, text,file,  likes, likeCount }=message;
    const isMobile=useMediaQuery('(max-width:992px)')
    const[selfRef, isHovered]=useHover();
    const isAdmin=useCurrentRoom(v=>v.isAdmin);
    const admins=useCurrentRoom(v=>v.admins);
    const isMsgauthorAdmin=admins.includes(author.uid);
    const isAuthor=auth.currentUser.uid===author.uid;
    const isLiked=likes&&Object.keys(likes).includes(auth.currentUser.uid)
    const canMakeAdmin=isAdmin && !isAuthor;
    const canShowIcons=isMobile||isHovered;

  const renderFile=(files)=>{


    if(files.contentType.includes('audio')){
      // eslint-disable-next-line jsx-a11y/media-has-caption
      return <audio controls>
        <source src={file.url} type="audio/mp3" />
        your browser does not support the audio
      </audio>
    }

    if(files.contentType.includes('image')){
    
      
      return <div className='height-220'><ImageBtnModal src={files.url} filename={files.name}  /></div>
    }
    

    return <a href={files.url}>Download {files.name}</a>

  }


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
    {...(isLiked?{color:'red'}:{})}
    isVisible={canShowIcons}
    iconName="heart"
    tooltip='Like'
    onLClick={()=>handleLikeClick(message.id)} 
    badgeContent={likeCount}
     />
{isAuthor&&


<IconButtonControl 
isVisible={canShowIcons}
iconName="close"
tooltip='Delete'
onLClick={()=>{handleDelete(message.id, file)}} 


/>    

}
    



    
      
      </div> <div className='ml-3'>

        {text&& 
          <span className='word-break-all ml-3' >{text}</span>
        }

        {
          file&& 
          renderFile(file)

        }

       
         </div>
    
    </li>
  )
}

export default memo(MessageList)
