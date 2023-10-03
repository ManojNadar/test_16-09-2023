import React, { useContext, useState } from "react";
import api from "./ApiConfig";
import toast from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { quizContext } from "./Context/AuthContext";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });

  const route = useNavigate();
  const { login } = useContext(quizContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      const response = await api.post("/login", { user });

      if (response?.data?.success) {
        const token = response?.data?.token;
        const userData = response?.data?.user;

        login(userData, token);
        toast.success(response.data.message);
        setuser({
          email: "",
          password: "",
        });
        route("/");
      } else {
        toast.error(response.data.message);
      }
    } else {
      toast.error("all fields are mandatory");
    }
  };
  return (
    <>
      <div className="formContainer">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter Email"
              onChange={handleChange}
              name="email"
              value={user.email}
            />
          </div>
          <br />
          <div>
            <input
              type="password"
              placeholder="Enter password"
              onChange={handleChange}
              name="password"
              value={user.password}
            />
          </div>
          <br />
          <div>
            <input type="submit" value="Login" />
          </div>
        </form>
        <p>
          Already an User ? <NavLink to="/register">Register</NavLink>
        </p>
      </div>
    </>
  );
};

export default Login;
