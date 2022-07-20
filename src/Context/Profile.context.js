import React, { createContext,   useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import { auth, database } from "../misc/firebase";


const ProfileContext = createContext();

export const isOfflineForDatabase = {
    state: 'offline',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  
  const isOnlineForDatabase = {
    state: 'online',
    last_changed: firebase.database.ServerValue.TIMESTAMP,
  };
  

export const ProfileProvider = function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        let userRef;
        let userStatusRef;
       const authUnsub= auth.onAuthStateChanged(authObj => {

       
            if (authObj) {
                console.log("authobj", authObj.uid)
                userStatusRef = database.ref(`/status/${authObj.uid}`);
              userRef=database.ref(`/profile/${authObj.uid}`);

                userRef.on('value', (snap) => {
                      
                    const { name, createdTime ,avatar} = snap.val();

                   
                    const data = {
                        name,
                        createdTime,
                        avatar,
                        uid: authObj.uid,
                        email: authObj.email

                    };
                    setProfile(data);
                    setisLoading(false);
                });
                database.ref('.info/connected').on('value', snapshot => {
                    if (!!snapshot.val() === false) {
                      return;
                    }
          
                    userStatusRef
                      .onDisconnect()
                      .set(isOfflineForDatabase)
                      .then(() => {
                        userStatusRef.set(isOnlineForDatabase);
                      });
                  });




            }
            else{

                if(userRef){
                    userRef.off();
                }


                if (userStatusRef) {
                    userStatusRef.off();
                  }
          
                  database.ref('.info/connected').off();
                setProfile(null);
                setisLoading(false);

            }

        })


        return ()=>{
            
            authUnsub();
            database.ref('.info/connected').off();
            if(userRef){
                userRef.off();
            }
            if (userStatusRef) {
                userStatusRef.off();
              }
        }
    },
    
    [])
    return (
        <ProfileContext.Provider value={{profile, isLoading}}>
            {children}
        </ProfileContext.Provider>
    );

};


export const useProfile = () => useContext(ProfileContext)