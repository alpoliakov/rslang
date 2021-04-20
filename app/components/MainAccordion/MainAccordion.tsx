import { Heading, useColorModeValue } from '@chakra-ui/react';
import { ACCORDION_TITLES } from 'constants/index';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

import { ACTIVE_BUTTON_COLOR, PASSIVE_BUTTON_COLOR } from '../../constants';

const accordionTitleStyle = {
  borderRadius: '10px',
  padding: '10px',
  cursor: 'pointer',
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Accordion = ({ i, expanded, setExpanded, content }) => {
  const isOpen = i === expanded;
  const menuItemColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);
  const menuItemHoverColor = useColorModeValue(
    PASSIVE_BUTTON_COLOR.LIGHT,
    PASSIVE_BUTTON_COLOR.DARK,
  );

  return (
    <>
      <motion.div
        style={accordionTitleStyle}
        animate={{ backgroundColor: isOpen ? menuItemColor : menuItemHoverColor }}
        onClick={() => setExpanded(isOpen ? false : i)}>
        <Heading as="h2" textAlign="center" fontSize={[12, 15, 20]}>
          {ACCORDION_TITLES[i]}
        </Heading>
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
