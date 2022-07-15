import React, { createContext,   useContext, useEffect, useState } from "react";
import { auth, database } from "../misc/firebase";


const ProfileContext = createContext();

export const ProfileProvider = function ProfileProvider({ children }) {
    const [profile, setProfile] = useState(null);
    const [isLoading, setisLoading] = useState(true)
    useEffect(() => {
        let userRef;
       const authUnsub= auth.onAuthStateChanged(authObj => {
       
            if (authObj) {

                userRef=database.ref(`/profile/${authObj.uid}`);

                userRef.on('value', (snap) => {
                      
                    const { name, createdTime } = snap.val();

                    console.log("name",name);
                    const data = {
                        name,
                        createdTime,
                        uid: authObj.uid,
                        email: authObj.email

                    };
                    setProfile(data);
                    setisLoading(false);
                });




            }
            else{

                if(userRef){
                    userRef.off();
                }
                setProfile(null);
                setisLoading(false);

            }

        })


        return ()=>{
            authUnsub();
            if(userRef){
                userRef.off();
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