import React from 'react';
import classes from './TaskList.module.css';
import TaskCard from '../card/TaskCard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Tasklist = ({
  setCurrentData,
  cardsList,
  changeState,
  setDescriptionModal,
}) => {
  return (
    <div>
      <div className={classes.main}>
        <TransitionGroup>
          {cardsList?.map((item) => (
            <CSSTransition key={item.id} timeout={400} classNames="item">
              <TaskCard
                id={item.id}
                task={item.task}
                description={item.description}
                priority={item.priority}
                initialProgress={item.progress}
                changeState={changeState}
                setCurrentData={setCurrentData}
                setDescriptionModal={setDescriptionModal}
              />
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default Tasklist;
