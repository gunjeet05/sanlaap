import React from 'react'
import { Route, Redirect } from 'react-router';
import { useProfile } from '../Context/Profile.context';

function PublicRoute({children,...props}) {


    const profile=useProfile();
    if(profile){
        return <Redirect to='/home'/>
    }

  return (
    <Route {...props}>
    {children}
    </Route>
   
   
  )
}

export default PublicRoute
