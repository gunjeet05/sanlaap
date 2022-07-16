import React, { useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite'
import { useModalState } from '../../misc/CustomHook'

const AvatarUploadBtns = () => {
    const [img,setImage]=useState(null);
    const filetype='.png, .jpeg, .jpg'

    const {isOpen, open, close}=useModalState();
    const acceptedtype=['image/png','image/jpeg','image/pjpeg'];
    
    const isValidFile=(a)=>acceptedtype.includes(a.type);
    
 
    const oninputChange=(ev)=>{
        const currentFile=ev.target.files;
        if(currentFile.length===1){
            const file=currentFile[0];
            console.log("isValidFile",isValidFile(file));
                if(isValidFile(file)){
                   
                        setImage(file);
                        open();
                }
                else{
                    Alert.warning(`Wrong File Type ${file.type}`,4000)
                }
        }
    }


   
  return (
    <div className='mt-3 text-center cursor-pointer'>
        <div>
            <label htmlFor='avatar'>Select a new Avatar
            <input id='avatar'
             type='file' 
             className='d-none' 
             accept={filetype}
             onChange={oninputChange}
             />
            </label>
            <Modal show={isOpen} onHide={close}>
                <Modal.Header>
                    <Modal.Title>Choose Your Avatar and Adjust it</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        {img&&
                        <div className='d-flex justify-content-center align-items-center h-100'>
                        <AvatarEditor
                        image={img}
                        width={200}
                        height={200}
                        border={10}
                       borderRadius={100}
                        
                        rotate={0}
                      
                      />
                        </div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button block appearance='ghost'>
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
            </Modal>
        </div>
      
    </div>
  )
}

export default AvatarUploadBtns
