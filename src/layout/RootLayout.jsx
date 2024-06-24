import React from 'react'
import Header from '../components/header/Header'
import {Outlet} from 'react-router-dom';
import Footer from '../components/footer/Footer';
const RootLayout = () => {
  return (
    <div>
        <Header></Header>
        <div>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default RootLayout