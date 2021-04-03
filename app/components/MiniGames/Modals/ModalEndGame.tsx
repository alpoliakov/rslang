import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalEndGame = ({ counter }) => {
  // useHotkeys('esc', () => setTimeOver(!timeOver));
  // useHotkeys('enter', () => setTimeOver(!timeOver));

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modalEnd-result">
          {counter > 0 ? 'Поздравляю!' : 'Очень жаль.'} Твой результат <br />
          <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
            <CircularProgressLabel size="40px">{counter}</CircularProgressLabel>
          </CircularProgress>
          <br /> баллов!
          <div className="modal-information">
            <Accordion>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      подробнее
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} className="modal-extended-information">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
