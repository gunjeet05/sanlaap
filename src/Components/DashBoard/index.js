import React from 'react'
import { Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../Context/Profile.context'
import EditableInput from '../EditableInput';

function DashBoard({ onSignOut }) {

    const { profile } = useProfile();
    console.log("profile", profile);


    const onSave = async (newData) => {
        console.log(newData)
    }

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    DashBoard
                </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>
                <h3>HEY {profile.name}</h3>

                <Divider />
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className='mb-2'>Nickname</h6>}
                />

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
