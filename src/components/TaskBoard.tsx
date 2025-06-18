import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type InputType = {
  onCancel: () => void;
  show: boolean;
};

const tasks=[{description:"Go to gym", completed:false},{description:"Solve 18 problems", complated:false}];

function TaskBoard({ onCancel, show }: InputType) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="task-board"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="bg-red-400 h-screen w-screen absolute top-0 z-10 flex justify-center items-center"
        >
          <X onClick={onCancel} className="absolute top-4 left-4" />

          <div className="bg-amber-400 p-4 border h-104 md:w-92 rounded-lg">
            <div >
              <input className="w-full px-4 py-2"></input>
            </div>
            {tasks.map(item=>(
                <Item item={item}/>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({item}){
  return(
    <div className="bg-blue-800 py-2 my-2 grid grid-cols-12">
      <div className="col-span-2 flex justify-center items-center">
          <div className="h-4 w-4 rounded-full border"></div>
      </div>
      <div className="col-span-10 px-2">{item.description}</div>
      
    </div>
  )
}

export default TaskBoard;
