import React, { useState } from 'react'
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';

const Login = () => {
    const [values,setValues]=useState(
        {
          phoneno:"",
          password:"",
        }
      );
    
      const inputs=[
        {
          id:1,
          name: "phoneno",
          type: "number",
          placeholder:"Number",
          label:"Phone Number",
          required:"true"
        },
        {
          id:2,
          name: "password",
          type: "password",
          placeholder:"Password",
          label:"Password"
        }
      ];
    
      const handleSubmit= async (e)=>{
        e.preventDefault();

        const toastId = toast.loading("Loading... ");
    try {

      console.log(values)
      const response = await apiConnector(
        "POST",
        "http://localhost:4000/login",
        values
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfully")
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Could Not LOGIN");
    }

    toast.dismiss(toastId);
      };
    
      const onChange=(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
      };
      console.log(values);
      return (
        <div className="signup">
          <form onSubmit={handleSubmit}>
          {inputs.map((input)=>(
            <LoginInput key={input.id} {...input} value={values[input.name]} onChange={onChange}/>
          ))}
          <button>Submit</button>
          <span>Don't have an account?<Link to={'/signup'}>Sign Up</Link></span>
          </form>
        </div>
      );
}

export default Login