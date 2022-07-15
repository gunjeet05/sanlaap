import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import DashBoard from '.';
import { useMediaQuery, useModalState } from '../../misc/CustomHook'
import { auth } from '../../misc/firebase';


function DashBoardToggle() {
    const {isOpen, open,close}=useModalState();
    const onSignOut=useCallback(()=>{
        auth.signOut();
        Alert.info("Signed out")
        close();

    },[close])
    const isMobile=useMediaQuery('(max-width:992px)')
  return (
    <>
    <Button block color="blue" onClick={open}>
        <Icon icon="dashboard"/>DashBoard button

    </Button>
    <Drawer full ={isMobile} show={isOpen} onHide={close} placement="left">
        <DashBoard onSignOut={onSignOut}/>
    </Drawer>

   
      
    </>
  )
}

export default DashBoardToggle
