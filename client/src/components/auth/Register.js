import React, { useState } from "react";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    companyName: "",
    KBIS: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    baseURL: "",
  });

  let navigate = useNavigate();

  const handleInputChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };

  const register = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("user/register", userData);
      console.log(response.data);
      navigate("/email-verification");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Inscription</h2>
      <form onSubmit={register}>
        <div className="form-group">
          <label>Nom de l'entreprise:</label>
          <input
            type="text"
            className="form-control"
            name="companyName"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>KBIS:</label>
          <input
            type="text"
            className="form-control"
            name="KBIS"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Prénom:</label>
          <input
            type="text"
            className="form-control"
            name="firstName"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            className="form-control"
            name="lastName"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Numéro:</label>
          <input
            type="text"
            className="form-control"
            name="phoneNumber"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>Base URL:</label>
          <input
            type="text"
            className="form-control"
            name="baseURL"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Register;
