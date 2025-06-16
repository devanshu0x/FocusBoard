import { format } from "date-fns";
import { useEffect, useState } from "react";


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

    const message="Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light."

  return (
    <div className="px-8 py-10 animate-slidedown">
        <div className="text-indigo-500 pb-2 text-center  text-3xl sm:text-4xl md:text-5xl">
            {format(date,"HH")}
            <span className="text-slate-500">:</span>
            {format(date,"mm")}
            <span className="text-slate-500">:</span>
            {format(date,"ss")}
        </div>
        <div className="text-center mx-auto text-xs md:text-sm md:max-w-[60%] lg:text-md pt-3 font-extralight text-slate-300 italic">"{message}"</div>
    </div>
  )
}

export default Clock