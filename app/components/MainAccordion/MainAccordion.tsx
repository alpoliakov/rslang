import { Flex } from '@chakra-ui/layout';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { GiClick } from 'react-icons/gi';

const accordionTitleStyle = {
  borderRadius: '10px',
  color: 'white',
  cursor: 'pointer',
  height: '40px',
  marginBottom: '20px',
};

const ClickHint = () => (
  <Flex justify="flex-end" align="center">
    <GiClick fontSize={30} />
  </Flex>
);

const Accordion = ({ i, expanded, setExpanded, content }) => {
  const isOpen = i === expanded;

  return (
    <>
      <motion.div
        style={accordionTitleStyle}
        animate={{ backgroundColor: isOpen ? '#FF0088' : '#0055FF' }}
        onClick={() => setExpanded(isOpen ? false : i)}>
        {!isOpen && ClickHint()}
      </motion.div>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            style={{ overflow: 'hidden' }}
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}>
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const MainAccordion = ({ children }) => {
  const [expanded, setExpanded] = useState<false | number>(0);

  return React.Children.map(children, (item, i) => (
    <Accordion key={i} i={i} expanded={expanded} setExpanded={setExpanded} content={item} />
  ));
};

export default MainAccordion;
