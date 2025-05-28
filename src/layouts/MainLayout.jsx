import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Shared/Navbar/Navbar';
import Footer from '../components/Shared/Footer/Footer';
import ScrollToTop from '../components/Shared/ScrollToTop/ScrollToTop';

const MainLayout = () => {
    return (
        <div className='bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200'>
            <ScrollToTop></ScrollToTop>

            <div>
                <Navbar></Navbar>
            </div>

            <div>
                <Outlet></Outlet>
            </div>

            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default MainLayout;