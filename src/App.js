import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import MainPage from './MainPage/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>

        {/* 추후 로그인/회원가입용 라우트 */}
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;