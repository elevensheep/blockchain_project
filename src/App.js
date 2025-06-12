import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Component/Header";
import Footer from './Component/Footer';
import MainPage from './MainPage/MainPage';
import Login from './Sign/Login';
import Signup from './Sign/Signup';
import PasswordReset from './Sign/PasswordReset';
import TermsAgreement from './Sign/TermsAgreement';
import ListPage from './ListPage/ListPage';
import AddCarPage from './AddCarPage/AddCarPage';
import CarSellPage from './CarSellPage/CarSellPage';
import TransactionPage from './TransactionPage/TransactionPage';
import CarInfoPage from './CarInfoPage/CarInfoPage';
import RedirectPage from './Component/RedirectPage';
import MyPage from './MyPage/MyPage';
import VerifyUser from './Component/VerifyUser';
import './App.css';
import NFTSellPage from './CarSellPage/NFTSellPage';
import NFTMove from './TransactionPage/NFTMove';
//import MyCarListTest from './Component/MyCarListTest';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/terms" element={<TermsAgreement />} />
          <Route path='/list' element={<ListPage />} />
          <Route path="/addcar" element={<AddCarPage />} />
          <Route path="/transaction/:transactionId" element={<TransactionPage />} />
          <Route path="/sell" element={<CarSellPage />} />
          <Route path="/carinfo/:carId" element={<CarInfoPage />} />
          <Route path="/redirect" element={<RedirectPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/verify-user" element={<VerifyUser />} />
          <Route path="/nftSell" element={<NFTSellPage />} />
          <Route path="/nftmove" element={<NFTMove />} />
          {/* <Route path="/test" element={<MyCarListTest />} /> */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
