import React from 'react'
import { Link } from 'react-router-dom'
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import '../styles/header.scss';

const Header = () => {
  return (
    <div className='header'>
        <Link to={'/'} className='logo'>Multiply</Link>
        <div className='nav'>Guides <KeyboardArrowDownIcon/> </div>
        <div className='nav'>Calculators <KeyboardArrowDownIcon/> </div>
        <div className='nav'>Discover <KeyboardArrowDownIcon/> </div>
        <Link to={'/about'} className='nav'>About Us</Link>
        <Link to={'/discusssionforum'} className='nav'>Discussion Forum</Link>
        <div className='icons'>
            <WhatsAppIcon className='icon'/>
            <GTranslateIcon className='icon'/>
            <AccountCircleIcon className='icon'/>
        </div>
    </div>
  )
}

export default Header