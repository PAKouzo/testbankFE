import React from 'react';
import Header from './header';
import Footer from './footer';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';

const Layout = (props) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{props.title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: '90vh' }}>
        <ToastContainer />
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
