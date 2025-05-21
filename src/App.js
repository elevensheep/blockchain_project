// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import Banner from './Component/banner';
import './App.css';

function App() {
  return (
    <div className="App">
      <Banner />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;