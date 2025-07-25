//import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";

export default function Headercomponent() {
  //const authContext = useContext(AuthContext)
  const authContext = useAuth();
  const isauthenticated = authContext.isauthenticated;
  console.log(authContext);

  function logouthandler(){
    authContext.logout()
  }

  return (
    <header className="border-bottom border-light border-5 mb-5 p-2">
      <div className="container">
        <div className="row">
          <nav className="navbar navbar-expand-lg">
            <a className="navbar-brand ms-2 fs-2 fw-bold text-black" href="/">
              TodoApp
            </a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item fs-5">
                  {isauthenticated && (
                    <NavLink className="nav-link" to="/welcome/Haris">
                      Home
                    </NavLink>
                  )}
                </li>
                <li className="nav-item fs-5">
                  {isauthenticated && (
                    <NavLink className="nav-link" to="/todoslist">
                      Todos
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li className="nav-item fs-5">
                {!isauthenticated && (
                  <NavLink className="nav-link" to="/">
                    Login
                  </NavLink>
                )}
              </li>
              <li className="nav-item fs-5">
                {isauthenticated && (
                  <NavLink className="nav-link"  onClick={logouthandler}>
                    Logout
                  </NavLink>
                )}
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
