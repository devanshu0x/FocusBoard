import { useState } from "react";
import InputBox from "./InputBox";
import { ArrowRight, Check } from "lucide-react";
import { useConfigStore } from "../store/configStore";
import Group from "./Group";
import { nanoid } from "nanoid";

function SettingsModule() {
  const links = useConfigStore((state) => state.links);
  const groupCount = links.length;
  const [newGroupName, setNewGroupName] = useState("");
  const showImage = useConfigStore((state) => state.showImage);
  const addGroup = useConfigStore((state) => state.addGroup);
  return (
    <div className=" m-6 mt-18 rounded-lg">
      <div className="text-accent font-bold text-xl sm:text-2xl md:text-3xl mb-4 text-center">
        Configure Startpage
      </div>
      <div className="border border-b-3 backdrop-blur-sm bg-background/20 border-r-3 border-border rounded-lg shadow-3xl px-8 py-4 max-h-116 md:max-w-3xl mx-auto overflow-y-auto text-xs sm:text-sm ">
        <InputBox
          field="Image Url"
          value={useConfigStore((state) => state.imageUrl)}
          onChange={useConfigStore((store) => store.changeImageUrl)}
        />
        <label className="flex gap-2 my-2 text-text text-sm items-center">
          <div
            onClick={useConfigStore((state) => state.toggleImage)}
            className="h-4 w-4 border rounded-sm flex items-center justify-center"
          >
            {showImage && <Check className="text-text font-bold" />}
          </div>
          <div className="text-text">Show Image</div>
        </label>
        <InputBox
          field="Quote"
          value={useConfigStore((state) => state.quote)}
          onChange={useConfigStore((state) => state.changeQuote)}
        />
        <InputBox
          field="Welcome message"
          value={useConfigStore((state) => state.welcomeMessage)}
          onChange={useConfigStore((state) => state.changeWelcomeMessage)}
        />
        {/* Add Group*/}
        <div className="flex rounded-lg my-4 border-b group focus-within:border-accent border-primary">
          <input
            disabled={groupCount >= 4}
            placeholder={
              groupCount >= 4 ? "Max 4 groups allowed" : "Add Group..."
            }
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && newGroupName != "") {
                addGroup({
                  id: nanoid(),
                  group: newGroupName,
                  content: [],
                });
                setNewGroupName("");
              }
            }}
            type="text"
            className="px-4 py-2 text-text-secondary bg-primary/30 w-full rounded-l-lg focus:outline-0"
          ></input>
          <div
            onClick={() => {
              if (newGroupName != "") {
                addGroup({
                  id: nanoid(),
                  group: newGroupName,
                  content: [],
                });
                setNewGroupName("");
              }
            }}
            className="cursor-pointer w-12 bg-secondary group-focus-within:bg-primary rounded-r-lg flex justify-center items-center"
          >
            <ArrowRight className="text-text/80" />
          </div>
        </div>
        {/* Groups */}
        {links.map((group) => (
          <div key={group.id} className="my-2">
            <Group group={group} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingsModule;
