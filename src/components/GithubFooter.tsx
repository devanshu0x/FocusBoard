

import { Github } from "lucide-react";

export default function GithubFooter() {
  return (
    <div className="absolute bottom-2 right-2 flex items-center gap-2 text-primary text-sm hover:text-secondary transition-colors duration-200 ">
      <span>Made by</span>
      <a
        href="https://github.com/devanshu0x/focusboard"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1"
      >
        <Github className="w-4 h-4" />
        <span className="underline underline-offset-2">devanshu0x</span>
      </a>
    </div>
  );
}
