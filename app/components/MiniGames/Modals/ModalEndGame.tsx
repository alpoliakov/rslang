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
import { AnswerList } from '../Modals/AnswersList';
import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const ModalEndGame = ({ counter }) => {
  // useHotkeys('esc', () => setTimeOver(!timeOver));
  // useHotkeys('enter', () => setTimeOver(!timeOver));

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
