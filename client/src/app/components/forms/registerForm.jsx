import React, { useEffect, useMemo, useState } from "react";
import TextField from "../common/textField";
import { validator } from "../../utils/validator";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/userSlice";

const RegisterForm = () => {
  const [data, setData] = useState({ email: "", password: "", admin: false });
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = ({ target }) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.type === "checkbox" ? target.checked : target.value,
    }));
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
      console.log(data);

      dispatch(signUp({ payload: data, redirect, navigate }));
    } catch (error) {
      setErrors({ common: error.message });
    }
  };

  return (
    <div className="form">
      <h2>Регистрация</h2>
      <form className="container-form" onSubmit={handleSubmit}>
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
        <div className="form-checkbox">
          <input
            className="checkbox-input"
            type="checkbox"
            name="admin"
            checked={data.admin}
            onChange={handleChange}
          />
          <label className="form-check-label">Admin</label>
        </div>
        <button className="but-form" type="submit" disabled={!isValid}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
