import React from 'react'
import { Avatar } from 'rsuite'
import { getnameinitials } from '../misc/hepler'


const ProfileAvatar = ({name,...Avatarprops}) => {

  
  
  
  

  return (
    <Avatar circle {...Avatarprops} >

{getnameinitials(name)}

    </Avatar>
  )
}

export default ProfileAvatar
