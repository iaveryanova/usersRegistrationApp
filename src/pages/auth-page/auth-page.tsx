import React, {useState} from "react";
import { AuthForm } from "./auth-form";
import "./auth-page.css";
import { RegisterForm } from "./register-form";


export const AuthPage: React.FC = () => {
const [isLogged, toggle] = useState(false);

function formToggle(){
  toggle(!isLogged);
}

  return (
    <div className="auth-page">
      { (!isLogged) ? <AuthForm toggleForm={formToggle}/> :  <RegisterForm toggleForm={formToggle}/> }
    </div>
  );
};

