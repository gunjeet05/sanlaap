import React from 'react'
import { Button, Modal } from 'rsuite';
import { useModalState } from '../../../misc/CustomHook';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({author, ...btnprops}) => {
    const {name, avatar, createdAt}=author;
    const {isOpen, close, open }=useModalState()
    const shortName=name.split(" ")[0];
    console.log("I am running ", shortName);
    const menberSince=new Date(createdAt).toLocaleDateString();
  return (
    <>
    <Button  {...btnprops} onClick={open}>{shortName}</Button >
    <Modal show={isOpen} onHide={close}>
        <Modal.Header>
            <Modal.Title>
                {shortName}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className='text-center'>
            <ProfileAvatar src={avatar} name={name} />

            <h4 className='mt-2'>{name}</h4>
            <p>member since{menberSince}</p>

        </Modal.Body>
        <Modal.Footer>
            <Button block onClick={close}>Close </Button>
        </Modal.Footer>


    </Modal>
    </>

    
  )
}

export default ProfileInfoBtnModal
