import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface LinkContent {
  id: string;
  name: string;
  web: string;
}

interface GroupContent {
  id: string;
  group: string;
  content: LinkContent[];
}

interface ConfigStore {
  imageUrl: string;
  quote: string;
  welcomeMessage: string;
  showImage: boolean;
  links: GroupContent[];
  changeLinkName: (groupId:string,linkId:string,name:string)=>void;
  changeLinkWeb: (groupId:string,linkId:string,web:string)=>void;
  addLink:(groupId:string, link:LinkContent)=>void;
  deleteLink: (groupId:string, linkId:string)=>void;
  deleteGroup: (id: string) => void;
  addGroup: (group: GroupContent) => void;
  changeImageUrl: (url: string) => void;
  changeQuote: (q: string) => void;
  changeWelcomeMessage: (m: string) => void;
  toggleImage: () => void;
}

const initialLinks = [
  {
    id: "1",
    group: "State management",
    content: [
      { id: "1", name: "Youtube", web: "https://www.youtube.com/" },
      { id: "2", name: "twitter", web: "https://x.com/home" },
      { id: "3", name: "Youtube", web: "https://www.youtube.com/" },
      { id: "4", name: "twitter", web: "https://x.com/home" },
      { id: "5", name: "Youtube", web: "https://www.youtube.com/" },
      { id: "6", name: "twitter", web: "https://x.com/home" },
    ],
  },
  {
    id: "2",
    group: "llms",
    content: [
      { id: "1", name: "chatGPT", web: "https://chatgpt.com/" },
      { id: "2", name: "Claude", web: "https://claude.ai/new" },
      { id: "3", name: "gemini", web: "https://gemini.google.com/app" },
    ],
  },
  {
    id: "3",
    group: "cp",
    content: [
      { id: "1", name: "codeforces", web: "https://codeforces.com/" },
      { id: "2", name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
  {
    id: "4",
    group: "cp2 test",
    content: [
      { id: "1", name: "codeforces", web: "https://codeforces.com/" },
      { id: "2", name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
];

export const useConfigStore = create<ConfigStore>()(
  immer((set) => ({
    imageUrl:
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRodDNjeWVtb3RzcHRhb241cDNmem0zdTdmZDlpMXpscGJtOTFwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EgVqMDhLzHEI0/giphy.gif",
    quote:
      "Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.",
    welcomeMessage: "Welcome Back Anon!",
    showImage: true,
    links: initialLinks,
    changeLinkName: (groupId,linkId,name)=>{
      set((state)=>{
        const group=state.links.find((e)=>e.id===groupId);
        if(group){
          const link= group.content.find((e)=>e.id===linkId);
          if(link){
            link.name=name;
          }
        }
      })
    },
    changeLinkWeb: (groupId,linkId,web)=>{
      set((state)=>{
        const group=state.links.find((e)=>e.id===groupId);
        if(group){
          const link= group.content.find((e)=>e.id===linkId);
          if(link){
            link.web=web;
          }
        }
      })
    },
    addLink:(groupId,link)=>{
      set((state)=>{
        const group=state.links.find((ele)=>ele.id===groupId);
        if(group){
          group.content.push(link);
        }
      })
    },
    deleteLink:(groupId,linkId)=>{
      set((state)=>{
         const group= state.links.find((ele)=>ele.id===groupId);
         if(group){
          group.content=group.content.filter((e)=>e.id!==linkId);
         }
      })
    },
    deleteGroup: (id) => {
      set((state) => {
        state.links=state.links.filter((e:GroupContent) => e.id !== id);
        
      });
    },
    addGroup: (group) => {
      set((state) => {
        state.links.push(group);
     
      });
    },
    changeImageUrl: (url) => {
      set((state)=>{
        state.imageUrl=url;
      });
    },
    changeQuote: (q) => {
      set((state)=>{
        state.quote=q;
      });
    },
    changeWelcomeMessage: (m) => {
      set((state)=>{
        state.welcomeMessage=m;
      });
    },
    toggleImage: () => {
      set((state) => {
        state.showImage=!state.showImage;
      });
    },
  }))
);
