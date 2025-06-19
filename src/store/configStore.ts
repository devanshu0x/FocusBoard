
import { create } from "zustand";

interface LinkContent{
  id:string;
  name:string;
  web:string;
}

interface GroupContent{
    id:string;
    group:string;
    content:LinkContent[];
  }

interface ConfigStore{
  imageUrl:string;
  quote:string;
  welcomeMessage:string;
  showImage:boolean;
  links:GroupContent[];
  groupsCount:number;
  deleteGroup: (id:string)=>void;
  addGroup: (group:GroupContent)=>void;
  changeImageUrl: (url:string)=>void;
  changeQuote: (q:string)=>void;
  changeWelcomeMessage: (m:string)=>void;
  toggleImage: ()=>void;
}

const initialLinks = [
  {
    id:"1",
    group: "State management",
    content: [
      {id:"1", name: "Youtube", web: "https://www.youtube.com/" },
      {id:"2", name: "twitter", web: "https://x.com/home" },
      {id:"3", name: "Youtube", web: "https://www.youtube.com/" },
      {id:"4", name: "twitter", web: "https://x.com/home" },
      {id:"5", name: "Youtube", web: "https://www.youtube.com/" },
      {id:"6", name: "twitter", web: "https://x.com/home" },
      {id:"7", name: "Youtube", web: "https://www.youtube.com/" },
    ],
  },
  {
    id:"2",
    group: "llms",
    content: [
      {id:"1", name: "chatGPT", web: "https://chatgpt.com/" },
      {id:"2", name: "Claude", web: "https://claude.ai/new" },
      {id:"3", name: "gemini", web: "https://gemini.google.com/app" },
    ],
  },
  {
    id:"3",
    group: "cp",
    content: [
      {id:"1", name: "codeforces", web: "https://codeforces.com/" },
      {id:"2", name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
  {
    id:"4",
    group: "cp2 test",
    content: [
      {id:"1", name: "codeforces", web: "https://codeforces.com/" },
      {id:"2", name: "atcoder", web: "https://atcoder.jp/" },
    ],
  },
];

export const useConfigStore= create<ConfigStore>()((set)=>(
  {
    imageUrl:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRodDNjeWVtb3RzcHRhb241cDNmem0zdTdmZDlpMXpscGJtOTFwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EgVqMDhLzHEI0/giphy.gif",
    quote:"Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.",
    welcomeMessage:"Welcome Back Anon!",
    showImage:true,
    links: initialLinks,
    groupsCount:initialLinks.length,
    deleteGroup: (id)=>{
      set((state)=>({links:state.links.filter((e)=>e.id!==id),groupsCount:state.groupsCount-1}));
    },
    addGroup:(group)=>{
      set((state)=>({links:[...state.links,group],groupsCount:state.groupsCount+1}));
    },
    changeImageUrl: (url)=>{
      set({imageUrl:url});
    },
    changeQuote: (q)=>{
      set({quote:q});
    },
    changeWelcomeMessage:(m)=>{
      set({welcomeMessage:m});
    },
    toggleImage:()=>{
      set((state)=>({showImage:!state.showImage}))
    }
  }
))
