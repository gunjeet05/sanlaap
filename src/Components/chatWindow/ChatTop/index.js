import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { Icon , ButtonToolbar} from 'rsuite'
import { useCurrentRoom } from '../../../Context/Currentroom.context'
import { useMediaQuery } from '../../../misc/CustomHook'
import RoominfoButtonModal from './RoominfoButtonModal'

const Chatttop = () => {
const name=useCurrentRoom( v=>v.name )
console.log("name in chat top", name)

const isMobile=useMediaQuery('(max-width:992px)')

  
  return (
   <div>
    <div className='d-flex justify-content-between align-items-center'>
      <h4>
        < Icon componentClass={Link}  to='/' 
        icon='arrow-circle-left' size='2x' className={isMobile?'d-inline-block p-0 mr-2 text-blue link-unstyled':'d-none'} />
      
      <span className='text-disappear'>{name}</span>
      </h4>
      <ButtonToolbar className="whits-nowrap">Todo </ButtonToolbar>

    </div>



    <div className='d-flex justify-content-between align-items-center'>

      <span>Todo</span>
      <RoominfoButtonModal />
    </div>
   </div>
  )
}

export default memo(Chatttop)
