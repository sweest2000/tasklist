import React, { useState, useEffect } from 'react';
import Tasklist from '../components/list/TaskList';
import CustomButton from '../components/ui/CustomButton';
import CustomModal from '../components/modal/CustomModal';
import ModalDescription from '../components/modal/ModalDescription';
import AddIcon from '@mui/icons-material/Add';
import addTask from '../utils/addTask';
import getTasks from '../utils/getTasks';
import updateTask from '../utils/updateTask';
import { NavLink, Navigate } from 'react-router-dom';
import { useModal } from '../hooks/useModal';
import { useAuth } from '../contexts/authContext';
import db from '../data/handler';

const Tasks = () => {
  const [currentData, setCurrentData] = useState({});
  const [cardsList, setCardsList] = useState([]);
  const [active, action, changeState] = useModal();
  const [descriptionModal, setDescriptionModal] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    db.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'tasks' },
        () => {
          getTasks(setCardsList, user?.id);
        }
      )
      .subscribe();
  }, [user?.id]);

  useEffect(() => {
    getTasks(setCardsList, user?.id);
  }, [user?.id]);

  return !user ? (
    <Navigate to="/" replace />
  ) : (
    <div className="flex flex-col items-center">
      <div
        onClick={logout}
        className="flex self-end bg-white rounded-2xl m-5 pl-4 pr-4 pt-2 pb-2 w-18 h-15"
      >
        <NavLink to="/">Log out</NavLink>
      </div>
      <div className="flex flex-col w-7/12">
        <div className="flex justify-between h-11">
          <div className="text-5xl">
            <span>Task List</span>
          </div>
          <CustomButton
            mainColor="#713fff"
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setCurrentData({ task: '', description: '', priority: 'Low' });
              changeState('Add Task');
            }}
          >
            Add Task
          </CustomButton>
          <CustomModal
            currentAction={action}
            currentData={currentData}
            active={active}
            changeState={changeState}
            addTask={addTask}
            updateTask={updateTask}
          ></CustomModal>
          <ModalDescription
            descriptionModal={descriptionModal}
            setDescriptionModal={setDescriptionModal}
            currentData={currentData}
          ></ModalDescription>
        </div>
        <Tasklist
          setCurrentData={setCurrentData}
          cardsList={cardsList}
          changeState={changeState}
          setDescriptionModal={setDescriptionModal}
        />
      </div>
    </div>
  );
};

export default Tasks;
