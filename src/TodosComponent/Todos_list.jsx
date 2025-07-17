import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteTodosbyIDapi, reteriveTodosapi, reteriveTodosbyIDapi } from "./ApisHandler/Todos_Integration";
import { useAuth } from "./Security/AuthContext";

export default function Todos_list() {

    const today = new Date()
    const targetdate = new Date(today.getFullYear()+12,today.getMonth(),today.getDate())
     const authContext = useAuth()
        const username = authContext.username
  //   const todos = [
  //   { id: 1, Description: "Learn AWS" ,done : false , targetdate : Targetdate },
  //   { id: 2, Description: "Learn cloud"  ,done : false , targetdate : Targetdate},
  //   { id: 3, Description: "Learn python"  ,done : false , targetdate : Targetdate},
  //   { id: 4, Description: "Learn Java"  ,done : false , targetdate : Targetdate},
  //   { id: 5, Description: "Learn Rubby"  ,done : false , targetdate : Targetdate}
  // ];


  const [todos,settodos] = useState([])
const [message,setmessage] = useState(null)

useEffect(
  ()=>{
    gettingtodosbyusername()
},[])


function gettingtodosbyusername(){
  reteriveTodosapi(username)
  .then((response)=> {
    // console.log(response.data)
      settodos(response.data)
  }
    )
  .catch((error)=>{
    console.log(error)
  })


}

// useEffect(
//   ()=>{
//     gettingtodosbyid(id)
// },[])
// function gettingtodosbyid(id){
//   reteriveTodosbyIDapi('Haris',id)
//   .then((response)=> {
//     console.log(response.data)
//       settodos(response.data)
//   }
//     )
//   .catch((error)=>{
//     console.log(error)
//   })
//   .finally(()=>console.log("cleanup"))

// } 

function deleteapi(id){
  deleteTodosbyIDapi(username,id)
   .then(()=>{
    setmessage(`Todo id = ${id} deleted successfully`)
         gettingtodosbyusername()
   })
   .catch((error)=>console.log(error))
  //  .finally(()=>console.log("cleanup"))
}
const navigate = useNavigate()
function updateapi(id){
  console.log("clicked",id)
  navigate(`/update/${id}`)
}

function addnewtodo(){
  navigate(`/update/-1`)
}
  return (
    <div className="container">
      <h1>Things You want to do !</h1>

      <div>
        {message && <div className="alert alert-warning">{message}</div>}
        <table className="table">
          <thead>
            <th>ID</th>
             <th>Username</th>
            <th>Description</th>
             <th>Is Done</th>
              <th>TargetDate</th>
              <th>Delete</th>
               <th>Update</th>
          </thead>

          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                 <td>{todo.username}</td>
                <td>{todo.description}</td>
                {/* <td>{todo.done.toString()}</td> */}
                <td>{todo.done !== undefined ? todo.done.toString() : "N/A"}</td>

                {/* <td>{todo.targetdate.toString()}</td> */}
                <td>{todo.targetDate.toString()}</td>
                <td><button className="btn btn-warning" onClick={()=>deleteapi(todo.id)}>Delete</button></td>
                <td><button className="btn btn-success" onClick={()=>updateapi(todo.id)}>Update</button></td>      
            
              </tr>
            ))}
          </tbody>
        </table>
      </div>
       <div><button className="btn btn-success" onClick={addnewtodo}>Create Todo</button></div>
    </div>
  );
}
