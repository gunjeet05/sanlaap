import React from 'react'
import { Badge, Icon, IconButton, Tooltip, Whisper } from 'rsuite'



const IconButtonControl = ({isVisible, iconName, tooltip, onLClick, badgeContent, ...props}) => {

    const ControlBadge=({condition ,children })=>{
        return condition?<Badge content={condition}>
            {children}
        </Badge>:
        children
    
    }
  return (
    <div className='ml-2' style={{ visibility: isVisible ? 'visible' : 'hidden' }}>
        <ControlBadge condition={badgeContent}>
            <Whisper
            placement='top'
            delay={0}
            delayHide={0}
            delayShow={0}
            trigger='hover'
            speaker={<Tooltip>
                {tooltip}
                
            </Tooltip>}>

                <IconButton {...props}
                  onClick={onLClick}
                  circle 
                  size='xs'
                  icon={<Icon icon={iconName} />}
                  
                  />
                  
            

            </Whisper>
    

        </ControlBadge>

        


      
    </div>
  )
}

export default IconButtonControl
