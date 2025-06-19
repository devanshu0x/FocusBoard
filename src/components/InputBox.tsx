import { useState } from "react";

type Input={
    field: string;
    value:string;
    onChange: (val:string)=>void;
}

function InputBox({field, value, onChange}:Input) {
  return (
    <div>
        <div className="p-2 text-primary">{field}</div>
        <div>
            <input value={value} onChange={(e)=>onChange(e.target.value)} className="w-full px-4 py-2 bg-primary/20 border border-border text-text rounded-lg focus:outline-none focus:border-accent"></input>
        </div>
    </div>
  )
}

export default InputBox