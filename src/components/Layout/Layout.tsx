import React from 'react';
import styles from './Layout.module.css'; 
import Header from '../Haederochek/Header'
import Footer from '../Footerochek/Footer'

const Layout: React.FC = () => {
  return (
    <><Header />
    <div className={styles.containerLayout}>

    </div>
    <Footer /></>
  );
};

export default Layout;