import { createContext, useEffect, useState } from "react";


export const AppContext = createContext()

export const AppContextProvider = (props)=>{

    const[token,setToken] = useState("")
    const[role,setRole] = useState("")
    const[name,setName] = useState("")

    useEffect(() => {
        async function loadData() {
    
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
            }
            
            const storedRole = localStorage.getItem("role");

             if (storedRole) {
                setRole(storedRole);
            }


           const storedName = localStorage.getItem("name");

           if (storedName) {
                setName(storedName);
            }

        }
    
        loadData();
    }, []);

    const value = {

        token,
        setToken,
        role,
        setRole,
        name,
        setName
    }

    return(
       <AppContext.Provider value={value}>
        {props.children} 
       </AppContext.Provider>
    )
}