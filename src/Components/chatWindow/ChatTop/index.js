import React, { memo } from 'react'
import { useCurrentRoom } from '../../../Context/Currentroom.context'

const Chatttop = () => {
const name=useCurrentRoom( v=>v.name )
console.log("name in chat top", name)

  
  return (
    <div>
      { name }
    </div>
  )
}

export default memo(Chatttop)
