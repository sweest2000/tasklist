import React, { useEffect, useState } from 'react';
import classes from './TaskCard.module.css';
import { CircularProgress } from '@mui/material';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import deleteTask from '../../utils/deleteTask';
import updateTask from '../../utils/updateTask';

const TaskCard = ({
  id,
  task,
  description,
  priority,
  initialProgress,
  changeState,
  setCurrentData,
  setDescriptionModal,
}) => {
  const [progress, setProgress] = useState(initialProgress);

  useEffect(() => {
    updateTask({ id, progress });
  }, [id, progress]);

  return (
    <div className={classes.card}>
      <div className={classes.part + ' ' + classes.task}>
        <span className={classes.task_title}>Task</span>
        <span
          className={classes.task_name}
          onClick={() => {
            setCurrentData({ id, task, description, priority, progress });
            setDescriptionModal(true);
          }}
        >
          {task}
        </span>
      </div>
      <div className={classes.part}>
        <span className={classes.task_title}>Priority</span>
        <span
          style={{
            color: `${
              priority === 'High'
                ? '#f73446'
                : priority === 'Medium'
                ? '#ffbd21'
                : '#0ac947'
            }`,
          }}
        >
          {priority}
        </span>
      </div>
      <div className={classes.part}>
        <button
          className={classes.todo_button}
          onClick={() => setProgress(progress + 50)}
        >
          {`${
            progress === 50
              ? 'In progress'
              : progress === 100
              ? 'Done'
              : 'To Do'
          }`}
        </button>
      </div>
      <div className={classes.part + ' ' + classes.circles}>
        <CircularProgress
          variant="determinate"
          size={33}
          value={100}
          sx={{ color: '#e5e6e9' }}
          className={classes.circle}
        ></CircularProgress>
        <CircularProgress
          variant="determinate"
          size={33}
          value={progress <= 100 ? progress : setProgress(0)}
          className={classes.circle}
        ></CircularProgress>
      </div>
      <div className={classes.button_box}>
        <button className={classes.button}>
          <EditNoteOutlinedIcon
            sx={{ fontSize: 30 }}
            onClick={() => {
              setCurrentData({ id, task, description, priority, progress });
              changeState('Edit Task');
            }}
          />
        </button>
        <button className={classes.button} onClick={() => deleteTask(id)}>
          <DeleteOutlinedIcon sx={{ fontSize: 30 }} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
