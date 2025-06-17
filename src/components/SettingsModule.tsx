import { useState } from "react"
import InputBox from "./InputBox"
import { ArrowRight, Check} from "lucide-react";
import { useConfigStore } from "../store/configStore";
import Group from "./Group";


const links = [
  {
    group: "Social Media",
    content: [
      { name: "Youtube", web: "https://www.youtube.com/" },
      { name: "twitter", web: "https://x.com/home" },
      { name: "Youtube", web: "https://www.youtube.com/" },
      { name: "twitter", web: "https://x.com/home" },
      { name: "Youtube", web: "https://www.youtube.com/" },
      { name: "twitter", web: "https://x.com/home" },
      { name: "Youtube", web: "https://www.youtube.com/" },
    ],
  },
  {
    group: "llms",
    content: [
      { name: "chatGPT", web: "https://chatgpt.com/" },
      { name: "Claude", web: "https://claude.ai/new" },
      { name: "gemini", web: "https://gemini.google.com/app" },
    ],
  },
  {
    group: "cp",
    content: [
      { name: "codeforces", web: "https://codeforces.com/" },
      { name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
  {
    group: "cp2 test",
    content: [
      { name: "codeforces", web: "https://codeforces.com/" },
      { name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
];

function SettingsModule(){
  const [groupFull, setGroupFull]=useState(false);
  const showImage=useConfigStore((state)=>state.showImage);
  return (
    <div className=" m-6 mt-18 rounded-lg">
      <div className="text-[#F8F8F2] text-xl sm:text-2xl md:text-3xl mb-4 text-center">Configure Startpage</div>
      <div className="border border-b-3 border-r-3 border-[#50fa7b] rounded-lg shadow-3xl px-8 py-4 max-h-116 md:max-w-3xl mx-auto overflow-y-auto text-xs sm:text-sm ">
      <InputBox field="Image Url" value={useConfigStore((state)=>state.imageUrl)} onChange={useConfigStore(store=>store.changeImageUrl)} />
      <label  className="flex gap-2 my-2 text-sm items-center">
        <div onClick={useConfigStore((state)=>state.toggleImage)} className="h-4 w-4 border rounded-sm flex items-center justify-center">{showImage && <Check className="text-[#f1fa8c] font-bold"/>}</div>
        <div className="text-[#f1fa8c]">Show Image</div>
      </label>
      <InputBox field="Quote" value={useConfigStore((state)=>state.quote)} onChange={useConfigStore((state)=>state.changeQuote)} />
      <InputBox field="Welcome message" value={useConfigStore((state)=>state.welcomeMessage)} onChange={useConfigStore((state)=>state.changeWelcomeMessage)} />
      {/* Add Group*/}
      <div className="flex my-4 border-b group focus-within:border-[#8be9fd] border-[#50fa7b]">
          <input disabled={groupFull}  placeholder="Add Group..." type="text" className="px-4 py-2 text-[#8be9fd] bg-black/50 w-full focus:outline-0"></input>
          <div className="w-12 bg-[#50fa7b] group-focus-within:bg-[#8be9fd] flex justify-center items-center">
            <ArrowRight/>
          </div>
      </div>
      {/* Groups */}
      {links.map((group)=>(
        <div className="my-2">
          <Group group={group} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default SettingsModule