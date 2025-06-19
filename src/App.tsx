import { House, ListTodo, Moon, Settings, Sun } from "lucide-react";
import BackgroundDark from "./components/BackgroundDark";
import Clock from "./components/Clock";
import NavCard from "./components/NavCard";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import SettingsModule from "./components/SettingsModule";
import TaskBoard from "./components/TaskBoard";
import BackgroundLight from "./components/BackgroundLight";

function App() {
  const [settings, setSettings] = useState<boolean>(false);
  const [settingUsed, setSettingUsed] = useState<boolean>(false);
  const [showTasksBar, setShowTaskBar] = useState<boolean>(false);
  const [lightTheme,setLightTheme]=useState<boolean>(false);
  return (
    <div className={` font-space tracking-wide text-primary ${lightTheme? "light":"dark"} `}>
      {/* Settings */}
      {settings ? (
        <House
          onClick={() => {
            setSettings((s) => !s);
          }}
          className="absolute text-accent right-4 top-4 z-999 hover:text-primary cursor-pointer transition-colors duration-200"
        />
      ) : (
        <Settings
          onClick={() => {
            setSettings((s) => !s);
            setSettingUsed(true);
          }}
          className="absolute right-4 top-4 text-accent hover:text-primary cursor-pointer transition-all hover:rotate-45  duration-300 z-999 animate-popout"
        />
      )}
      {/* Light dark theme switcher */}
      {
        lightTheme? <Moon onClick={()=>setLightTheme(s=>!s)} className="z-999 absolute top-4 text-accent hover:text-primary cursor-pointer transition-colors duration-200 right-14"/>: <Sun onClick={()=>setLightTheme(s=>!s)} className="z-999 absolute text-accent hover:text-primary cursor-pointer transition-colors duration-200 top-4 right-14"/>
      }
      {/* Background */}
      {
        lightTheme? <BackgroundLight/>: <BackgroundDark/>
      }
      {/* Page content */}
      <AnimatePresence>
        {!settings ? (
          <motion.div
            key="main page"
            initial={settingUsed ? { x: "-100%" } : {}}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
            className="absolute top-0 left-0 right-0"
          >
            <Clock />
            <NavCard />
            {!showTasksBar && (
              <ListTodo
                onClick={() => setShowTaskBar(true)}
                className="text-accent hover:text-primary cursor-pointer transition-colors duration-200 stroke-2 absolute top-4 left-4 z-999 animate-popout"
              />
            )}
            <TaskBoard show={showTasksBar} onCancel={()=>setShowTaskBar(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
            <SettingsModule />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
