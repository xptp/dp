import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const togleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={showPassword ? "text" : type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
        />
        {type === "password" && <button onClick={togleShowPassword}>p</button>}
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};
TextField.protoTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default TextField;
