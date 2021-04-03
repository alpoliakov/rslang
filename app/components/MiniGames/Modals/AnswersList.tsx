import { List, ListItem, ListIcon } from '@chakra-ui/react';
import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import React from 'react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
  } from "@chakra-ui/react"

export const AnswerList = ({ words }) => {
  return (
    // <List spacing={2}>
    //   {words.map((word) =>
    //     word.learned ? (
    //       <ListItem>
    //         <ListIcon as={CheckCircleIcon} color="green" />
    //         {word.word}
    //       </ListItem>
    //     ) : (
    //       <ListItem>
    //         <ListIcon as={NotAllowedIcon} color="red" />
    //         {word.word}
    //       </ListItem>
    //     ),
    //   )}
    // </List>

//     <Table variant="simple">
//   <Thead>
//     <Tr>
//       <Th>Выучил</Th>
//       <Th>Ошибок</Th>
//     </Tr>
//   </Thead>
//   <Tbody>
//     <Tr>
//       <Td>inches</Td>
//       <Td>millimetres (mm)</Td>
//     </Tr>
//     <Tr>
//       <Td>feet</Td>
//       <Td>centimetres (cm)</Td>
//     </Tr>
//     <Tr>
//       <Td>yards</Td>
//       <Td>metres (m)</Td>
//     </Tr>
//   </Tbody>
//   <Tfoot>
//     <Tr>
//       <Th>To convert</Th>
//       <Th>into</Th>
//     </Tr>
//   </Tfoot>
// </Table>
  );
};


