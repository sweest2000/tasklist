import { useState } from 'react';

export const useModal = () => {
  const [active, setActive] = useState(true);
  const [action, setAction] = useState();
  const changeState = (currentAction) => {
    setAction(currentAction);
    setActive(!active);
  };
  return [active, action, changeState];
};
