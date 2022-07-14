import React from 'react'
import { Route, Redirect } from 'react-router';

function PrivateRoue({children,...props}) {


    const profile=false;
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
