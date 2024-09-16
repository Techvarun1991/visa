import React, { useEffect } from 'react'
import Navbar from '../Pages/Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import { styled } from '@mui/material';
import Footer from '../Pages/Footer';

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: '2%',
    paddingRight: '5%',
    paddingLeft: '5%',
    paddingBottom: '5%',
}));

export default function BasicLayout() {

    const location = useLocation(); // Detects the route changes

    useEffect(() => {
        // Scroll to top when the route changes
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <>
            <Navbar />
            <Main>
                <Outlet />
            </Main>
            <Footer />
        </>
    )
}
