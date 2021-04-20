import { Badge, Flex, Grid, GridItem, Heading, Stack } from '@chakra-ui/layout';
import { Avatar, Link } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

const TeamMember = ({ name, githubName, githubUrl, avatarUrl, children }) => {
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ ease: 'linear', duration: 0.3 }}>
      <Flex
        align="center"
        direction="column"
        justify="center"
        margin={5}
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
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        gap={10}
        w="90%"
        mx="auto">
        <GridItem colSpan={{ base: 1, md: 2 }}>
          <TeamMember
            name="Alexsandr Poliakov"
            avatarUrl="https://avatars.githubusercontent.com/u/27024108"
            githubUrl="https://github.com/alpoliakov"
            githubName="@alpoliakov">
            <Badge>Teamlead</Badge>
            <Badge colorScheme="green">Backend</Badge>
            <Badge colorScheme="red">Словарь</Badge>
            <Badge colorScheme="purple">Учебник</Badge>
          </TeamMember>
        </GridItem>
        <TeamMember
          name="Yaroslava Mashnenko"
          avatarUrl="https://avatars.githubusercontent.com/u/72609097"
          githubUrl="https://github.com/ya-mashnenko"
          githubName="@ya-mashnenko">
          <Badge colorScheme="blue">Саванна</Badge>
          <Badge colorScheme="green">Спринт</Badge>
          <Badge colorScheme="red">Аудиовызов</Badge>
          <Badge colorScheme="purple">Написание</Badge>
        </TeamMember>
        <TeamMember
          name="Sergey Klimov"
          avatarUrl="https://avatars.githubusercontent.com/u/8382622"
          githubUrl="https://github.com/w1r3d7"
          githubName="@w1r3d7">
          <Badge colorScheme="green">Главная</Badge>
          <Badge colorScheme="red">Статистика</Badge>
        </TeamMember>
      </Grid>
    </>
  );
};

export default AboutTeam;
