import { create } from "zustand";
import { persist } from "zustand/middleware";
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
  lightTheme: boolean;
  links: GroupContent[];
  toggleTheme: () => void;
  changeLinkName: (groupId: string, linkId: string, name: string) => void;
  changeLinkWeb: (groupId: string, linkId: string, web: string) => void;
  addLink: (groupId: string, link: LinkContent) => void;
  deleteLink: (groupId: string, linkId: string) => void;
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
    group: "social media",
    content: [
      { id: "1", name: "x", web: "https://x.com/home" },
      { id: "2", name: "reddit", web: "https://www.reddit.com/" },
      { id: "3", name: "youtube", web: "https://www.youtube.com/" },
      { id: "4", name: "whatsapp", web: "https://web.whatsapp.com/" },
    ],
  },
  {
    id: "2",
    group: "dev tools",
    content: [
      { id: "1", name: "github", web: "https://github.com/" },
      { id: "2", name: "react", web: "https://react.dev/" },
      { id: "3", name: "tailwind", web: "https://tailwindcss.com/" },
      { id: "4", name: "figma", web: "https://www.figma.com/" },
    ],
  },
  {
    id: "3",
    group: "cp",
    content: [
      { id: "1", name: "codeforces", web: "https://codeforces.com/" },
      { id: "2", name: "atcoder", web: "https://atcoder.jp/" },
      { id: "3", name: "codechef", web: "https://www.codechef.com/dashboard" },
      { id: "4", name: "leetcode", web: "https://leetcode.com/" },
    ],
  },
  {
    id: "4",
    group: "misc",
    content: [
      { id: "1", name: "chess", web: "https://www.chess.com/home" },
      { id: "2", name: "spotify", web: "https://open.spotify.com/" },
      { id: "3", name: "chatgpt", web: "https://chatgpt.com" },
      { id: "4", name: "claude", web: "https://claude.ai/" },
      { id: "5", name: "grok", web: "https://grok.com/" },
    ],
  },
];

export const useConfigStore = create<ConfigStore>()(
  persist(
    immer((set) => ({
      imageUrl:
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzI4NmhkMml4NmRlcnFueGk3NDA1a2FwOWF4bWgwbXV2dHdzdTRlcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2fQA8WHXt2BhaAjfz/giphy.gif",
      quote:
        "I wake up every day with infinite potential… and absolutely zero payroll.",
      welcomeMessage: "too lazy to write anything",
      showImage: true,
      lightTheme: false,
      links: initialLinks,
      toggleTheme: () => {
        set((state) => {
          state.lightTheme = !state.lightTheme;
        });
      },
      changeLinkName: (groupId, linkId, name) => {
        set((state) => {
          const group = state.links.find((e) => e.id === groupId);
          if (group) {
            const link = group.content.find((e) => e.id === linkId);
            if (link) {
              link.name = name;
            }
          }
        });
      },
      changeLinkWeb: (groupId, linkId, web) => {
        set((state) => {
          const group = state.links.find((e) => e.id === groupId);
          if (group) {
            const link = group.content.find((e) => e.id === linkId);
            if (link) {
              link.web = web;
            }
          }
        });
      },
      addLink: (groupId, link) => {
        set((state) => {
          const group = state.links.find((ele) => ele.id === groupId);
          if (group) {
            group.content.push(link);
          }
        });
      },
      deleteLink: (groupId, linkId) => {
        set((state) => {
          const group = state.links.find((ele) => ele.id === groupId);
          if (group) {
            group.content = group.content.filter((e) => e.id !== linkId);
          }
        });
      },
      deleteGroup: (id) => {
        set((state) => {
          state.links = state.links.filter((e: GroupContent) => e.id !== id);
        });
      },
      addGroup: (group) => {
        set((state) => {
          state.links.push(group);
        });
      },
      changeImageUrl: (url) => {
        set((state) => {
          state.imageUrl = url;
        });
      },
      changeQuote: (q) => {
        set((state) => {
          state.quote = q;
        });
      },
      changeWelcomeMessage: (m) => {
        set((state) => {
          state.welcomeMessage = m;
        });
      },
      toggleImage: () => {
        set((state) => {
          state.showImage = !state.showImage;
        });
      },
    })),
    {
      name: "config-storage",
    }
  )
);
