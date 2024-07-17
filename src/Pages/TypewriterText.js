import React from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text }) => {

  return (
    <p className="tracking-tight mt-[10px] text-4xl md:text-6xl font-semibold leading-[55px] text-white md:whitespace-nowrap mb-10">
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {text.split('').map((char, index) => (
          <React.Fragment key={index}>
            <motion.span
              style={{ display: 'inline-block' }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </React.Fragment>
        ))}

      </motion.span>
    </p>
  );
};

export default TypewriterText;
