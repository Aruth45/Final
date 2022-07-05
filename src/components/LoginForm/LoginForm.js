import Validator from "../../helpers/validator";
import Input from "../Input/Input";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <form className="loginForm">
      <div className="loginForm__holder">
        <h1 className="loginForm__heading">Login</h1>

        <Input
          labelText="Email"
          placeholder=""
          name="email"
          value={formData.email}
          onChange={handleChange}
          error=""
          type="email"
        />

        <Input
          labelText="Password"
          placeholder=""
          name="password"
          value={formData.password}
          onChange={handleChange}
          error=""
          type="password"
        />

        <button onClick={handleClick} type="submit" className="loginForm__btn">
          Log in
        </button>
      </div>

      <Link className="loginForm__signup-link" to="/create_account">Don't have an account?</Link>
    </form>
  );
}

export default LoginForm;
