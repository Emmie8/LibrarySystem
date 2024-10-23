import './App.css';
import UNTLogo from '../src/images/UNTLogo.png';
import PrivateRoutes from '../src/components/PrivateRoutes';
import LoginPage from '../src/pages/login';
import BookcatalogPage from '../src/pages/bookcatalog';
import CheckoutPage from '../src/pages/checkout';
import NotFound404ErrorPage from '../src/pages/NotFound404ErrorPage';
import {useEffect, useState} from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
  NavLink,
} from "react-router-dom";

function App() {
  const IsAuth = sessionStorage.getItem('AuthToken');

  function handleLogout() {
    sessionStorage.removeItem('AuthToken');
    window.location.reload(1);
  }

  const [theme, SetDarkTheme] = useState(false)
  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme);

    const themeBtn = document.querySelector('.btn');

    const className = document.body.className;
    if (className === "dark-theme"){
      themeBtn.textContent = "Light Mode";
    }
    else {
      themeBtn.textContent = "Dark Mode";
    }
  },[theme])

  return (
    <div className="App">
      <Router className="header">
        <div className="logo_btn">
          <div className="untlogo">
            <img
              src={UNTLogo}
              alt="UNT Logo"
              style={{"width": 100, "height": 100}}
            />
          </div>
          <h1>University of North Texas eLibrary</h1>
          <div className='spacingitem' style={{"width":100, "height": 100}}></div>
        </div>
        <nav className="navbar">
          <div className="logintoggle">
            {
              (IsAuth === null) ? 
              <div className="login">
                <NavLink to="/login" className="login">Login</NavLink>
              </div>
              :
              <div className="login">
                <NavLink to="/" onClick={handleLogout} className="login">Logout</NavLink>
              </div>
            }
          </div>
            <NavLink to="/bookcatalog">View eBook Catalog</NavLink>
            { (IsAuth === null) ? <></> : <NavLink to="/checkout">View Checked Out Books</NavLink> }
            <div>
              <button onClick={() => { SetDarkTheme(!theme) }} className="btn">Dark Mode</button>
            </div>
        </nav>
          <Routes>
            <Route path="/" element={<BookcatalogPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/bookcatalog" element={<BookcatalogPage />} />
            <Route element={<PrivateRoutes />} >
              <Route path="/checkout" element={<CheckoutPage />} />
            </Route>
            <Route path='*' element={<NotFound404ErrorPage />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
