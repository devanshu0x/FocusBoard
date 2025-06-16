import { Divide, House, Settings } from "lucide-react";
import Background from "./components/Background";
import Clock from "./components/Clock";
import NavCard from "./components/NavCard";
import { useState } from "react";

function App() {
  const [settings, setSettings] = useState(false);
  const [settingUsed, setSettingUsed] = useState(false);
  return (
    <div className="font-space text-white">
      {settings ? (
        <House
          onClick={() => {
            setSettings((s) => !s);
          }}
          className="absolute right-4 top-4 text-slate-300"
        />
      ) : (
        <Settings
          onClick={() => {
            setSettings((s) => !s);
            setSettingUsed(true);
          }}
          className="absolute right-4 top-4 text-slate-300 hover:rotate-45 transition-transform duration-300"
        />
      )}
      <Background />
      <div
        className={`${settings && "animate-slideleftFade"} ${
          (!settings && settingUsed) && "animate-slideright"
        }`}
      >
        <Clock />
        <NavCard />
      </div>
    </div>
  );
}

export default App;
