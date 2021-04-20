import {
  Box,
  Button,
  Center,
  chakra,
  CircularProgress,
  Flex,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
// import { motion } from 'framer-motion';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { GiReturnArrow } from 'react-icons/gi';

import ErrorMessage from '../../components/ErrorMessage';
import { REG_EMAIL } from '../../constants';
import { useAuth } from '../../lib/useAuth';

export default function SignIn() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('gray.400', 'red.500');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpError, setSignUpError] = useState('');
  const { error, signIn, user } = useAuth();
  const router = useRouter();

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const validation = async ({ email, password }) => {
    let result = false;
    await setSignUpError('');

    if (!password || password.length < 7 || password.length > 12) {
      await setSignUpError('Пароль должен быть от 8 до 12 знаков');
      result = true;
    }

    if (!email || !email.match(REG_EMAIL)) {
      await setSignUpError('Email не валиден');
      result = true;
    }

    return result;
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }

    if (signUpError) {
      setLoading(false);
    }

    if (error) {
      setLoading(false);
      setSignUpError(error);
    }
  }, [user, signUpError, error]);

  const onFinish = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { email, password } = userData;

    const valid = await validation(userData);

    if (valid) {
      setLoading(false);
      return;
    }

    await signIn(email, password);
  };

  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>Sign In</title>
      </Head>
      <Box px={8} py={24} mx="auto">
        <SimpleGrid
          alignItems="center"
          w={{ base: 'full', xl: 11 / 12 }}
          columns={{ base: 1, lg: 11 }}
          gap={{ base: 0, lg: 24 }}
          mx="auto">
          <GridItem colSpan={{ base: 'auto', lg: 7 }} textAlign={{ base: 'center', lg: 'left' }}>
            <chakra.h1
              mb={4}
              fontSize={{ base: '3xl', md: '4xl' }}
              fontWeight="bold"
              lineHeight={{ base: 'shorter', md: 'none' }}
              color={useColorModeValue('gray.900', 'gray.200')}
              letterSpacing={{ base: 'normal', md: 'tight' }}>
              Готовы продолжить свое путешествие?
            </chakra.h1>
            <chakra.p
              mb={{ base: 10, md: 4 }}
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="thin"
              color={useColorModeValue('gray.700', 'gray.50')}
              letterSpacing="wider">
              Продолжай свое путешествие в мире английского языка вместе с нами!
            </chakra.p>
          </GridItem>
          <GridItem colSpan={{ base: 'auto', md: 4 }}>
            <Box
              as="form"
              mb={6}
              rounded="lg"
              shadow="xl"
              bg={useColorModeValue('gray.50', 'gray.700')}>
              <Center pb={0} color={useColorModeValue('gray.700', 'gray.50')}>
                <Text pt="2">Войти</Text>
              </Center>
              {signUpError && <ErrorMessage message={signUpError} />}
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Flex>
                  <VisuallyHidden>Email Address</VisuallyHidden>
                  <Input
                    mt={0}
                    type="email"
                    placeholder="Email Address"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                    color={useColorModeValue('gray.700', 'gray.50')}
                  />
                </Flex>
                <Flex>
                  <InputGroup>
                    <VisuallyHidden>Password</VisuallyHidden>
                    <Input
                      mt={0}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Пароль"
                      onChange={(e) => {
                        setUserData({ ...userData, password: e.target.value });
                        if (e.target.value.length > 7 && e.target.value.length < 13) {
                          setSignUpError('');
                        }
                      }}
                      color={useColorModeValue('gray.700', 'gray.50')}
                      required
                    />
                    <InputRightElement width="3rem">
                      <Button h="1.5rem" size="sm" onClick={handlePasswordVisibility}>
                        {showPassword ? <Icon as={BiHide} /> : <Icon as={BiShow} />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </Flex>
                <Button colorScheme="green" w="full" py={2} type="submit" onClick={onFinish}>
                  {loading ? (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  ) : (
                    'Войти'
                  )}
                </Button>
              </SimpleGrid>
              <Flex px={6} py={4}>
                <Button
                  py={2}
                  w="full"
                  colorScheme="blue"
                  onClick={() => router.push('/auth/signup')}>
                  Зарегистрироваться
                </Button>
              </Flex>
              <Center pb={0} color={useColorModeValue('gray.700', 'gray.50')}>
                <Text pt="2" pb="4" type="button" onClick={() => router.back()} cursor="pointer">
                  <Icon
                    as={GiReturnArrow}
                    w={7}
                    h={7}
                    color={color}
                    _hover={{
                      color: colorMode === 'light' ? '#223c50' : 'red.600',
                    }}
                    className="shadow__item hover__item"
                  />
                </Text>
              </Center>
            </Box>
          </GridItem>
        </SimpleGrid>
      </Box>
    </Flex>
  );
}
