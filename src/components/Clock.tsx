import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useConfigStore } from "../store/configStore";


function Clock() {
    const [date, setDate]=useState(new Date());
    useEffect(()=>{
        const id=setInterval(()=>{
            setDate(new Date());
        },1000);

        return ()=>{
            clearInterval(id);
        }
    },[])

    const quote=useConfigStore((state)=>state.quote);

  return (
    <div className="px-8 py-10 animate-slidedown">
        <div className="text-accent pb-2 text-center  text-3xl sm:text-4xl md:text-5xl">
            {format(date,"HH")}
            <span className="text-secondary">:</span>
            {format(date,"mm")}
            <span className="text-secondary">:</span>
            {format(date,"ss")}
        </div>
        {
            quote!==""&&
            <div className="text-center mx-auto text-xs md:text-sm md:max-w-[60%] lg:text-md pt-3 font-extralight text-text italic">"{quote}"</div>
        }
    </div>
  )
}

export default Clock