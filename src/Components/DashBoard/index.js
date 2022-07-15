import React from 'react'
import { Button, Drawer } from 'rsuite'
import { useProfile } from '../../Context/Profile.context'

function DashBoard({onSignOut}) {

    const {profile}=useProfile();
   console.log("profile",profile);
  return (
    <>
    <Drawer.Header>
        <Drawer.Title>
            DashBoard
        </Drawer.Title>
    </Drawer.Header>
    <Drawer.Body>
        <h3>HEY {profile.name}</h3>
    </Drawer.Body>
    <Drawer.Footer>
        <Button block color="red" onClick={onSignOut}>
            SIgnOut

        </Button>
    </Drawer.Footer>
    </>
  )
}

export default DashBoard
