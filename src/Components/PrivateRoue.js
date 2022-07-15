import React from 'react'
import { Route, Redirect } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../Context/Profile.context';

function PrivateRoue({children,...props}) {


    const {profile,isLoading}=useProfile();

    if(isLoading&&!profile){
      return <Container>
        <Loader center vertical size="md" content="Loading" speed='slow' />

     

      </Container>
    }
    if(!profile&&!isLoading){
        return <Redirect to='/signin'/>
    }

  return (
    <Route {...props}>
    {children}
    </Route>
   
   
  )
}

export default PrivateRoue
