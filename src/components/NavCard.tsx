// Max size of links is 4

import { useConfigStore } from "../store/configStore";

// Max size of content is 7 
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

function NavCard() {
  const welcomeMessage = useConfigStore((state)=>state.welcomeMessage);
  const showImage = useConfigStore((state)=>state.showImage);
  const imgUrl =useConfigStore((state)=>state.imageUrl);
  return (
    <div className="py-8 px-8 animate-slideup">
      <div className="flex flex-col md:flex-row border border-[#d1d5db] p-2 rounded-lg max-w-64 sm:max-w-82 md:max-w-3xl mx-auto gap-2">
        {showImage && (
          <div className="h-42 md:h-64 md:w-64 ">
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}
        <div className=" flex-grow min-h-48">
          <div className="text-sm md:text-lg font-bold text-center pb-1 text-blue-300">
            {welcomeMessage}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {links.map((e) => (
              <div className="text-center p-1 text-sm">
                <span className="text-[#ffd700]">{e.group}</span>
                <ul>
                  {e.content.map((item) => (
                    <li className="py-1">
                      <a href={item.web} className="border-b-1 hover:text-indigo-400 transition-colors duration-150">{item.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavCard;
