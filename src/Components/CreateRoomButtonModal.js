import React, {  useCallback, useRef, useState } from 'react'
import {
    Button,
    Icon,
    Modal,
    Form,
    FormControl,
    FormGroup,
    ControlLabel,
    Schema,
    Alert
} from 'rsuite'
import firebase from 'firebase/app'
import { useModalState } from '../misc/CustomHook'
import { database } from '../misc/firebase';



const { StringType } = Schema.Types;
const schemaModel = Schema.Model({
    name: StringType().isRequired('Please Enter the name in correct Format'),
    description: StringType().isRequired('Please Enter the Description in correct Format'),
});

const INITIAL = {
    'name': '',
    'description': ''
}


const CreateRoomButtonModal = () => {
    const formRef = useRef();
    const { isOpen, open, close } = useModalState();
    
    const [formValue, setFormValue] = useState(INITIAL);
    console.log("form value", formValue)
    const [isLoading, setIsLoading] = useState(false);
    const onFormChange = useCallback((value) => {
        setFormValue(value);
    },[]);


    const onSubmit = async () => {

        
        console.log("form ref", formRef)
        if (!formRef.current.check()) {
            console.log("Reference Failled")
            return;
        }
        setIsLoading(true);
        const newRoomData = {
            ...formValue,
            createdAt: firebase.database.ServerValue.TIMESTAMP
        }

        try {
            await database.ref('rooms').push(newRoomData);
            Alert.success("Room data has been set to database", 4000);
            setIsLoading(false);
            setFormValue(INITIAL);
            close();


        } catch (err) {
            setIsLoading(false);
            Alert.error(`Error in setting room data to database :${err.message}`, 4000)

        }

    }


    return (
        <div className='mt-1'>
            <Button block color='green' onClick={open}>
                <Icon icon='creative' />Create Room

            </Button>

            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>
                        Create new Room to chat With your Friends

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form
                        fluid
                        onChange={onFormChange}
                        formValue={formValue}
                        model={schemaModel}
                        ref={formRef}
                    >
                        <FormGroup>
                            <ControlLabel>
                                Enter Name of Your Chat Room
                            </ControlLabel>
                            <FormControl name='room' placeholder="Enter name of your ChatRoom" />
                        </FormGroup>

                        <FormGroup>
                            <ControlLabel>
                                Enter the Description of your ChatRoom
                            </ControlLabel>
                            <FormControl name='description' placeholder='Enter the description of your chatroom' componentClass='textarea' row={5} />

                        </FormGroup>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button block appearance='primary' onClick={onSubmit} disabled={isLoading}>Create New Room </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default CreateRoomButtonModal
