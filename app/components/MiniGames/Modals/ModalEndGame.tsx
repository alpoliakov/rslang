import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { CircularProgress, CircularProgressLabel, useColorModeValue } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';
import { List, ListIcon, ListItem } from '@chakra-ui/react';
import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { AnswerList } from '../Modals/AnswersList';

import {
  white,
  modalEntranceBackground,
  modalBoxColor,
} from 'components/MiniGames/helpers/constants';

const ModalEndGame = ({ counter }) => {
  // useHotkeys('esc', () => setTimeOver(!timeOver));
  // useHotkeys('enter', () => setTimeOver(!timeOver));

  const buttonColor = useColorModeValue(white.LIGHT, white.DARK);
  const backGroudColor = useColorModeValue(
    modalEntranceBackground.LIGHT,
    modalEntranceBackground.DARK,
  );
  const boxColor = useColorModeValue(modalBoxColor.LIGHT, modalBoxColor.DARK);

  return (
    <div className="modal-container" style={{ backgroundColor: `${backGroudColor}` }}>
      <div className="modal" style={{ backgroundColor: `${boxColor}` }}>
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
                  {/* <AnswerList words={words} /> */}
                  <List spacing={2}>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Lorem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Assumend
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Lorem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Assumend
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Lorem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={CheckCircleIcon} color="green.500" />
                      Assumend
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={NotAllowedIcon} color="red" />
                      Quidem
                    </ListItem>
                  </List>

                  {/* <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Выучил</Th>
                        <Th>Ошибок</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>
                          <ListItem>
                            <ListIcon as={CheckCircleIcon} color="green.500" />
                            Lorem
                          </ListItem>
                        </Td>
                        <Td>
                          <ListItem>
                            <ListIcon as={NotAllowedIcon} color="red" />
                            Quidem
                          </ListItem>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>
                          <ListItem>
                            <ListIcon as={CheckCircleIcon} color="green.500" />
                            Lorem
                          </ListItem>
                        </Td>
                        <Td>
                          <ListItem>
                            <ListIcon as={NotAllowedIcon} color="red" />
                            Quidem
                          </ListItem>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td></Td>
                        <Td>
                          <ListItem>
                            <ListIcon as={NotAllowedIcon} color="red" />
                            Quidem
                          </ListItem>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table> */}
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
