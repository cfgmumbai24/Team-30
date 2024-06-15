import './App.css';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'


import Header from './components/Header';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/leaderboard' element={<Leaderboard/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
