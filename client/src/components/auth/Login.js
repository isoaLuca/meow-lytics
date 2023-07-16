import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [appSecret, setAppSecret] = useState("");
  let navigate = useNavigate();
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("user/login", {
        email,
        APP_SECRET: appSecret,
      });
      Cookies.set("appID", response.data.appID);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={login}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>
            L'APP_SECRET (--que vous avez reçu par mail suite à votre
            confirmation):
          </label>
          <input
            type="text"
            className="form-control"
            name="appSecret"
            value={appSecret}
            onChange={(e) => setAppSecret(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;
