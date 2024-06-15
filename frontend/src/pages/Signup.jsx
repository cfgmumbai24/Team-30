import React, { useState } from "react";
import LoginInput from "../components/LoginInput";
import "../styles/signup.scss";
import { Link } from "react-router-dom";
import { apiConnector } from "../services/apiConnector";
import toast from "react-hot-toast";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phoneno: "",
    area: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Username",
      label: "Username",
      required: "true",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
    },
    {
      id: 3,
      name: "phoneno",
      type: "number",
      placeholder: "Phone Number",
      label: "Phone Number",
      required: "true",
    },
    {
      id: 4,
      name: "area",
      type: "text",
      placeholder: "City",
      label: "City",
      required: "true",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Confirm Password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading... ");
    try {

      console.log(values)
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/register",
        values
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("User Added Successfully")
    } catch (error) {
      console.log("REGISTER API ERROR............", error);
      toast.error("Could Not Update Profile");
    }

    toast.dismiss(toastId);
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  console.log(values);
  return (
    <div className="signup">
      <form onSubmit={handleSubmit}>
        {inputs.map((input) => (
          <LoginInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button>Submit</button>
        <span>
          Don't have an account?<Link to={"/login"}>Log In</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
