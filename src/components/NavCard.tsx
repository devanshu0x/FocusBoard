// Max size of links is 4

import { useConfigStore } from "../store/configStore";

// Max size of content is 6

function NavCard() {
  const links = useConfigStore((state) => state.links);
  const welcomeMessage = useConfigStore((state) => state.welcomeMessage);
  const showImage = useConfigStore((state) => state.showImage);
  const imgUrl = useConfigStore((state) => state.imageUrl);
  return (
    <div className="py-8 px-8 animate-slideup">
      <div className="flex flex-col md:flex-row border border-b-3 border-r-3 border-border bg-background/30 backdrop-blur-sm p-2 rounded-lg max-w-64 sm:max-w-82 md:max-w-4xl mx-auto gap-2">
        {showImage && (
          <div className="h-42 md:h-64 md:w-64 ">
            <img
              src={imgUrl}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        )}
        <div className=" flex-grow min-h-48">
          <div className="text-sm md:text-lg font-bold text-center pb-1 text-text-secondary">
            {welcomeMessage}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4">
            {links.map((e) => (
              <div
                key={e.id}
                className="text-center p-1 text-sm md:text-[0.95rem]"
              >
                <span className="text-accent font-bold">{e.group}</span>
                <ul>
                  {e.content.map((item) => (
                    <li key={item.id} className="py-1">
                      <a
                        href={item.web}
                        className="hover:border-b-1 text-text hover:text-secondary transition-colors duration-150"
                      >
                        {item.name}
                      </a>
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
