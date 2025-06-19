import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const initialTasks = [
  {
    id: "1",
    description: "Go to gym",
    isCompleted: false,
    startDate: new Date(),
  },
  {
    id: "2",
    description: "Solve 18 problems",
    isCompleted: false,
    startDate: new Date(),
  },
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
  }))
);
