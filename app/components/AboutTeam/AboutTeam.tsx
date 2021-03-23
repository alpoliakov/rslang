import { Badge, Flex, Grid, Heading, Stack } from '@chakra-ui/layout';
import { Avatar, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const TeamMember = ({ name, githubName, githubUrl, avatarUrl, children }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ ease: 'linear', duration: 0.3 }}>
      <Flex
        align="center"
        direction="column"
        justify="center"
        w="100%"
        h="150"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg">
        <Flex direction="column" justify="center" align="center">
          <Avatar size="lg" name={name} src={avatarUrl} />
          <Link href={githubUrl}>{githubName}</Link>
          <Stack direction="row">{children}</Stack>
        </Flex>
      </Flex>
    </motion.div>
  );
};

const AboutTeam = () => {
  return (
    <>
      <Heading as="h2" textAlign="center">
        Наша команда
      </Heading>
      <Grid
        templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
        gap={10}
        w="80%"
        mx="auto">
        <TeamMember
          name="Alexsandr Poliakov"
          avatarUrl="https://bit.ly/sage-adebayo"
          githubUrl="https://github.com/alpoliakov"
          githubName="@alpoliakov">
          <Badge>Backend</Badge>
          <Badge colorScheme="green">Саванна</Badge>
          <Badge colorScheme="red">Ы</Badge>
          <Badge colorScheme="purple">Ленивец</Badge>
        </TeamMember>
        <TeamMember
          name="Yaroslava Mashnenko"
          avatarUrl="https://bit.ly/sage-adebayo"
          githubUrl="https://github.com/ya-mashnenko"
          githubName="@ya-mashnenko">
          <Badge>Backend</Badge>
          <Badge colorScheme="green">Саванна</Badge>
          <Badge colorScheme="red">Ы</Badge>
          <Badge colorScheme="purple">Ленивец</Badge>
        </TeamMember>
        <TeamMember
          name="Ivan Tur"
          avatarUrl="https://bit.ly/sage-adebayo"
          githubUrl="https://github.com/buiiz"
          githubName="@buiiz">
          <Badge>Backend</Badge>
          <Badge colorScheme="green">Саванна</Badge>
          <Badge colorScheme="red">Ы</Badge>
          <Badge colorScheme="purple">Ленивец</Badge>
        </TeamMember>
        <TeamMember
          name="Sergey Klimov"
          avatarUrl="https://bit.ly/sage-adebayo"
          githubUrl="https://github.com/w1r3d7"
          githubName="@w1r3d7">
          <Badge>Backend</Badge>
          <Badge colorScheme="green">Саванна</Badge>
          <Badge colorScheme="red">Ы</Badge>
          <Badge colorScheme="purple">Ленивец</Badge>
        </TeamMember>
      </Grid>
    </>
  );
};

export default AboutTeam;
