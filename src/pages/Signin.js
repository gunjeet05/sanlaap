import React from 'react'
import firebase from 'firebase/app'
import { Alert, Button, Col, Container, Grid, Icon, Panel, Row } from 'rsuite'
import { auth, database } from '../misc/firebase'

function Signin() {


    const onsigninWithProvider=async(provider)=>{
        try{
        const {additionalUserInfo, user}=await auth.signInWithPopup(provider);
        if(additionalUserInfo.isNewUser){
            await database.ref(`/profile/${user.uid}`).set({
                name:user.displayName,
                createdTime:firebase.database.ServerValue.TIMESTAMP

            })
        }
        Alert.success("!!!Woohoo SignedIn",4000)
    }
    catch(err){
        Alert.info(err.mesage,4000);


    }
    }
    const ongoogleClick=()=>{
        onsigninWithProvider(new firebase.auth.GoogleAuthProvider);

    }
    const onfacebookClick=()=>{
onsigninWithProvider(new firebase.auth.FacebookAuthProvider)
    }


    return (
        <Container>
            <Grid className='mt-page'>
                <Row>
                    <Col xs={24} md={12} mdOffset={6}>
                        <Panel>
                            <div className='text-center'>
                                <h2>Sanlaap</h2>
                                <h5> A CHAT APP</h5>
                                <p className='mt-1'><b>MADE FOR YOU BY GUNJEET</b></p>

                            </div>
                            <div className='mt-3'>
                               
                                    <Button block color="green" onClick={ongoogleClick}> <Icon icon="google" />  Sign In Using Google</Button>
                                    <Button block color="blue"  onClick={onfacebookClick}>  <Icon icon="facebook" />  Sign In Using FaceBook</Button>
                              
                            </div>

                        </Panel>
                    </Col>
                </Row>
            </Grid>
        </Container>

    )
}

export default Signin