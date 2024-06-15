import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import '../styles/header.scss';

const Header = ({ coins }) => {
    const navigate=useNavigate();
  return (
    
    <div className='header'>
        <Link to={'/'} className='logo'>Multiply</Link>
        <div className='nav'>Guides <KeyboardArrowDownIcon/> </div>
        <div className='nav'>Calculators <KeyboardArrowDownIcon/> </div>
        <div className='nav'>Discover <KeyboardArrowDownIcon/> </div>
        <Link to={'/about'} className='nav'>About Us</Link>
        <Link to={'/discusssionforum'} className='nav'>LEADERBOARD</Link>
        <div className='icons'>
            <WhatsAppIcon className='icon'/>
            <GTranslateIcon className='icon'/>
            {/* <AccountCircleIcon className='icon'/> */}
        </div>
        <div className='coins'>
            <MonetizationOnIcon/>
            <p>{coins}</p>
        </div>
        <button onClick={()=>navigate('/signup')}>Sign Up</button>
        <button onClick={()=>navigate('/login')}>Log In</button>
    </div>
  )
}

export default Header