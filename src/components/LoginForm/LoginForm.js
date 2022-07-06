import Validator from "../../helpers/validator";
import Input from "../Input/Input";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);

      if (!user) {
        localStorage.removeItem("token");
      } else {
        navigate("/dashboard");
      }
    }
  }, []);

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

      <Link className="loginForm__signup-link" to="/create_account">
        Don't have an account?
      </Link>
    </form>
  );
}

export default LoginForm;
