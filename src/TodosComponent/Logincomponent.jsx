import {  useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./Security/AuthContext"


export default function Logincomponent(){

const navigate = useNavigate()

const [username,setusername] = useState('Haris')

const [password,setpassword] = useState('dummy')

const [successmessage,setsuccessmessage] = useState()

const [errormessage,seterrormessage] = useState()

const authContext = useAuth()

function usernamehandler(event){

    // console.log(event)    just show update the state
    //  console.log(event.target.value)   // gives the current value of the input field. when i press any keyword then showed in console
     setusername(event.target.value)
}

function passwordhandler(event){

    // console.log(event)    just show update the state
    //  console.log(event.target.value)   // gives the current value of the input field. when i press any keyword then showed in console
     setpassword(event.target.value)
}
function handlesubmitt(){
    if(authContext.login(username,password)){
        // authContext.setauthenticated(true)
        // console.log("success")
        setsuccessmessage(true)
        seterrormessage(false)
        navigate(`/welcome/${username}`)
    }else{
        //  authContext.setauthenticated(false)
        // console.log("failed")
        setsuccessmessage(false)
        seterrormessage(true)
        navigate("/")
    }
}

 // console.log("api rsponse back")
//   useEffect(()=>{
//     hellowordapi()
//         .then(() => console.log("response"))
//         .catch(()=>console.log("error")) 
    
// },[])


return(
    <div className="Logincomponent">

        <h1>Login !!</h1>
        {successmessage && <div className="successMessage">Authentication Successfull</div>}
        {errormessage && <div className="errorMessage">Authentication failed</div>}
        
      <div className="LoginForm">
       
         <div>
            <label> User Name</label>
            <input type="text" name="username" value={username} onChange={usernamehandler}/>
         </div>
          
          <div>
            <label> Password</label>
            <input type="password" name="password" value={password} onChange={passwordhandler}/>
         </div>


            <button type="button" name="login" onClick={handlesubmitt}>Login</button>

        </div>

      
    </div>
)


}
