import {
  Avatar,
  Box,
  Button,
  Center,
  chakra,
  CircularProgress,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { BiHide, BiShow } from 'react-icons/bi';
import { GiReturnArrow } from 'react-icons/gi';

import ErrorMessage from '../../../components/ErrorMessage';
import Loading from '../../../components/Loading';
import { REG_EMAIL } from '../../../constants';
import { useDeleteUserMutation } from '../../../lib/graphql/deleteUser.graphql';
import { useEditUserMutation } from '../../../lib/graphql/editUser.graphql';
import { useAuth } from '../../../lib/useAuth';
import imageUpload from '../../../utils/imageUpload';

export default function Settings() {
  const { error, signOut, user } = useAuth();
  const [userData, setUserData] = useState(user);
  const [signUpError, setSignUpError] = useState('');
  const [loading, setLoading] = useState(false);
  const [remove, setRemove] = useState(false);
  const inputRef = useRef(null);
  const { colorMode } = useColorMode();
  const color = useColorModeValue('gray.400', 'red.500');

  const router = useRouter();
  const [editUser] = useEditUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const upLoadAvatar = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return setSignUpError('Файл не существует.');
    }

    if (file.size > 1024 * 2048) {
      return setSignUpError('Максимальный размер изображения - 2 Мб!');
    }

    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif') {
      return setSignUpError('Неверный формат изображения!');
    }

    setUserData({ ...userData, avatar: file });
  };

  const validation = async ({ name, email, avatar }) => {
    let result = false;
    await setSignUpError('');

    if (!email || !email.match(REG_EMAIL)) {
      await setSignUpError('Email не валиден');
      result = true;
    }

    if (!name || name.length < 3) {
      await setSignUpError('Имя должно быть больше 2 знаков');
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
    const { name, email } = userData;
    let { avatar } = userData;

    const valid = await validation(userData);

    if (typeof avatar !== 'string') {
      avatar = await imageUpload([avatar]);
    }

    if (!avatar) {
      avatar = '/images/hacker.png';
    }

    if (valid) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await editUser({
        variables: { input: { name, email, avatar } },
      });

      if (data.editUser._id) {
        toast.success('Профиль изменен успешно!');
        router.back();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  if (!userData) {
    return <Loading />;
  }

  const { _id, name, avatar, email } = userData;

  const onDelete = async (e) => {
    e.preventDefault();
    setRemove(true);

    try {
      const { data } = await deleteUser({
        variables: { userId: _id },
      });
      if (data.deleteUser) {
        toast.success('Профиль удален!');
        setRemove(false);
        signOut();
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>User Settings</title>
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
              Хотите изменить свой профиль?
            </chakra.h1>
            <chakra.p
              mb={{ base: 10, md: 4 }}
              fontSize={{ base: 'lg', md: 'xl' }}
              fontWeight="thin"
              color={useColorModeValue('gray.700', 'gray.50')}
              letterSpacing="wider">
              Вы в любое время можете изменить свое имя e-mail и установить понравившийся Вам
              аватар!
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
                <Text pt="2">Настройки профиля</Text>
              </Center>
              {signUpError && <ErrorMessage message={signUpError} />}
              <SimpleGrid
                columns={1}
                px={6}
                py={4}
                spacing={4}
                borderBottom="solid 1px"
                borderColor={useColorModeValue('gray.200', 'gray.600')}>
                <Flex color={useColorModeValue('gray.700', 'gray.50')}>
                  <VisuallyHidden>Name</VisuallyHidden>
                  <Input
                    mt={0}
                    type="text"
                    name="name"
                    value={name}
                    placeholder="Имя (3 знака минимум)"
                    required
                    errorBorderColor="red.300"
                    color={useColorModeValue('gray.700', 'gray.50')}
                    onChange={(e) => {
                      setUserData({ ...userData, name: e.target.value });
                      if (e.target.value.length > 2) {
                        setSignUpError('');
                      }
                    }}
                  />
                </Flex>
                <Flex>
                  <VisuallyHidden>Email Address</VisuallyHidden>
                  <Input
                    mt={0}
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email Address"
                    required
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    color={useColorModeValue('gray.700', 'gray.50')}
                  />
                </Flex>
                <FormControl>
                  <Flex alignItems="center" mt={1}>
                    <Avatar
                      boxSize={12}
                      bg={useColorModeValue('gray.100', 'gray.800')}
                      src={typeof avatar === 'string' ? avatar : URL.createObjectURL(avatar)}
                    />
                    <FormLabel htmlFor="writeUpFile"> </FormLabel>
                    <InputGroup>
                      <input
                        type="file"
                        name="avatar"
                        ref={inputRef}
                        accept="image/*"
                        onChange={upLoadAvatar}
                        style={{ display: 'none' }}></input>
                      <Button
                        type="button"
                        ml={5}
                        variant="outline"
                        size="sm"
                        fontWeight="medium"
                        colorScheme="green"
                        onClick={() => inputRef.current.click()}
                        _focus={{ shadow: 'none' }}>
                        Загрузить аватар
                      </Button>
                    </InputGroup>
                  </Flex>
                </FormControl>
                <Button colorScheme="green" w="full" py={2} type="submit" onClick={onFinish}>
                  {loading ? (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  ) : (
                    'Подтвердите изменения'
                  )}
                </Button>
              </SimpleGrid>
              <Flex px={6} py={4}>
                <Button py={2} w="full" colorScheme="red" onClick={onDelete}>
                  {remove ? (
                    <CircularProgress isIndeterminate size="24px" color="teal" />
                  ) : (
                    'Удалить профиль'
                  )}
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
