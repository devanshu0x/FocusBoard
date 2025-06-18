
import { motion } from "motion/react";
import { useMemo } from "react";


type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  twinkleInterval: number;
  twinkleDelay:number;
};

function generateStars(count: number): Star[] {
  return Array.from({ length: count }, (_, i) => {
    return {
      id: i,
      size: Math.random() * 3 + 2,
      x: Math.random() * 100,
      y: Math.random() * 100,
      twinkleInterval: Math.random() * 4 + 0.75,
      twinkleDelay: Math.random()*0.75+ 0.25
    };
  });
}


const generateBubbles= (count:number)=>{
    return Array.from({length:count},(_,i)=>({
        id:i,
        size: Math.random()*20 +10,
        left: Math.random()*100,
        delay: Math.random()*1,
        duration: Math.random()*10+3,
        drift: Math.random()*10 -5
    }))
}

export default function BackgroundLight() {
    const bubbles= useMemo(()=>generateBubbles(25),[]);
     let starCount = 150;
    const stars=useMemo(()=>generateStars(starCount),[]);
  return (
    <div className="absolute inset-0 -z-999 overflow-hidden bg-[linear-gradient(to_bottom_right,_#b2ebf2_0%,_#80deea_30%,_#4dd0e1_60%,_#26c6da_100%)]">
    {
        bubbles.map((bubble)=>(
            <motion.div
            key={bubble.id}
            initial={{x:0, y:"100vh"}}
            animate={{x:`${bubble.drift}%`,y:"-20vh", opacity:0.8}}
            transition={{duration:bubble.duration, delay:bubble.delay, repeat:Infinity, repeatType:"loop",ease:"easeInOut" }}
            className="absolute bg-white/25 rounded-full border border-white/20 shadow-[inset_-2px_-2px_5px_rgba(0,60,90,0.15),_0_2px_8px_rgba(173,216,230,0.35)] backdrop-blur-sm"
            style={{
                width:bubble.size,
                height:bubble.size,
                left:`${bubble.left}%`,
               
            }}
            />
        ))
    }
    {stars.map((e) => (
        <div
          className="rounded-full absolute bg-white animate-twinkleAnimation"
          style={{
            width: e.size,
            height: e.size,
            left: `${e.x}%`,
            top: `${e.y}%`,
            animationDuration:`${e.twinkleInterval}s`,
            animationDelay:`${e.twinkleDelay}s`
          }}
        />
      ))}
    </div>
  );
}
