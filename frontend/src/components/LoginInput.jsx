import React from 'react'

const LoginInput = (props) => {
    const {label,id,onChange,...inputProps}=props;
  return (
    <div className='formInput'>
        <label>{label}</label>
        <input  {...inputProps} onChange={onChange} />
    </div>
  )
}

export default LoginInput