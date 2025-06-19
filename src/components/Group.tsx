import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { useConfigStore } from "../store/configStore";

/*
{
    id:1,
    group: "cp2 test",
    content: [
      { name: "codeforces", web: "https://codeforces.com/" },
      { name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
*/
interface Shortcut {
  id:string;
  name: string;
  web: string;
}

interface Group {
  id: string;
  group: string;
  content: Shortcut[];
}
interface GroupInput {
  group: Group;
}
function Group({ group }: GroupInput) {
  const deleteGroup= useConfigStore((state)=>state.deleteGroup);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  return (
    <div  className="">
      <div onClick={() => setDropdownOpen((s) => !s)} className="flex justify-between bg-primary/30 px-4 py-2 rounded-lg">
        {group.group} 
        <div className="flex gap-2 items-center]">
          {dropdownOpen ? <ChevronUp className="h-4 md:h-5" /> : <ChevronDown className="h-4 md:h-5" />}
          <Trash2 onClick={()=>deleteGroup(group.id)} className="h-4 md:h-5 text-red-500 hover:text-red-700 transition-colors duration-300"/>
        </div>
      </div>
      {dropdownOpen && group.content.map((item,index) => <Item key={index} item={item} />)}
    </div>
  );
}

function Item({ item }: { item: Shortcut }) {
  return (
    <div className="my-2 bg-secondary/30 border boder-border rounded-lg px-4 py-2 gap-1 grid md:grid-cols-2">
      <input type="text" className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text border-primary" value={item.name}  />
      <input type="text" className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text border-primary" value={item.web}  />
    
    </div>
  );
}

export default Group;
