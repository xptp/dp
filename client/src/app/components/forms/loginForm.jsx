import React, { useEffect, useMemo, useState } from "react";
import TextField from "../common/textField";
import { validator } from "../../utils/validator";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../store/userSlice";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = useMemo(
    () => ({
      email: {
        isRequired: {
          message: "Электронная почта обязательна для заполнения",
        },
        isEmail: {
          message: "Некорректный Email",
        },
      },
      password: {
        isRequired: {
          message: "Пароль обязателен для заполнения",
        },
        isCapitalSymbol: {
          message: "Пароль должен содержать хотя бы одну заглавную букву",
        },
        isContainDigit: {
          message: "Пароль должен содержать хотя бы одно число",
        },
        min: {
          message: "Пароль должен состоять минимум из 8 символов",
          value: 8,
        },
      },
    }),
    []
  );

  useEffect(() => {
    const validate = () => {
      const errors = validator(data, validatorConfig);
      setErrors(errors);
      return Object.keys(errors).length === 0;
    };

    validate();
  }, [data, validatorConfig]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isValid = validate();

      if (!isValid) return;
      const redirect = location.state ? location.state.from.pathname : "/";
      await dispatch(login({ payload: data, redirect, navigate }));
    } catch (error) {
      setErrors({ common: error.message });
    }
  };

  return (
    <div className="form">
      <h2>Авторизация</h2>
      <form onSubmit={handleSubmit} className="container-form">
        <TextField
          label="Электронная почта"
          type="text"
          name="email"
          value={data.email}
          onChange={handleChange}
          error={errors.email}
        />
        <TextField
          label="Пароль"
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          error={errors.password}
        />
        {errors.common && <div className="error">{errors.common}</div>}
        <button className="but-form" type="submit" disabled={!isValid}>
          Войти
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
