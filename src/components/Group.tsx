import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

/*
{
    group: "cp2 test",
    content: [
      { name: "codeforces", web: "https://codeforces.com/" },
      { name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
*/
interface Shortcut{
    name:string;
    web:string;
}

interface Group{
    group:string;
    content: Shortcut[];
}
interface GroupInput{
    group:Group;
}
function Group({group}:GroupInput) {
    const [dropdownOpen, setDropdownOpen]=useState<boolean>(false);
  return (
    <div onClick={()=>setDropdownOpen((s)=>!s)} className="">
        <div className="flex justify-between bg-red-400 px-4 py-2 rounded-lg">{group.group} {dropdownOpen? <ChevronUp/>: <ChevronDown/>}</div>
        { dropdownOpen &&
            group.content.map((item)=>(
                <Item item={item} />
            ))
        }
    </div>
  )
}

function Item({item}:{item:Shortcut}){
    return (
        <div className="my-2 bg-yellow-400 px-4 py-2 grid md:grid-cols-2">
            <div className="bg-red-700 p-1">{item.name}</div>
            <div className="bg-sky-700 p-1">{item.web}</div>
        </div>
    )
}

export default Group