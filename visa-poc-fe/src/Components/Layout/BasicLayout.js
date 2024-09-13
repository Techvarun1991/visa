import React from 'react'
import Navbar from '../Pages/Navbar'
import { Outlet } from 'react-router-dom'
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
