import { create } from "zustand";

interface ConfigStore{
  imageUrl:string;
  quote:string;
  welcomeMessage:string;
  showImage:boolean;
  changeImageUrl: (url:string)=>void;
  changeQuote: (q:string)=>void;
  changeWelcomeMessage: (m:string)=>void;
  toggleImage: ()=>void;
}

export const useConfigStore= create<ConfigStore>()((set)=>(
  {
    imageUrl:"https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnRodDNjeWVtb3RzcHRhb241cDNmem0zdTdmZDlpMXpscGJtOTFwdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/EgVqMDhLzHEI0/giphy.gif",
    quote:"Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light.",
    welcomeMessage:"Welcome Back Anon!",
    showImage:true,
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
