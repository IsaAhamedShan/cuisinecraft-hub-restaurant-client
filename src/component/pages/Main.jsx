import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';

const Main = () => {
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