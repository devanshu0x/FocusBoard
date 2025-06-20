import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { useState } from "react";
import { useConfigStore } from "../store/configStore";
import { nanoid } from "nanoid";

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
  id: string;
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
  const deleteGroup = useConfigStore((state) => state.deleteGroup);
  const addLink = useConfigStore((state) => state.addLink);
  const groupSize = group.content.length;
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [newWebName, setNewWebName] = useState("");
  const [newWebUrl, setNewWebUrl] = useState("");
  return (
    <div className="">
      <div
        onClick={() => setDropdownOpen((s) => !s)}
        className="flex text-text justify-between bg-primary/30 px-4 py-2 rounded-lg"
      >
        {group.group}
        <div className="flex gap-2 items-center]">
          {dropdownOpen ? (
            <ChevronUp className="h-4 md:h-5" />
          ) : (
            <ChevronDown className="h-4 md:h-5" />
          )}
          <Trash2
            onClick={() => deleteGroup(group.id)}
            className="h-4 md:h-5 text-red-500 hover:text-red-700 transition-colors duration-300"
          />
        </div>
      </div>
      {dropdownOpen &&
        group.content.map((item) => (
          <Item key={item.id} groupId={group.id} item={item} />
        ))}
      {dropdownOpen && (
        <div className="my-2 bg-secondary/50 border border-text-secondary/80 rounded-lg px-4 py-2 ">
          <div className="text-text text-center mb-2">Add</div>
          <div className="gap-1 grid md:grid-cols-2">
            <input
              type="text"
              disabled={groupSize >= 6}
              placeholder={groupSize >= 6 ? "Max 6 allowed" : "name"}
              className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text border-text/80"
              value={newWebName}
              onChange={(e) => setNewWebName(e.target.value)}
            />
            <input
              type="text"
              disabled={groupSize >= 6}
              placeholder={groupSize >= 6 ? "Max 6 allowed" : "url"}
              className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text border-text/80"
              value={newWebUrl}
              onChange={(e) => setNewWebUrl(e.target.value)}
            />
          </div>
          <div className="py-2 flex justify-center items-center">
            <button
              onClick={() => {
                if (newWebName != "" && newWebUrl != "") {
                  if (
                    newWebUrl.startsWith("https://") ||
                    newWebUrl.startsWith("http://")
                  ) {
                    addLink(group.id, {
                      id: nanoid(),
                      name: newWebName,
                      web: newWebUrl,
                    });
                    setNewWebName("");
                    setNewWebUrl("");
                  } else {
                    alert("Enter full url starting with http or https");
                  }
                }
              }}
              className="px-6 py-2 text-text bg-primary border border-border rounded-xl"
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Item({ item, groupId }: { item: Shortcut; groupId: string }) {
  const changeLinkName= useConfigStore((state)=>state.changeLinkName);
  const changeLinkWeb= useConfigStore((state)=>state.changeLinkWeb);
  const deleteLink = useConfigStore((state) => state.deleteLink);
  return (
    <div className="grid grid-cols-12 my-2 bg-primary/50 border boder-border rounded-lg px-2 py-2">
      <div className="col-span-11  gap-1 grid md:grid-cols-2">
        <input
          type="text"
          className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text-secondary border-text/80"
          value={item.name}
          onChange={(e)=>changeLinkName(groupId,item.id,e.target.value)}
        />
        <input
          type="text"
          className="mx-4 px-2 py-1 border rounded-sm focus:outline-none text-text-secondary border-text/80"
          value={item.web}
          onChange={(e)=>{
            const value=e.target.value;
            if(value.startsWith("https://")|| value.startsWith("http://")){
              changeLinkWeb(groupId,item.id,value);
            }
          }}
        />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <Trash2
          onClick={() => deleteLink(groupId, item.id)}
          className="h-4 md:h-5 text-red-500 hover:text-red-700 transition-colors duration-300"
        />
      </div>
    </div>
  );
}

export default Group;
