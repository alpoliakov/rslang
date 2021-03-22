import { Box } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const GradientContainer = ({ children, mb = 0 }) => {
  const bgGradient = useColorModeValue(
    'linear(to-r, #FFDEE9 0%, #B5FFFC 100%)',
    'linear(to-r, #0093E9 0%, #80D0C7 100%)',
  );

  return (
    <Box bgGradient={bgGradient} px={5} py={10} borderRadius={20} mb={mb}>
      {children}
    </Box>
  );
};

export default GradientContainer;
