
import React from 'react';
import { Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoue from './Components/PrivateRoue';
import PublicRoute from './Components/PublicRoute';
import {ProfileProvider}  from './Context/Profile.context';
import Home from './pages/Home';
import Signin from './pages/Signin';
import  "./styles/main.scss"


function App() {
  return (
    <ProfileProvider>
   <Switch>
    <PublicRoute path="/signin"><Signin/></PublicRoute>
   
    <PrivateRoue path="/">
    <Home/>

    </PrivateRoue>
    
   </Switch>
   </ProfileProvider>
  );
}

export default App;
