import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

export default function SignUp() {
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
    <Box>
      <Head>
        <title>Sign Up</title>
      </Head>
      <MotionBox initial="initial" animate="enter" exit="exit" variants={postVariants}>
        <h1>Sign Up Page</h1>
      </MotionBox>
    </Box>
  );
}
