import db from '../data/handler';

const deleteTask = async (taskId) => {
  await db.from('tasks').delete().eq('id', taskId);
};

export default deleteTask;
