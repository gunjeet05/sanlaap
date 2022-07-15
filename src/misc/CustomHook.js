import { useCallback, useState } from "react";


export function useModalState(defaul=false){
const [isOpen,setIsOpen]=useState(defaul);
const open=useCallback(()=>setIsOpen(true));
const close=useCallback(()=>setIsOpen(false));
return {isOpen, open, close}
} 
