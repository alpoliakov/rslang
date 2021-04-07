import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';

import Link from 'next/link';
import React from 'react';

import { AnswerList } from '../Modals/AnswersList';

const ModalEndGame = ({ counter, learnedWords, answersArr }) => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modalEnd-result">
          {counter > 0 ? 'Поздравляю!' : 'Очень жаль.'} Твой результат <br />
          <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
            <CircularProgressLabel size="30px">{counter}</CircularProgressLabel>
          </CircularProgress>
          <br /> баллов!
          <div className="modal-information">
            <Accordion allowToggle={true}>
              <AccordionItem className="modal-accordion-button">
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      подробнее
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="modal-extended-information">
                  <AnswerList learnedWords={learnedWords} answersArr={answersArr} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="actions">
            <ButtonGroup size="md" spacing="12">
              <Link href="/">
                <Button colorScheme="red">закрыть</Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalEndGame };
