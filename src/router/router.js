import { createBrowserRouter } from 'react-router-dom';
import Register from '../pages/Register';
import Tasks from '../pages/Tasks';
import { routes } from './routerConfig';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: routes.main,
    element: <Login />,
  },
  {
    path: routes.tasks,
    element: <Tasks />,
  },
  {
    path: routes.register,
    element: <Register />,
  },
]);
