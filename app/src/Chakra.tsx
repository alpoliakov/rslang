import { ChakraProvider, cookieStorageManager, localStorageManager } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import React from 'react';

const theme = extendTheme({
  colors: {
    main: {
      100: '#f7fafc',
      900: '#1a202c',
    },
  },
});

export function Chakra({ cookies, children }) {
  const colorModeManager =
    typeof cookies === 'string' ? cookieStorageManager(cookies) : localStorageManager;

  return (
    <ChakraProvider theme={theme} colorModeManager={colorModeManager}>
      {children}
    </ChakraProvider>
  );
}

export function getServerSideProps({ req }) {
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
}
