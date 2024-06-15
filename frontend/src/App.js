import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'


import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import { useState } from 'react';
import Modules from './pages/Modules';

function App() {
  const [coins, setCoins] = useState(50); // Assuming the user starts with 50 coins

  const addCoins = (amount) => {
    setCoins((prevCoins) => prevCoins + amount);
  };
  return (
    <Router>
      <Header coins={coins}/>
      <Routes>
        <Route path='/' element={<Home coins={coins} addCoins={addCoins}/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/modules' element={<Modules/>}/>
      </Routes>
    </Router>
  );
}

export default App;
