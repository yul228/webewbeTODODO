import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import Header from '../../Haederochek/Header';
import Footer from '../../Footerochek/Footer';

const HomePage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate('/todolist'); 
  };

  return (
    <div className={styles.homepage}>
      <Header />
      <div className={styles.content}>
        <svg className={styles.neonLine} viewBox="0 0 500 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor="rgb(255, 16, 147)" />
            </linearGradient>
          </defs>
          <path d="M0,50 Q250,0 500,50" stroke="url(#neonGradient)" />
        </svg>
        <img src="/computer1.png" alt="Computer" className={styles.computerImage} />
        <button className={`${styles.ctaButton} ${styles.btnNew}`} onClick={handleClick}>
          Погнали
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;