import React from 'react'
import { Input, Modal } from 'rsuite'
import { useModalState } from '../../../misc/CustomHook'






const ImageBtnModal = ({src, filename}) => {
    
const {isOpen , close ,open }=useModalState();
  return (
    <>


 
        <Input
        type="image" 
        src={src}
        alt="file"
        onClick={open}
        className="mw-100 mh-100 w-auto"
        />


        <Modal show={isOpen} onHide={close}>


            <Modal.Header>
                <Modal.Title>
                    {filename}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div>
                <img src={src} height="100%" width="100%" alt="files" />
                </div>
            </Modal.Body>

            <Modal.Footer>
                <a href={src} target="_blank" rel='noopener noreferrer '>View Original</a>
            </Modal.Footer>
        </Modal>
    </>
  )
}

export default ImageBtnModal
