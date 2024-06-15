import React, { useState } from 'react'
import LoginInput from '../components/LoginInput';
import '../styles/signup.scss';
import { Link } from 'react-router-dom';

const Signup = () => {
    const [values,setValues]=useState(
        {
          username:"",
          email:"",
          phoneno:"",
          city:"",
          password:"",
        }
      );
    
      const inputs=[
        {
          id:1,
          name: "username",
          type: "text",
          placeholder:"Username",
          label:"Username",
          required:"true"
        },
        {
          id:2,
          name: "email",
          type: "email",
          placeholder:"Email",
          label:"Email"
        },
        {
          id:3,
          name: "phoneno",
          type: "number",
          placeholder:"Phone Number",
          label:"Phone Number",
          required:"true"
        },
        {
          id:4,
          name: "city",
          type: "text",
          placeholder:"City",
          label:"City",
          required:"true"
        },
        {
          id:5,
          name: "Password",
          type: "password",
          placeholder:"Password",
          label:"Confirm Password"
        }
      ];
    
      const handleSubmit=(e)=>{
        e.preventDefault();
        
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
          <span>Already have an account?<Link to={'/login'}>Log In</Link></span>
          </form>
        </div>
      );
}

export default Signup