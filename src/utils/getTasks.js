import db from '../data/handler';

const getTasks = async (setCardsList, userId) => {
  const { data: tasks } = await db
    .from('tasks')
    .select()
    .eq('userId', userId)
    .order('id', { ascending: false });
  setCardsList(tasks);
};

export default getTasks;
