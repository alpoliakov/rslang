import { Box, Container, Flex, Heading, Link, Spacer, Text, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import React from 'react';

export default function Footer() {
  const bg = useColorModeValue('gray.50', '#223c50');

  return (
    <Box w="100%" position="sticky" bottom="0" zIndex="10" bg={bg} boxShadow="inner">
      <Container maxW="container.xl" >
        <Flex
          alignItems="center"
          direction={['column', 'column', 'row']}
          justifyContent="space-between"
          w="100%"
          p={2}>
          <Link href="https://rs.school/react/" target="_blank" className="shadow__item hover__item">
            <Image src="/images/rs_school_logo.svg" width="100px" height="30px" />
          </Link>
          <Flex size="md" alignItems="center" direction={['column', 'column', 'row']}>
            <Text p="1">Created at 2021: </Text>
            <Flex wrap="wrap" align="center" justify="center">
              <Link
                href="https://github.com/alpoliakov"
                target="_blank"
                _hover={{
                  color: 'red.500',
                }}
                p="1"
                className="shadow__item hover__item">
                @alpoliakov
              </Link>
              <Link
                href="https://github.com/ya-mashnenko"
                target="_blank"
                p="1"
                _hover={{
                  color: 'red.500',
                }}
                className="shadow__item hover__item">
                @ya&#8209;mashnenko
              </Link>
              <Link
                href="https://github.com/w1r3d7"
                target="_blank"
                p="1"
                _hover={{
                  color: 'red.500',
                }}
                className="shadow__item hover__item">
                @w1r3d7
              </Link>
              <Link
                href="https://github.com/buiiz"
                target="_blank"
                p="1"
                _hover={{
                  color: 'red.500',
                }}
                className="shadow__item hover__item">
                @buiiz
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
