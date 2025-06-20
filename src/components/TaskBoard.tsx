import { ArrowRight, Check, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTaskStore } from "../store/taskStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

type InputType = {
  onCancel: () => void;
  show: boolean;
};

function TaskBoard({ onCancel, show }: InputType) {
  const refreshTask = useTaskStore((state) => state.refreshTask);
  const tasks = useTaskStore((state) => state.tasks);
  const [description, setDescription] = useState("");
  const addTask = useTaskStore((state) => state.addTask);

  useEffect(() => {
    refreshTask();
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="task-board"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="bg-background/20 backdrop-blur-3xl h-screen w-screen absolute top-0 z-10 flex justify-center items-center"
        >
          <X
            onClick={onCancel}
            className="cursor-pointer text-accent hover:text-primary transition-colors duration-300 absolute top-4 left-4"
          />

          <div className="bg-secondary/50 p-4 border  shadow-primary min-h-104 max-h-[80vh] w-74 sm:w-92 rounded-lg overflow-y-scroll">
            <div className="flex group">
              <input
                onKeyDown={(e) => {
                  if (e.key === "Enter" && description !== "") {
                    addTask({
                      id: nanoid(),
                      description: description,
                      isCompleted: false,
                      startDate: new Date(),
                    });
                    setDescription("");
                  }
                }}
                value={description}
                placeholder="Add Task..."
                onChange={(e) => setDescription(e.target.value)}
                className="text-text w-full px-4 py-2 bg-secondary rounded-l-sm focus:outline-none focus:border-b-2 border-accent"
              ></input>
              <div
                onClick={() => {
                  if (description != "") {
                    addTask({
                      id: nanoid(),
                      description: description,
                      isCompleted: false,
                      startDate: new Date(),
                    });
                    setDescription("");
                  }
                }}
                className="cursor-pointer bg-accent w-12 rounded-r-sm group-focus-within:border-b-2 border-accent flex justify-center items-center "
              >
                <ArrowRight />
              </div>
            </div>
            {tasks.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
          <div className="text-xs text-text-secondary absolute bottom-5 text-center ">
            <div>
              Note: Completed Tasks will be automatically removed on the next
              day(00:00 Hrs)
            </div>
            <div>
              Note: Incompleted Tasks will persist and will be marked red
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

function Item({ item }: { item: Task }) {
  const toggleComplete = useTaskStore((state) => state.toggleTask);
  const deleteTask = useTaskStore((store) => store.deleteTask);
  const delayedTask = !isSameDay(item.startDate);
  return (
    <div
      className={`rounded-sm  py-2 my-2 grid grid-cols-12 text-text animate-popout ${
        item.isCompleted
          ? "bg-green-400"
          : delayedTask
          ? "bg-red-400"
          : "bg-primary"
      }`}
    >
      <div className="col-span-2 flex justify-center items-center">
        <div
          onClick={() => toggleComplete(item.id)}
          className="h-5 w-5 rounded-sm border flex justify-center items-center"
        >
          {item.isCompleted && <Check />}
        </div>
      </div>
      <div className="col-span-10 px-2 gap-1 grid grid-cols-9 ">
        <div
          className={`col-span-8 break-words whitespace-normal ${
            item.isCompleted ? "line-through" : ""
          }`}
        >
          {item.description}
        </div>
        <div className="col-span-1 flex justify-between items-center">
          <Trash2
            onClick={() => deleteTask(item.id)}
            className="h-4 md:h-5 text-red-600 hover:text-red-800 transition-colors duration-300 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}

export default TaskBoard;
