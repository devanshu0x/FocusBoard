import { useState } from "react";

type Input={
    field: string;
    value:string;
    onChange: (val:string)=>void;
}

function InputBox({field, value, onChange}:Input) {
  return (
    <div>
        <div className="p-2 text-[#f1fa8c]">{field}</div>
        <div>
            <input value={value} onChange={(e)=>onChange(e.target.value)} className="w-full px-4 py-2 bg-black/50 border border-[#50fa7b] text-[#8be9fd] rounded-lg focus:outline-none focus:border-[#8be9fd]"></input>
        </div>
    </div>
  )
}

export default InputBox