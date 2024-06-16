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
  const [points, setPoints] = useState(null); // State to hold user points

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        // Fetch user points from backend
        const response = await apiConnector.get('/user/points'); // Adjust endpoint as needed

        if (response.data.success) {
          setPoints(response.data.points); // Update points state with fetched points
        } else {
          console.error('Failed to fetch user points:', response.data.message);
        }
      } catch (error) {
        console.error('Failed to fetch user points:', error.message);
      }
    };

    fetchUserPoints(); // Call fetchUserPoints directly inside useEffect

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <Router>
      <Header points={points} /> {/* Pass points to Header */}
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
