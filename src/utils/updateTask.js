import db from '../data/handler';

const updateTask = async (data) => {
  await db
    .from('tasks')
    .update({
      task: data.task,
      description: data.description,
      priority: data.priority,
      progress: data.progress,
    })
    .eq('id', data.id);
};

export default updateTask;
