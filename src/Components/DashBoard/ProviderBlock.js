import React, { useState } from 'react'
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app'
import { auth } from '../../misc/firebase'

const ProviderBlock = () => {

    
    const [isConnected, setIsConected] = useState({
        "google.com": auth.currentUser.providerData.some(data => data.providerId === "google.com"),
        "facebook.com": auth.currentUser.providerData.some(data => data.providerId === "facebook.com")
    })

    const updateIsConnected=(providerId,value)=>{
        setIsConected(prev=>{
            return {
                ...prev,
                [providerId]:value
            }
        })
    }
    const link=async(provider)=>{
        try {
            await auth.currentUser.linkWithPopup(provider);
            Alert.info(`Connected to ${provider.providerId}`)
            updateIsConnected(provider.providerId, true)
        } catch (error) {
            Alert.error(error.message,4000)
        }
       

    }
    const unlink=async(providerId)=>{
        try {
            if(auth.currentUser.providerData.length===1){
                throw new Error(`You Cannot disconnect from ${providerId}`)

            }

            await auth.currentUser.unlink(providerId);
            updateIsConnected(providerId, false);
            Alert.info(`Disconnected from ${providerId}`)

        } catch (error) {
            Alert.error(error.message,4000);
        }
    }
    const onGoogleLink=()=>{
link(new firebase.auth.GoogleAuthProvider())
    }
    const onFaceBookLink=()=>{
        link(new firebase.auth.FacebookAuthProvider())  
    }

    const onGoogleUnlink=()=>{
        unlink('google.com');

    }

    const onFaceBookUnlink=()=>{
unlink('facebook.com')
    }
    console.log(setIsConected);
    return (
        <div>
            <div>
                {isConnected['google.com'] &&
                    <Tag color="green" closable onClose={onGoogleUnlink}>
                        <Icon icon='google' />

                        Connected to Google
                    </Tag>
                }
                {isConnected['facebook.com'] &&
                    <Tag color='blue' closable onClose={onFaceBookUnlink}>
                        <Icon icon='facebook' />
                        Connected to Facebook
                    </Tag>
                }
            </div>
            <div className='mt-2'>
                {!isConnected['google.com'] &&
                    <Button block color='green' onClick={onFaceBookLink} ><Icon icon='google' />Connect to Google</Button>}
                {
                    !isConnected['facebook.com'] &&
                    <Button block color='blue' onClick={onGoogleLink} ><Icon icon='facebook'  />Connet to Facebook</Button>}
            </div>

        </div>
    )
}

export default ProviderBlock
