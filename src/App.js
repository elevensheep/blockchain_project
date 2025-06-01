import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Component/Header";
import Footer from './Component/Footer';
import MainPage from './MainPage/MainPage';
import Login from './Login/login';
import Signup from './Login/signup';
import AddCarPage from './AddCarPage/AddCarPage';
import CarInfoPage from './CarInfoPage/CarInfoPage';
import ConnectWallet from './Component/ConnectWallet' 
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />

        <ConnectWallet />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/addcar" element={<AddCarPage />} />
          <Route path="/carinfo" element={<CarInfoPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
