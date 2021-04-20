import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';

export default function Loading() {
  const itemColor = useColorModeValue('black', 'white');
  return (
    <div className="loading" style={{ top: 0, left: 0, zIndex: 9 }}>
      <svg width="150" height="150" viewBox="0 0 40 50">
        <polygon strokeWidth="1" stroke={itemColor} fill="none" points="20,1 40,40 1,40"></polygon>
        <text fill={itemColor} x="5" y="47">
          Loading...
        </text>
      </svg>
    </div>
  );
}
