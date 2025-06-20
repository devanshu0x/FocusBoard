import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialTasks: Task[] = [
  {
    id: "1",
    description: "drink water",
    isCompleted: false,
    startDate: new Date(),
  },
  {
    id: "2",
    description: "get a new startpage",
    isCompleted: true,
    startDate: new Date(),
  },
  {
    id:"3",
    description:"touch grass",
    isCompleted:false,
    startDate: new Date("2020-01-01")
  },
  {
    id:"4",
    description:"get a job",
    isCompleted:false,
    startDate: new Date("2020-01-01")
  }
];

function isSameDay(date1: Date) {
  const date2 = new Date();
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

interface Task {
  id: string;
  description: string;
  isCompleted: boolean;
  startDate: Date;
}

interface TaskStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (taskId: string) => void;
  toggleTask: (taskId: string) => void;
  refreshTask: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    immer((set) => ({
      tasks: initialTasks,
      addTask: (task) => {
        set((state) => {
          state.tasks.push(task);
        });
      },
      deleteTask: (taskId) => {
        set((state) => {
          state.tasks = state.tasks.filter((e) => e.id !== taskId);
        });
      },
      toggleTask: (taskId) => {
        set((state) => {
          const task = state.tasks.find((e) => e.id === taskId);
          if (task) {
            task.isCompleted = !task.isCompleted;
          }
        });
      },
      refreshTask: () => {
        set((state) => {
          state.tasks = state.tasks.filter(
            (e) => isSameDay(e.startDate) || !e.isCompleted
          );
        });
      },
    })),
    {
      name: "task-storage",
      merge: (persistedState, currentState) => {
        if (!persistedState) return currentState;

        const typed = persistedState as TaskStore;

        return {
          ...currentState,
          ...typed,
          tasks: typed.tasks.map((task) => ({
            ...task,
            startDate: new Date(task.startDate),
          })),
        };
      },
    }
  )
);
