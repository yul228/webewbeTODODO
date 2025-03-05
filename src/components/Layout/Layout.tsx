import React, { ReactNode } from 'react';

import Header from '../Haederochek/Header'; 
import Footer from '../Footerochek/Footer'; 

interface LayoutProps {
    children: ReactNode; 
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header /> 
            <main >
                {children} 
            </main>
            <Footer />
        </>
    );
};

export default Layout;