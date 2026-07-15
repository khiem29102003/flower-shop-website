'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import "aos/dist/aos.css";
import PreLoader from "./PreLoader";

type AppInitializerProps = {
  children: React.ReactNode;
};

const AppInitializer = ({ children }: AppInitializerProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPreloaderShown, setHasPreloaderShown] = useState(false);

  useEffect(() => {
    const sessionPreloaderShown = sessionStorage.getItem('hasPreloaderShown');
    if (sessionPreloaderShown) {
      setIsLoading(false);
      setHasPreloaderShown(true);
      document.body.style.overflow = 'auto';
      return;
    }

    AOS.init({
      duration: 1000,
      once: true,
    });

    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem('hasPreloaderShown', 'true');
      document.body.style.overflow = 'auto';
    }, 2500); // Adjust duration as needed

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && !hasPreloaderShown && <PreLoader />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
};

export default AppInitializer;