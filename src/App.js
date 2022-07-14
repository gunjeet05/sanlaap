
import React from 'react';
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoue from './Components/PrivateRoue';
import PublicRoute from './Components/PublicRoute';
import Home from './pages/Home';
import Signin from './pages/Signin';
import  "./styles/main.scss"


function App() {
  return (
   <Switch>
    <PublicRoute path="/signin"><Signin/></PublicRoute>
   
    <PrivateRoue path="/home">
    <Home/>

    </PrivateRoue>
    <Route>Thik se search kar

    </Route>
   </Switch>
  );
}

export default App;
