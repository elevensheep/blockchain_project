import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/login';
import Signup from './Login/signup';
import Header from "./Component/Header";
import MainPage from './MainPage/MainPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <MainPage />

        {/* 추후 로그인/회원가입용 라우트 */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;