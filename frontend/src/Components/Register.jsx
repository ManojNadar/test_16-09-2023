import React, { useState } from "react";
import api from "./ApiConfig";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const route = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, role } = user;

    if (name && email && password && role) {
      const response = await api.post("/register", { user });

      if (response?.data?.success) {
        toast.success(response.data.message);
        setuser({
          name: "",
          email: "",
          password: "",
          role: "user",
        });
        route("/login");
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
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Enter Name"
              onChange={handleChange}
              name="name"
              value={user.name}
            />
          </div>
          <br />
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
            <select value={user.role} name="role" onChange={handleChange}>
              <option>Select Role</option>
              <option value="Admin">Admin</option>
              <option value="user">User</option>
            </select>
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
            <input type="submit" value="Register" />
          </div>
        </form>

        <p>
          Already an User ? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </>
  );
};

export default Register;
