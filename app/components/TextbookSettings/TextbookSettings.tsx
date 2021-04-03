import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Switch,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { useAppContext } from '../../context/ContextApp';

export default function TextbookSettings({ onClose, isOpen }) {
  const { data, setData } = useAppContext();
  const [showTranslate, setShowTranslate] = useState(data.showTranslate);
  const [showButtons, setShowButtons] = useState(data.showButtons);

  const handleSettings = (e) => {
    e.preventDefault();
    setData({ showTranslate, showButtons });
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Settings textbook</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="row">
            <Text>Покзать перевод</Text>
            <Switch
              colorScheme="teal"
              size="lg"
              defaultChecked={showTranslate}
              onChange={() => setShowTranslate(!showTranslate)}
            />
            <Text>Показать кнопки</Text>
            <Switch
              colorScheme="teal"
              size="lg"
              defaultChecked={showButtons}
              onChange={() => setShowButtons(!showButtons)}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSettings}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
