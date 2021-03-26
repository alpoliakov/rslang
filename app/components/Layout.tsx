import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';
import { Toaster } from 'react-hot-toast';

import Footer from './Footer';
import Header from './Header';
import ToasterLayout from './ToasterLayout';

export default function Layout({ children }) {
  const bg = useColorModeValue('gray.50', '#223c50');

  const postVariants = {
    initial: { scale: 0.96, y: 30, opacity: 0 },
    enter: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.48, 0.15, 0.25, 0.96] },
    },
    exit: {
      scale: 0.6,
      y: 100,
      opacity: 0,
      transition: { duration: 0.5, ease: [0.48, 0.15, 0.25, 0.96] },
    },
  };

  const MotionBox = motion(Box);

  return (
    <Box className="main_container" bg={bg}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Toaster />
      <Header />
      <ToasterLayout />
      <MotionBox
        initial="initial"
        animate="enter"
        exit="exit"
        variants={postVariants}
        display="flex"
        alignItems="center"
        width="full"
        height="full">
        {children}
      </MotionBox>
      <Footer />
    </Box>
  );
}
