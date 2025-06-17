import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type InputType = {
  onCancel: () => void;
  show: boolean;
};

function TaskBoard({ onCancel, show }: InputType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="task-board"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="bg-red-400 h-screen w-screen absolute top-0 z-10"
        >
          <X onClick={onCancel} className="absolute top-4 left-4" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskBoard;
