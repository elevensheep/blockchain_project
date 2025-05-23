import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import Header from "./Component/Header";
import MainPage from './MainPage/MainPage';
import AddCarPage from './AddCarPage/AddCarPage';
import CarInfoPage from './CarInfoPage/CarInfoPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcar" element={<AddCarPage />} />
          <Route path="/carinfo" element={<CarInfoPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
