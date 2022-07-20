import React, { useCallback } from 'react'
import { Alert, Button, Drawer, Icon } from 'rsuite'
import DashBoard from '.';
import { isOfflineForDatabase } from '../../Context/Profile.context';
import { useMediaQuery, useModalState } from '../../misc/CustomHook'
import { auth, database } from '../../misc/firebase';



function DashBoardToggle() {
    const {isOpen, open,close}=useModalState();
    const onSignOut=useCallback(()=>{
    database
    .ref(`/status/${auth.currentUser.uid}`)
    .set(isOfflineForDatabase)
    .then(()=>{
      auth.signOut();
      Alert.info("Signed out", 4000)
      close();
    })
    .catch(err=>{
      Alert.error(err.message, 4000)
    });

        

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
