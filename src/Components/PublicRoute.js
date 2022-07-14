import React from 'react'
import { Route, Redirect } from 'react-router';

function PublicRoute({children,...props}) {


    const profile=false;
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
