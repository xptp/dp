import React, { useState } from "react";
import LoginForm from "../ui/loginForm";
import { Link, useParams } from "react-router-dom";
import RegisterForm from "../ui/registerForm";
import "../../styles/ui/form.scss";

const Login = () => {
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );

  const toogleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="div-height">
      {formType === "register" ? (
        <>
          <h3>Register</h3>
          <RegisterForm />
          <p>
            Already have account?{" "}
            <Link role="button" onClick={toogleFormType}>
              {" "}
              Sign In
            </Link>
          </p>
        </>
      ) : (
        <>
          <h3>Login</h3>
          <LoginForm />
          <p>
            Dont have account?{" "}
            <Link role="button" onClick={toogleFormType}>
              {" "}
              Sign Up
            </Link>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
