import { ArrowRight, Check, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTaskStore } from "../store/taskStore";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

type InputType = {
  onCancel: () => void;
  show: boolean;
};



function TaskBoard({ onCancel, show }: InputType) {
  const refreshTask=useTaskStore((state)=>state.refreshTask);
  const tasks=useTaskStore((state)=>state.tasks);
  const [description,setDescription]=useState("");
  const addTask= useTaskStore((state)=>state.addTask);

  useEffect(()=>{
    refreshTask();
  },[])
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
          <X onClick={onCancel} className="text-accent hover:text-primary transition-colors duration-300 absolute top-4 left-4" />

          <div className="bg-secondary/50 p-4 border shadow-lg shadow-primary min-h-104 max-h-[80vh] md:w-92 rounded-lg overflow-y-scroll">
            <div className="flex group">
              <input onKeyDown={
                (e)=>{
                  if(e.key==="Enter" && description!==""){
                    addTask({
                      id:nanoid(),
                      description:description,
                      isCompleted:false,
                      startDate:new Date()
                    })
                  }
                }
              }
              value={description}
              onChange={(e)=>setDescription(e.target.value)}
              className="text-text w-full px-4 py-2 bg-secondary rounded-l-sm focus:outline-none focus:border-b-2 border-border"></input>
              <div className="bg-accent w-12 rounded-r-sm group-focus-within:border-b-2 border-border flex justify-center items-center ">
                <ArrowRight/>
              </div>
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


function isSameDay(date1:Date) {
  const date2= new Date();
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

function Item({item}:{item:Task}){
  const toggleComplete=useTaskStore((state)=>state.toggleTask);
  const delayedTask= !isSameDay(item.startDate);
  return(
    <div className="rounded-sm bg-primary py-2 my-2 grid grid-cols-12 text-text">
      <div className="col-span-2 flex justify-center items-center">
          <div onClick={()=>toggleComplete(item.id)} className="h-5 w-5 rounded-sm border flex justify-center items-center">
            {item.isCompleted &&
            <Check/>
            }
          </div>
      </div>
      <div className="col-span-10 px-2">{item.description}</div>
      
    </div>
  )
}

export default TaskBoard;
