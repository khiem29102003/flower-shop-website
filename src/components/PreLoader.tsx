'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const PreLoader = () => {
  const text = "BELOVED BLOOM";

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Animate children one after another
        delayChildren: 0.5, // Delay before children start animating
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 10, stiffness: 100, duration: 0.8 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', damping: 12, stiffness: 100, duration: 0.5 },
    },
  };

  const preloaderStyle: React.CSSProperties = {
    height: '100vh',
    width: '100vw',
    backgroundColor: 'var(--secondary-color)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    zIndex: 9999,
    top: 0,
    left: 0,
  };

  const textStyle: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: 'var(--primary-color)',
    display: 'flex',
  };

  return (
    <motion.div
      style={preloaderStyle}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.7, delay: 1.5 } }} // Animate out after a delay
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <motion.div variants={logoVariants}>
          <Image src="/logo.png" alt="Beloved Bloom Logo" width={500} height={500} />
        </motion.div>
        <motion.div
          style={textStyle}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }} // Stagger letters
          className="mt-3"
        >
          {text.split('').map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default PreLoader;

