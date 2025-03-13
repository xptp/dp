import React, { useState } from "react";

import { Link, useParams } from "react-router-dom";

import "../../styles/ui/form.scss";
import RegisterForm from "../forms/registerForm";
import LoginForm from "../forms/loginForm";

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
              У вас уже есть аккаунт?{" "}
              <Link
                className="sign-up-in"
                role="button"
                onClick={toogleFormType}
              >
                Войти
              </Link>
            </p>
          </>
        ) : (
          <>
            <LoginForm />
            <p>
              У вас нет учетной записи?{" "}
              <Link
                className="sign-up-in"
                role="button"
                onClick={toogleFormType}
              >
                Создать
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
