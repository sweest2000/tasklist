import db from '../data/handler';

const addTask = async (data, dbName) => {
  await db.from(dbName).insert([
    {
      id: Date.now(),
      task: data.task,
      description: data.description,
      priority: data.priority,
      progress: 0,
      userId: data.userId,
    },
  ]);
};

export default addTask;
