import './TodoApp.css'
import Logincomponent from "./Logincomponent"
import Welcomecomponent from "./Welcomecomponent"
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Errorcomponent from './Errorcomponent'
import Todos_list from './Todos_list'
import Headercomponent from './Headercomponent'
import Footercomponent from './Footercomponent'
import Logoutcomponent from './Logoutcomponent'
import AuthProvider, { useAuth } from './Security/AuthContext'
import UpdationTodo from './UpdationTodo'


function Authenticatedroute({children}){
   const authContext = useAuth()
   if(authContext.isauthenticated)
    return children

   return <Navigate to="/"/>
}
export default function TodoApp(){

return(

    <div className="TodoApp">
    <AuthProvider>
        <BrowserRouter>
         <Headercomponent />
        <Routes>
            <Route path='/' element={<Logincomponent/> } />
             <Route path='welcome/:username' element={
                <Authenticatedroute>
                <Welcomecomponent/>
                </Authenticatedroute>}/>


             <Route path='todoslist' element={
                <Authenticatedroute>
                <Todos_list/>
                </Authenticatedroute>}/>


                 <Route path='update/:id' element={
                <Authenticatedroute>
                <UpdationTodo/>
                </Authenticatedroute>}/>


              <Route path='logout' element={
                <Authenticatedroute>
                <Logoutcomponent/>
                </Authenticatedroute>}/>

                
             <Route path='*' element={<Errorcomponent/>}/>
        
        </Routes>
         <Footercomponent/> 
        </BrowserRouter>
       </AuthProvider>
    </div>
)



}