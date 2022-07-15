import { useCallback, useEffect, useState } from "react";


export function useModalState(defaul=false){
const [isOpen,setIsOpen]=useState(defaul);
const open=useCallback(()=>setIsOpen(true));
const close=useCallback(()=>setIsOpen(false));
return {isOpen, open, close}
} 


export const useMediaQuery = query => {
    const [matches, setMatches] = useState(
      () => window.matchMedia(query).matches
    );
  
    useEffect(() => {
      const queryList = window.matchMedia(query);
      setMatches(queryList.matches);
  
      const listener = evt => setMatches(evt.matches);
  
      queryList.addListener(listener);
      return () => queryList.removeListener(listener);
    }, [query]);
  
    return matches;
  };
  