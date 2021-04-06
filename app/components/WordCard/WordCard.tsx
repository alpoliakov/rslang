import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { MdHeadset } from 'react-icons/md';
import useSound from 'use-sound';

import { LOCAL_HOST } from '../../constants';
import { useAppContext } from '../../context/ContextApp';

export default function WordCard({ word, chapter }) {
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [audioMeaning, setAudioMeaning] = useState('');
  const [audioExample, setAudioExample] = useState('');
  const [interrupt, setInterrupt] = useState(false);
  const [pageCount, setPageCount] = useState(30);
  const [startMeaning, setStartMeaning] = useState(false);
  const [startExample, setStartExample] = useState(false);

  const { _id, word: wordObj } = word;
  const { data } = useAppContext();
  const { showTranslate, showButtons } = data;

  const [playExample, objPlayExample] = useSound(audioExample, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onend: () => setStartExample(false),
  });
  const [playMeaning, objPlayMeaning] = useSound(audioMeaning, {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onend: () => {
      setStartMeaning(false);
      setStartExample(true);
    },
  });
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const [playWord, objPlayWord] = useSound(wordAudioUrl, { onend: () => setStartMeaning(true) });

  useEffect(() => {
    if (startMeaning) {
      playMeaning();
    }

    if (startExample) {
      playExample();
    }

    if (interrupt) {
      objPlayWord.stop();
      objPlayMeaning.stop();
      objPlayExample.stop();
      setStartMeaning(false);
      setStartExample(false);
    }
  }, [startMeaning, startExample, interrupt]);

  const handleSound = () => {
    setInterrupt(false);

    setTimeout(() => {
      playWord();
    }, 100);
  };

  const handleButtons = async (event) => {
    event.preventDefault();
    console.log(event.target.dataset.name);
  };

  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      mx={{ lg: 8 }}
      my={4}
      key={word._id}
      display={{ lg: 'flex' }}
      w="full"
      maxW={{ lg: '5xl' }}
      shadow={{ lg: 'lg' }}
      rounded={{ lg: 'lg' }}>
      <Box w={{ lg: '40%' }}>
        <Box
          h={{ base: 64, lg: 'full' }}
          rounded={{ lg: 'lg' }}
          bgSize="cover"
          bgPosition="center"
          style={{
            backgroundImage: `url(${LOCAL_HOST}${wordObj.image})`,
          }}
        />
      </Box>
      <Box py={12} px={6} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '60%' }}>
        <Heading
          fontSize={{ base: 'xl', md: '2xl' }}
          color={useColorModeValue('gray.800', 'white')}
          fontWeight="bold">
          <Text color={useColorModeValue('brand.600', 'brand.400')}>
            {wordObj.word} - {wordObj.transcription} {showTranslate && `- ${wordObj.wordTranslate}`}
          </Text>
        </Heading>
        <Box my={2}>
          <Text
            color={useColorModeValue('gray.600', 'gray.200')}
            dangerouslySetInnerHTML={{
              __html: showTranslate
                ? `<p>${wordObj.textMeaning} - ${wordObj.textMeaningTranslate}</p>`
                : `<p>${wordObj.textMeaning}`,
            }}
          />
        </Box>
        <Box my={2}>
          <Text
            color={useColorModeValue('gray.600', 'gray.200')}
            dangerouslySetInnerHTML={{
              __html: showTranslate
                ? `<p>${wordObj.textExample} - ${wordObj.textExampleTranslate}</p>`
                : `<p>${wordObj.textExample}</p>`,
            }}
          />
        </Box>
        <Flex mt={4} w="full" alignItems="center" justifyContent="space-between">
          <IconButton
            colorScheme="teal"
            onMouseDown={() => {
              setInterrupt(true);
              setWordAudioUrl(LOCAL_HOST + `${wordObj.audio}`);
              setAudioMeaning(LOCAL_HOST + `${wordObj.audioMeaning}`);
              setAudioExample(LOCAL_HOST + `${wordObj.audioExample}`);
            }}
            onClick={handleSound}
            aria-label="Listen audio"
            icon={<MdHeadset size="24px" />}
          />
          <Badge fontSize="0.9em" colorScheme="red">
            {word.complexity ? 'cложное' : ''}
          </Badge>
          {showButtons && (
            <Flex alignItems="center" justifyContent="space-between">
              <Button mr={3} data-word={word._id} data-name={chapter} onClick={handleButtons}>
                Восстановить
              </Button>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
}