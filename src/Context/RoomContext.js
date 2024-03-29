import React ,{ createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { convertToArray } from "../misc/hepler";


const roomContext=createContext();

// RoomProvider is nothing but a wrapper which basically wrap everything and provides user with context api//
export const RoomProvider=({children})=>{

    const [room, setRoom]=useState(null);
    useEffect(()=>{
        const roomref=database.ref('rooms');
      
        roomref.on('value', (snap)=>{
            const data=convertToArray(snap.val());
            setRoom(data);
            

        })

        return ()=>{
            roomref.off();

        }

    },[])
    return <roomContext.Provider value={room}>

       {children}
    </roomContext.Provider>

}


export const useChatRoom=()=>useContext(roomContext)