import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
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
import { initializeApollo } from '../../lib/apollo';
import { AggregatedWordDocument } from '../../lib/graphql/aggregatedWord.graphql';
import { useEditAggregatedWordMutation } from '../../lib/graphql/editAggregatedWord.graphql';

export default function WordCard({ word, chapter, refetch }) {
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [audioMeaning, setAudioMeaning] = useState('');
  const [audioExample, setAudioExample] = useState('');
  const [interrupt, setInterrupt] = useState(false);
  const [startMeaning, setStartMeaning] = useState(false);
  const [startExample, setStartExample] = useState(false);

  const [editAggregatedWord] = useEditAggregatedWordMutation();

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

  const editWord = async (dataWord) => {
    try {
      const { data } = await editAggregatedWord({
        variables: { input: { ...dataWord } },
      });

      if (data.editAggregatedWord._id) {
        refetch();
        console.log(data.editAggregatedWord);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const fetchCurrentWord = async (id) => {
    const apollo = initializeApollo();
    try {
      const { data } = await apollo.query({
        query: AggregatedWordDocument,
        variables: { aggregatedWordId: id },
      });

      if (data.aggregatedWord._id) {
        return data.aggregatedWord;
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleButtons = async (event) => {
    event.preventDefault();
    const word = await fetchCurrentWord(event.target.dataset.word);
    const { optional, deleted, studied, complexity } = word;
    const { repeat, rightAnswers } = optional;
    console.log(word);

    const args = {
      id: event.target.dataset.word,
    };

    if (event.target.dataset.name === 'complex') {
      await editWord({
        ...args,
        complexity: false,
        repeat,
        rightAnswers,
        deleted,
        studied,
      });
    }

    if (event.target.dataset.name === 'deleted') {
      await editWord({
        ...args,
        deleted: false,
        repeat,
        rightAnswers,
        complexity,
        studied,
      });
    }
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
      <Box py={12} px={{ base: 2, lg: 6 }} maxW={{ base: 'xl', lg: '5xl' }} w={{ lg: '60%' }}>
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
        <Grid
          mt={4}
          zIndex="0"
          w="100%"
          templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
          gap={{ base: 2, lg: 5 }}>
          <GridItem colSpan={word.complexity ? 2 : 1}>
            <IconButton
              w="100%"
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
          </GridItem>
          {word.complexity ? (
            <Flex align="center" justify="center" bg="red.100" borderRadius={5}>
              <Text style={{ textTransform: 'uppercase' }} color="red.500">
                cложное
              </Text>
            </Flex>
          ) : (
            ''
          )}
          {showButtons && chapter !== 'studied' && (
            <Button mr={3} data-word={word._id} data-name={chapter} onClick={handleButtons}>
              Восстановить
            </Button>
          )}
        </Grid>
      </Box>
    </Box>
  );
}
