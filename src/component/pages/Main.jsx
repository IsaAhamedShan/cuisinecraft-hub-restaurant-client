import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';

const Main = () => {

const [theme, setTheme] = useState('light');
const location = useLocation()
console.log(location)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
    return (
        <div>
            {location.pathname !== ('/signin'||'/register') && <Navbar></Navbar>}
              
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;