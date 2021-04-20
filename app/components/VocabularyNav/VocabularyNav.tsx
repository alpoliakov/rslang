import { Tab } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

export default function VocabularyNav({ link, pathName, index, title }) {
  return (
    <>
      <Tab py={4} px={{ base: 2, xl: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
        <NextLink href={`${link}${pathName}${index}`}>{title}</NextLink>
      </Tab>
    </>
  );
}
