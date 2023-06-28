import React from 'react';
import classes from './ModalDescription.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const ModalDescription = ({
  descriptionModal,
  setDescriptionModal,
  currentData,
}) => {
  return (
    <AnimatePresence>
      {descriptionModal && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.1,
          }}
          animate={{
            opacity: 1,
            scale: 1.2,
            transition: {
              ease: [0.075, 0.8, 0.165, 1],
              duration: 0.4,
            },
            backgroundColor: [
              'rgba(0,0,0,0)',
              'rgba(0,0,0,0.1)',
              'rgba(0,0,0,0.3)',
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.6)',
              'rgba(49, 49, 49, 0.7)',
            ],
          }}
          exit={{
            opacity: 0,
            scale: 0.1,
            transition: {
              ease: 'easeIn',
              duration: 0.2,
            },
            backgroundColor: ['rgba(0,0,0,0.1)'],
          }}
          className={classes['modal']}
        >
          <div
            className={classes['overlay']}
            onClick={() => {
              setDescriptionModal(false);
            }}
          >
            <div
              className={classes['description-wrapper']}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p style={{ whiteSpace: 'pre-wrap' }}>
                {currentData.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalDescription;
