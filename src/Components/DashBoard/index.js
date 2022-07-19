import React from 'react'
import { Alert, Button, Divider, Drawer } from 'rsuite'
import { useProfile } from '../../Context/Profile.context'
import { database } from '../../misc/firebase';
import { getUserupdates } from '../../misc/hepler';
import EditableInput from '../EditableInput';
import AvatarUploadBtns from './AvatarUploadBtns';
import ProviderBlock from './ProviderBlock';

function DashBoard({ onSignOut }) {

    const { profile } = useProfile();
    console.log("profile", profile);


    const onSave = async (newData) => {
        
       

        try {
           

            const updates=await getUserupdates(profile.uid, 'name', newData, database)

            await database.ref().update(updates);



            Alert.success("Data in Database updated congratulation", 4000)

        } catch (error) {
            Alert.error(error.message, 4000);
            console.log("error", error.message)


        }
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
                <ProviderBlock />
                <Divider />
                <EditableInput
                    name="nickname"
                    initialValue={profile.name}
                    onSave={onSave}
                    label={<h6 className='mb-2'>Nickname</h6>}
                />

                <AvatarUploadBtns />
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
