import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar/Navbar';

const Main = () => {

const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);
    return (
        <div>
            <Navbar></Navbar>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Main;