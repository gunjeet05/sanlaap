import React, { memo } from 'react'
import { Button, Modal } from 'rsuite'
import { useCurrentRoom } from '../../../Context/Currentroom.context'
import { useModalState } from '../../../misc/CustomHook'

const RoominfoButtonModal = () => {

    const name = useCurrentRoom(v => v.name)
    const description = useCurrentRoom(v => v.description)
    const { isOpen, close, open } = useModalState();

    return (
        <div>
            <Button appearance='link' className='px-0' onClick={open} >
                Room Information
            </Button>


            <Modal show={isOpen} onHide={close}>

                <Modal.Header>
                    <Modal.Title>
                        {name}
                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>
                    <h6 className='mb-1'>
                        Description of the room

                    </h6>
                    <p>
                        {description}
                    </p>
                </Modal.Body>

                <Modal.Footer>
                    <Button block onClick={close}>Close Modal</Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}


export default memo(RoominfoButtonModal)
