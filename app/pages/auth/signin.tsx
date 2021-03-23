import { Box, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import React from 'react';

export default function SignIn() {
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
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>Sign In</title>
      </Head>
      <MotionBox initial="initial" animate="enter" exit="exit" variants={postVariants}>
        <h1>Sign In Page</h1>
      </MotionBox>
    </Flex>
  );
}
