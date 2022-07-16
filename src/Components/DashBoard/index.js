import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../Context/Profile.context'
import { database } from '../../misc/firebase';
import EditableInput from '../EditableInput';
import ProviderBlock from './ProviderBlock';

function DashBoard({ onSignOut }) {

    const { profile } = useProfile();
    console.log("profile", profile);


    const onSave = async (newData) => {
        console.log("Profile inside ",profile)
     const datapath=database.ref(`/profile/${profile.uid}/name`)

     try {
        datapath.set(newData);
        Alert.success("Data in Database updated congratulation",4000)
        
     } catch (error) {
        Alert.error(error.message,4000);
        console.log("error",error.message)

        
     }
    }

    return (
        <>
            <Drawer.Header>
                <Drawer.Title>
                    DashBoard
                </Drawer.Title>
                <ProviderBlock/>
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
