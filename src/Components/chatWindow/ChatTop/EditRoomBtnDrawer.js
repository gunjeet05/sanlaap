import React from 'react'
import { useParams } from 'react-router';
import { Alert, Button, Drawer } from 'rsuite'
import { useCurrentRoom } from '../../../Context/Currentroom.context';
import { useMediaQuery, useModalState } from '../../../misc/CustomHook'
import { database } from '../../../misc/firebase';
import EditableInput from '../../EditableInput';

const EditRoomBtnDrawer = () => {
    const {chatId}=useParams();

    const { isOpen, close , open } = useModalState();
    const name = useCurrentRoom(v => v.name);
    const description = useCurrentRoom(v => v.description);
    const isMobile=useMediaQuery("(max-width:992px)")
console.log("Chat Id", chatId)
    const update=(key, value)=>{
        database
        .ref(`rooms/${chatId}`)
        .child(key)
        .set(value)
        .then(()=>{Alert.success("Room Data saved sucessfully", 4000)})
        .catch(err=>{
        Alert.error( err.message, 40000);
        })

    }

    const onNameSave=(pname)=>{
        update('name', pname)

    }
    const ondescriptionSave=(pdesc)=>{
        update('description', pdesc)

    }

    return (
        <div>
            <Button onClick={open}  size='sm' color='red'>
                Change
            </Button>
            <Drawer full={isMobile} show={isOpen} onHide={close}>
                <Drawer.Header>
                    <Drawer.Title>
                        Edit Room Details
                    </Drawer.Title>
                </Drawer.Header>


                <Drawer.Body>
                    <EditableInput
                        initialValue={name}
                        onSave={onNameSave}
                        label={
                        <h6 className='mb-2 mt-2'>
                            Room Name
                        </h6>}

                        emptyMsg=" Room Name cannot be empty"
                    />


                    <EditableInput
                        componentClass="textarea"
                        row={5}
                        initialValue={description}
                        onSave={ondescriptionSave}
                        label={<h6 className='mb-2 mt-2'>
                            Description
                        </h6>}

                        emptyMsg="Description cannot be empty"
                    />

                </Drawer.Body>
                <Drawer.Footer>

                    <Button block onClick={close}>Close</Button>
                </Drawer.Footer>
            </Drawer>

        </div>
    )
}

export default EditRoomBtnDrawer
