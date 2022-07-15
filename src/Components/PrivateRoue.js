import React from 'react'
import { Route, Redirect } from 'react-router';
import { useProfile } from '../Context/Profile.context';

function PrivateRoue({children,...props}) {


    const profile=useProfile();
    if(!profile){
        return <Redirect to='/signin'/>
    }

  return (
    <Route {...props}>
    {children}
    </Route>
   
   
  )
}

export default PrivateRoue
