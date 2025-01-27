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
    <div className="div-main">
      <div className="main-form">
        {formType === "register" ? (
          <>
            <RegisterForm />
            <p>
              Already have account?{" "}
              <Link role="button" onClick={toogleFormType}>
                Sign In
              </Link>
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p>
              Don't have account?{" "}
              <Link role="button" onClick={toogleFormType}>
                Sign Up
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
