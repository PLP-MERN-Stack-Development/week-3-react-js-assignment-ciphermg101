import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '@components/Button';

const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

const TaskManager = () => {
  const { t } = useTranslation();
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  return (
    <section
      className="bg-background text-foreground p-6 rounded-lg shadow-md transition-colors min-h-screen"
      aria-labelledby="taskManagerTitle"
    >
      <h2 id="taskManagerTitle" className="text-3xl font-bold mb-6">
        {t('taskManager.title')}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mb-6"
        role="form"
        aria-label={t('taskManager.input.label')}
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder={t('taskManager.input.placeholder')}
            aria-label={t('taskManager.input.label')}
            className="input"
          />
          <Button type="submit" variant="primary">
            {t('taskManager.input.addButton')}
          </Button>
        </div>
      </form>

      <div className="flex gap-2 mb-4">
        {['all', 'active', 'completed'].map((key) => (
          <Button
            key={key}
            variant={filter === key ? 'primary' : 'secondary'}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
          >
            {t(`taskManager.filters.${key}`)}
          </Button>
        ))}
      </div>

      <div className="space-y-2">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            {t(`taskManager.emptyState.${filter}`, {
              defaultValue:
                filter === 'all'
                  ? t('taskManager.emptyState.all')
                  : t('taskManager.emptyState.active'),
            })}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center p-4 rounded-lg border transition-colors ${
                task.completed
                  ? 'bg-muted border-border text-muted-foreground line-through'
                  : 'bg-card border-border text-foreground'
              }`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="h-5 w-5 text-primary rounded focus:ring-primary/50 focus:ring-offset-2"
                aria-label={
                  task.completed
                    ? t('taskManager.taskItem.incomplete')
                    : t('taskManager.taskItem.complete')
                }
              />
              <span className="ml-3 flex-1">{task.text}</span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteTask(task.id)}
                className="ml-2"
              >
                {t('taskManager.taskItem.delete')}
              </Button>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 text-sm text-muted-foreground">
        <p>
          {t(
            tasks.filter((task) => !task.completed).length === 1
              ? 'taskManager.status.taskRemaining'
              : 'taskManager.status.tasksRemaining',
            { count: tasks.filter((task) => !task.completed).length }
          )}
        </p>
      </div>
    </section>
  );
};

export default TaskManager;
