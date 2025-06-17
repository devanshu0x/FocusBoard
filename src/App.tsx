import { House, Settings } from "lucide-react";
import Background from "./components/Background";
import Clock from "./components/Clock";
import NavCard from "./components/NavCard";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SettingsModule from "./components/SettingsModule";

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
          className="absolute right-4 top-4 text-slate-300 z-999"
        />
      ) : (
        <Settings
          onClick={() => {
            setSettings((s) => !s);
            setSettingUsed(true);
          }}
          className="absolute right-4 top-4 text-slate-300 hover:rotate-45 transition-transform duration-300 z-999"
        />
      )}
      <Background />

      <AnimatePresence >
        {!settings ? (
          <motion.div
            key="main page"
            initial={settingUsed ? { x: "-100%" } : {}}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0"
          >
            <Clock />
            <NavCard />
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          
          >
            <SettingsModule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
