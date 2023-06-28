import React, { useState, useEffect } from 'react';
import classes from './CustomModal.module.css';
import CloseIcon from '@mui/icons-material/Close';
import { ToggleButtonGroup } from '@mui/material';
import CustomToggleButton from '../ui/CustomToggleButton';
import CustomButton from '../ui/CustomButton';
import CustomInput from '../ui/CustomInput';
import { useAuth } from '../../contexts/authContext';

const CustomModal = ({
  currentData,
  currentAction,
  active,
  changeState,
  addTask,
  updateTask,
}) => {
  const { id, progress } = currentData;
  const { user } = useAuth();

  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState();

  const userId = user?.id;

  useEffect(() => {
    setTask(currentData.task);
    setDescription(currentData.description);
    setPriority(currentData.priority);
  }, [currentData]);

  return (
    <div className={classes.modal} hidden={active}>
      <div className={classes.overlay}>
        <div className={classes['modal-content']}>
          <div className={classes['modal-heading']}>
            <span>{currentAction}</span>
            <CloseIcon
              className={classes['close-modal']}
              onClick={() => changeState()}
            />
          </div>
          <div className={classes['modal-input']}>
            <span>Task</span>
            <CustomInput
              type="text"
              placeholder="Type your task here..."
              value={task ?? ''}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className={classes['modal-input']}>
            <span>Description</span>
            <CustomInput
              type="text"
              placeholder="Detailed info about your task. Max length - 200 symbols"
              multiline
              rows={7}
              inputProps={{ maxLength: 200 }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={classes['modal-priority']}>
            <span>Priority</span>
            <ToggleButtonGroup
              value={priority}
              exclusive
              className={classes['modal-buttons']}
              onChange={(e) => setPriority(e.target.value)}
            >
              <CustomToggleButton value="High" selectedColor="#f73446">
                High
              </CustomToggleButton>
              <CustomToggleButton value="Medium" selectedColor="#ffbd21">
                Medium
              </CustomToggleButton>
              <CustomToggleButton value="Low" selectedColor="#0ac947">
                Low
              </CustomToggleButton>
            </ToggleButtonGroup>
          </div>
          <div className={classes['modal-add']}>
            <CustomButton
              mainColor="#713fff"
              disabled={!task}
              onClick={() => {
                currentAction === 'Add Task'
                  ? addTask({ task, description, priority, userId }, 'tasks')
                  : updateTask({ id, task, description, priority, progress });
                changeState();
              }}
            >
              {currentAction?.split(' ').shift()}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
