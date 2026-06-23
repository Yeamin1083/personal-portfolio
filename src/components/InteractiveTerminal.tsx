"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, ChevronDown, ChevronUp, CornerDownLeft, Circle } from "lucide-react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system";
}

interface InteractiveTerminalProps {
  onOpenFile: (filename: string) => void;
  activeFile: string;
}

const HELP_TEXT = `Available commands:
  help       - Display this assistance list
  ls         - List files in current workspace directory
  cat <file> - Print contents of a file (e.g. cat README.md)
  neofetch   - Show system specifications & developer overview
  clear      - Clear the console buffer
  theme <t>  - Change theme (cyan, green, pink, amber)
  matrix     - Initiate core security override matrix script
  joke       - Retrieve a developer-oriented joke
  contact    - Display direct developer connection coordinates
  sudo       - Elevate guest user privileges`;

const WORKSPACE_FILES = ["README.md", "skills.json", "projects.ts", "experience.go", "education.py", "contact.sh"];

const JOKES = [
  "Why do programmers wear glasses? Because they can't C#.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "['hip', 'hip'] (hip hip array!)",
  "A SQL query goes into a bar, walks up to two tables and asks, 'Can I join you?'"
];

export default function InteractiveTerminal({ onOpenFile, activeFile }: InteractiveTerminalProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to YeaminOS Interactive Terminal v1.4.2", type: "system" },
    { text: "Type 'help' to view available operations.", type: "system" }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Save to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      { text: `guest@yeamin-os:~$ ${trimmed}`, type: "input" }
    ];

    const parts = trimmed.split(" ");
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ");

    switch (command) {
      case "help":
        newLines.push({ text: HELP_TEXT, type: "output" });
        break;
      case "ls":
        newLines.push({ text: WORKSPACE_FILES.join("     "), type: "success" });
        break;
      case "clear":
        setHistory([]);
        return;
      case "neofetch":
        const neofetchContent = `
   __   __                 _       
   \\ \\ / /__  __ _ _ __   (_)_ __  
    \\ V / _ \\/ _\` | '_ \\  | | '_ \\ 
     | |  __/ (_| | | | | | | | | |
     |_|\\___|\\__,_|_| |_| |_|_| |_|
                                   
   OS: YeaminOS v1.4.2 (Next.js/React)
   Kernel: HTML5/TailwindCSS/TypeScript
   Uptime: ${Math.floor(performance.now() / 1000)}s
   Shell: bash-yeamin-portfolio
   Active File: ${activeFile}
   CPU: Gemini Agent Core (3.5 Flash High)
   Resolution: ${typeof window !== "undefined" ? `${window.innerWidth}x${window.innerHeight}` : "1080p"}
   Hobby: Competitive Coding & 3D Web UI
   `;
        newLines.push({ text: neofetchContent, type: "output" });
        break;
      case "cat":
        if (!arg) {
          newLines.push({ text: "Usage: cat <filename>", type: "error" });
        } else if (WORKSPACE_FILES.includes(arg)) {
          onOpenFile(arg);
          newLines.push({ text: `Opening file [${arg}] in editor window.`, type: "success" });
        } else {
          newLines.push({ text: `cat: ${arg}: File not found in workspace directories.`, type: "error" });
        }
        break;
      case "joke":
        const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
        newLines.push({ text: randomJoke, type: "output" });
        break;
      case "contact":
        newLines.push({
          text: `Direct coordinates:
  Email:    yeaminislamemon02@gmail.com
  Phone:    +8801406900468
  Location: Gulshan, Dhaka, Bangladesh`,
          type: "success"
        });
        break;
      case "theme":
        if (!arg) {
          newLines.push({ text: "Usage: theme <cyan | green | pink | amber>", type: "error" });
        } else {
          const validThemes = ["cyan", "green", "pink", "amber"];
          if (validThemes.includes(arg.toLowerCase())) {
            // We can dispatch a custom event or manipulate class
            if (typeof window !== "undefined") {
              const body = document.body;
              validThemes.forEach(t => body.classList.remove(`theme-${t}`));
              body.classList.add(`theme-${arg.toLowerCase()}`);
            }
            newLines.push({ text: `Theme successfully updated to [${arg.toLowerCase()}].`, type: "success" });
          } else {
            newLines.push({ text: `theme: ${arg}: Theme option not supported.`, type: "error" });
          }
        }
        break;
      case "matrix":
        newLines.push({ text: "Initializing matrix digital rain bypass...", type: "system" });
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("trigger-matrix"));
        }
        break;
      case "sudo":
        newLines.push({ text: "Permission denied. This incident has been logged and reported to root admin.", type: "error" });
        break;
      default:
        newLines.push({ text: `yeaminOS: command not found: ${command}. Type 'help' for support.`, type: "error" });
    }

    setHistory((prev) => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
      setInputVal("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < commandHistory.length) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = historyIndex - 1;
      if (nextIdx >= 0) {
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="border-t border-white/10 bg-zinc-950/95 flex flex-col font-mono relative overflow-hidden transition-all duration-300">
      
      {/* Terminal Title Bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between border-b border-white/5 cursor-pointer hover:bg-zinc-800/80 transition-colors select-none"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-400">
          <Terminal size={14} className="text-cyan-400" />
          <span>TERMINAL</span>
          <span className="text-[10px] bg-zinc-800 text-zinc-500 px-1.5 py-0.5 rounded font-normal">
            bash-yeaminOS
          </span>
        </div>
        <div className="flex items-center gap-4 text-zinc-500 hover:text-zinc-300">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
          </div>
          {isOpen ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
        </div>
      </div>

      {/* Terminal Body */}
      {isOpen && (
        <div 
          onClick={focusInput}
          className="p-4 h-48 md:h-56 overflow-y-auto space-y-2.5 text-xs md:text-sm text-zinc-300 relative select-text"
        >
          {history.map((line, idx) => (
            <div 
              key={idx} 
              className={`whitespace-pre-wrap ${
                line.type === "input" ? "text-white" :
                line.type === "error" ? "text-red-400 font-semibold" :
                line.type === "success" ? "text-cyan-400 font-medium" :
                line.type === "system" ? "text-zinc-500 italic" : "text-zinc-300"
              }`}
            >
              {line.text}
            </div>
          ))}

          {/* Active Command Prompt */}
          <div className="flex items-center gap-2 pt-1.5">
            <span className="text-cyan-400 shrink-0">guest@yeamin-os:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none flex-1 text-white p-0 m-0 caret-cyan-400 font-mono w-full select-text"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <CornerDownLeft size={12} className="text-zinc-600 shrink-0" />
          </div>

          <div ref={terminalEndRef} />
        </div>
      )}

    </div>
  );
}
