import React from 'react';
import classes from './TaskList.module.css';
import TaskCard from '../card/TaskCard';
import { LayoutGroup, motion } from 'framer-motion';

const Tasklist = ({
  setCurrentData,
  cardsList,
  changeState,
  setDescriptionModal,
}) => {
  return (
    <div>
      <div className={classes.main}>
        <LayoutGroup layoutRoot>
          <motion.div layout transition={{ duration: 0.5, ease: 'backOut' }}>
            {cardsList?.map((item) => (
              <TaskCard
                key={item.id}
                id={item.id}
                task={item.task}
                description={item.description}
                priority={item.priority}
                initialProgress={item.progress}
                changeState={changeState}
                setCurrentData={setCurrentData}
                setDescriptionModal={setDescriptionModal}
              />
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
};

export default Tasklist;
