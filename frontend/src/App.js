import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import Modules from './pages/Modules';
import { apiConnector } from './services/apiConnector'; // Assuming you have an API connector service

function App() {
  const [coins, addCoins] = useState(0); // State to hold user points

  return (
    <Router>
      <Header coins={coins} /> {/* Pass points to Header */}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
        <Route path='/modules' element={<Modules coins={coins} addCoins={addCoins}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
