
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './screens/LoginPage';
import SignUpPage from './screens/SignUpPage';
import HomePage from './screens/HomePage';
import { CartProvider } from './components/ContextReducer';
import  MyOrder  from './screens/MyOrder';
const App = () => {
  return (
    <CartProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route exact path="/myorder" element={<MyOrder />} />
            {/* <Route path='/Cart' element={<Cart/>}/> */}
          </Routes>
        </Router>
      </div>
    </CartProvider>
  );
};

export default App;
