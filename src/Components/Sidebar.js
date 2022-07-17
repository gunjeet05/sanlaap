import React from 'react'
import CreateRoomButtonModal from './CreateRoomButtonModal'
import DashBoardToggle from './DashBoard/DashBoardToggle'

function Sidebar() {
  return (
    <div className='h-100 pt-2'>
        <div>
            <DashBoardToggle/>
            <CreateRoomButtonModal/>
        </div>
      
    </div>
  )
}

export default Sidebar
