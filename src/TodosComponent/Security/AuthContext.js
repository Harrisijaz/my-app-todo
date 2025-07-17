import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {
 
  const [isauthenticated , setauthenticated] = useState(false)
  const [username , setusername] = useState(false)

function login(username , password){
     if(username==='Haris' && password==='dummy'){
        setauthenticated(true)
        setusername(username)
        return true
        // console.log("success")
        // setsuccessmessage(true)
        // seterrormessage(false)
        // navigate(`/welcome/${username}`)
    }else{
        setauthenticated(false)
        setusername(null)
        return false
        // console.log("failed")
        // setsuccessmessage(false)
        // seterrormessage(true)
        // navigate("/")
    }
}
  
function logout(){
  
     setauthenticated(false)
}


  return (

    <AuthContext.Provider value={{ isauthenticated, login , logout , username}}>{children}</AuthContext.Provider>
  );
}
