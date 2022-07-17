import React, { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Alert, Button, Modal } from 'rsuite'
import { useProfile } from '../../Context/Profile.context'
import { useModalState } from '../../misc/CustomHook'
import { database, storage } from '../../misc/firebase'

const filetype = '.png, .jpeg, .jpg'
const acceptedtype = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = (a) => acceptedtype.includes(a.type);

const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (blob) {
                resolve(blob);
            }
            else {
                reject(new Error('Sorry! Cannot Convert To Blob'));
            }
        });
    });
}


const AvatarUploadBtns = () => {
    const { isOpen, open, close } = useModalState();
    const [isLoading, setIsLoading] = useState(false);
    const Avatarref = useRef();
    const { profile } = useProfile();

    const [img, setImage] = useState(null);









    const oninputChange = (ev) => {
        const currentFile = ev.target.files;
        if (currentFile.length === 1) {
            const file = currentFile[0];
            console.log("isValidFile", isValidFile(file));
            if (isValidFile(file)) {

                setImage(file);
                open();
            }
            else {
                Alert.warning(`Wrong File Type ${file.type}`, 4000)
            }
        }
    }



    const onUploadClick = async () => {

        const Canvas = Avatarref.current.getImageScaledToCanvas();
        setIsLoading(true);
        try {
            const blob = await getBlob(Canvas);
            const avatarFileRef = storage.ref(`/profile/${profile.uid}`).child('avatar');
            const UploadAVatarResult = await avatarFileRef.put(blob, {
                cacheControl: `public,max-age=${3600 * 24 * 3}`
            });

            const downloadUrl = await UploadAVatarResult.ref.getDownloadURL();
            const userAvatarRef = database.ref(`/profile/${profile.uid}`).child('avatar');
            await userAvatarRef.set(downloadUrl);
            setIsLoading(false);
            Alert.info("Congratulation Data has been set to Database and Picture is available in Storage.You can use it")
        } catch (error) {
            Alert.error(error.mesage, 4000)
            console.log("Error :", error.mesage)
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
                        {img &&
                            <div className='d-flex justify-content-center align-items-center h-100'>
                                <AvatarEditor
                                    ref={Avatarref}
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
                        <Button block appearance='ghost' onClick={onUploadClick} disabled={isLoading}>
                            Upload new Avatar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        </div>
    )
}

export default AvatarUploadBtns
