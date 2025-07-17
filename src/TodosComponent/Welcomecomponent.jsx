import axios from "axios"
import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { helloworldapi } from "./ApisHandler/Todos_Integration"

export default function Welcomecomponent(){

// const params = useParams()
// console.log(params.username)
// or 

const {username} = useParams()
console.log(username)
function apicalls(){
    helloworldapi()
      .then((response)=>Successresponse(response))
      .catch((error)=>Failureresponse(error))
      .finally(()=>console.log("cleanup"))

}



function Successresponse(response){
console.log(response)
}
function Failureresponse(error){
console.log(error)
}
return(
    <div className="Welcomecomponent">
        <h1>Welcome {username}</h1>
        <div>
            
          <Link to="/todoslist">Manage Todos</Link>
        </div>
        
          <div>
            <button onClick={apicalls}> call api</button>
        </div>
    </div>
)


}