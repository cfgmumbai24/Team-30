import React, { useState } from 'react'
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';

const Login = () => {
    const [values,setValues]=useState(
        {
          username:"",
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
          <span>Don't have an account?<Link to={'/signup'}>Sign Up</Link></span>
          </form>
        </div>
      );
}

export default Login