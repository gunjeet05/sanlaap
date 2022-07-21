import React, { useState } from 'react'
import { useParams } from 'react-router'
import { Alert, Button, Icon, InputGroup, Modal, Uploader } from 'rsuite'
import { useModalState } from '../../../misc/CustomHook'
import { storage } from '../../../misc/firebase'

const AttachMentBtnModal = ({afteruploadfile}) => {
    const {isOpen , open ,close}=useModalState()
const [filelist , setFileList]=useState([]);
const [isLoading, setIsLoading]=useState(false);
const MAX_SIZE=1000*1024*5;
const {chatId}=useParams();


const onChange=(fileArr)=>{
    const filterd=fileArr.filter(el=>el.blobFile.size<MAX_SIZE).slice(0,5);
    setFileList(filterd);


}


const onUpload=async()=>{

    setIsLoading(true);

    try{
        const uploadPromises=filelist.map(f=>{
            return storage.ref(`/chat/${chatId}`).child(Date.now()+f.name).put(f.blobFile, {cacheControl:`public, max-age=${3600* 24* 3}`})
            
        });
            const uploadSnapshot= await Promise.all(uploadPromises);


            const shapePromises=uploadSnapshot.map(async(snap)=>{
                return {
                    contentType:snap.metadata.contentType, 
                    name:snap.metadata.name,
                    url:await snap.ref.getDownloadURL()


                }
            })

            const files= await Promise.all(shapePromises);
            await afteruploadfile(files);
                setIsLoading(false);





    }


    catch(err){
        Alert.error(err.message);
        setIsLoading(false);



    }
  
}

  return (
    <>
    <InputGroup.Button onClick={open}>
        <Icon icon="attachment" />
</InputGroup.Button>

<Modal show={isOpen} onHide={close}>
    <Modal.Header>
        <Modal.Title>
Upload your files here
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Uploader
        autoUpload={false}
        action=""
        fileList={filelist}
        onChange={onChange}
        multiple
        listType="picture-text"
        className="w-100"
        disabled={isLoading}

        />


    </Modal.Body>
    <Modal.Footer>
        <Button block onClick={onUpload} disabled={isLoading}>
            Send to chat
        </Button>
        <div className='text-right mt-2'>
            <small >Only files under 5 mb are allowed</small>

        </div>
    </Modal.Footer>
</Modal>
      
    </>
  )
}

export default AttachMentBtnModal
