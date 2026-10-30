"use client";

import { useEffect, useState } from "react";

import {
  ArrowDown,
  ArrowDownRight,
  ArrowRight,
  Code2,
  Cpu,
  ExternalLink,
  Mail,
  Menu,
  Shield,
  Terminal as TerminalIcon,
  X,
  Zap,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
/* -----------------------------------------
   PORTFOLIO DATA
----------------------------------------- */

const skills = [
  {
    name: "JavaScript",
    category: "LANGUAGE",
    level: "CORE",
  },
  {
    name: "TypeScript",
    category: "LANGUAGE",
    level: "LEARNING",
  },
  {
    name: "React",
    category: "FRONTEND",
    level: "CORE",
  },
  {
    name: "Next.js",
    category: "FRAMEWORK",
    level: "CORE",
  },
  {
    name: "Tailwind CSS",
    category: "STYLING",
    level: "CORE",
  },
  {
    name: "Node.js",
    category: "BACKEND",
    level: "EXPLORING",
  },
  {
    name: "MongoDB",
    category: "DATABASE",
    level: "EXPLORING",
  },
  {
    name: "AI / LLM APIs",
    category: "AI SYSTEMS",
    level: "BUILDING",
  },
];

const projects = [
  {
    id: "01",
    name: "ANMOL AI",
    type: "AI / FULL-STACK",
    description:
      "An AI-powered assistant platform concept designed to bring intelligent tools and productivity into one digital workspace.",
    stack: ["Next.js", "TypeScript", "AI APIs"],
    status: "IN DEVELOPMENT",
    link: "",
  },
  {
    id: "02",
    name: "DEV MATE",
    type: "COMMUNITY / WEB",
    description:
      "A platform that helps students discover projects, connect with collaborators, and learn together.",
    stack: ["React", "JavaScript", "CSS"],
    status: "PORTFOLIO PROJECT",
    link: "",
  },
  {
    id: "03",
    name: "WEATHER SYSTEM",
    type: "API / WEB",
    description:
      "A weather application that displays location-based weather conditions using an external API.",
    stack: ["JavaScript", "REST API", "CSS"],
    status: "PORTFOLIO PROJECT",
    link: "",
  },
];

/* -----------------------------------------
   TERMINAL COMMANDS
----------------------------------------- */

const terminalResponses: Record<string, string[]> = {
  help: [
    "AVAILABLE COMMANDS",
    "────────────────────────────",
    "about     → Developer profile",
    "skills    → Technical arsenal",
    "projects  → Mission directory",
    "contact   → Establish connection",
    "whoami    → Current identity",
    "date      → Current date",
    "matrix    → Enter the Matrix",
    "time      → Current time",
    "clear     → Clear terminal",
  ],

  about: [
    "IDENTITY: ANMOL SHARMA",
    "ROLE: FULL-STACK DEVELOPER",
    "INTERESTS: AI / WEB / AUTOMATION",
    "MINDSET: CONTINUOUS LEARNING",
    "MISSION: BUILD. INNOVATE. IMPROVE.",
  ],

  skills: [
    "LOADING TECHNICAL ARSENAL...",
    "JavaScript  [AVAILABLE]",
    "React       [AVAILABLE]",
    "Next.js     [AVAILABLE]",
    "TypeScript  [LEARNING]",
    "AI SYSTEMS  [EXPLORING]",
  ],

  projects: [
    "ACCESSING MISSION DIRECTORY...",
    "01 / ANMOL AI",
    "02 / DEV MATE",
    "03 / WEATHER SYSTEM",
    "Navigate to the PROJECTS section.",
  ],

  whoami: [
    "USER: ANMOL.SH",
    "ACCESS: PORTFOLIO GUEST",
    "ENVIRONMENT: DIGITAL UNIVERSE",
    "STATUS: CONNECTED",
  ],

  sudo: [
    "ACCESS DENIED",
    "Nice try, visitor.",
    "SYSTEM: ANMOL.SH",
    "PRIVILEGES: RESTRICTED",
  ],
  
  matrix: [
  "INITIALIZING MATRIX PROTOCOL...",
  "DIGITAL REALITY: 01001000 01001001",
  "SYSTEM: ANMOL.SH",
  "WELCOME TO THE MATRIX.",
  ],

  date: [
    `CURRENT DATE: ${new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,
  ],

  time: [
    `CURRENT TIME: ${new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })} IST`,
  ],

  contact: [
    "CONNECTION REQUEST INITIALIZED...",
    "Navigate to the CONTACT section.",
    "Let's build something extraordinary.",
  ],
};

/* -----------------------------------------
   MATRIX BACKGROUND
----------------------------------------- */

function MatrixBackground({ matrixMode }: { matrixMode: boolean }) {
  const [columns, setColumns] = useState<
    {
      left: number;
      duration: number;
      delay: number;
      text: string;
    }[]
  >([]);

  useEffect(() => {
    const generated = Array.from({ length: 24 }, (_, index) => ({
      left: (index / 24) * 100,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -15,
      text: Array.from({ length: 12 }, () =>
        Math.random() > 0.5 ? "1" : "0"
      ).join("\n"),
    }));

    setColumns(generated);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.13]"
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="matrix-character mono absolute top-[-40%] whitespace-pre text-xs leading-6 text-[#00ff9c]" 
          style={{
            left: `${column.left}%`,
            animationDuration: `${column.duration}s`,
            animationDelay: `${column.delay}s`,
          }}
        >
          {column.text}
        </div>
      ))}
    </div>
  );
}

/* -----------------------------------------
   INTERACTIVE TERMINAL
----------------------------------------- */

function TerminalWindow({
  setMatrixMode,
}: {
  matrixMode: boolean;
  setMatrixMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState<
    {
      command: string;
      output: string[];
    }[]
  >([
    {
      command: "init --portfolio",
      output: [
        "ANMOL.SH INTERACTIVE TERMINAL",
        "Connection established successfully.",
        'Type "help" to see available commands.',
      ],
    },
  ]);

  function executeCommand(rawCommand: string) {
    const command = rawCommand.trim().toLowerCase();

    if (!command) {
      return;
    }

    if (command === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (command === "matrix") {
      setMatrixMode((previous) => !previous);
    }

    const output = terminalResponses[command] ?? [
      `Command not found: ${command}`,
      'Type "help" to see available commands.',
    ];

    setHistory((previous) => [
      ...previous,
      {
        command,
        output,
      },
    ]);

    setInput("");

    const allowedSections = [
      "about",
      "skills",
      "projects",
      "contact",
    ];

    if (allowedSections.includes(command)) {
      window.setTimeout(() => {
        document.getElementById(command)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  return (
    <div className="terminal-panel glow-green w-full overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.025] px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />

          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />

          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        <span className="mono text-[10px] tracking-widest text-gray-500">
          ANMOL@PORTFOLIO:~
        </span>

        <TerminalIcon size={15} className="text-[#00ff9c]" />
      </div>

      <div
        className="mono flex h-[300px] flex-col gap-3 overflow-y-auto p-5 text-xs leading-5 sm:h-[330px] sm:text-[13px]"
        aria-label="Interactive portfolio terminal"
        aria-live="polite"
      >
        {history.map((entry, index) => (
          <div key={index}>
            <p className="break-all text-[#00ff9c]">
              <span className="text-purple-400">
                guest@anmol
              </span>
              :~$ {entry.command}
            </p>

            <div className="mt-1 space-y-0.5 text-gray-400">
              {entry.output.map((line, lineIndex) => (
                <p
                  key={lineIndex}
                  className="whitespace-pre-wrap break-words"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ))}

        <form
          className="mt-auto flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            executeCommand(input);
          }}
        >
          <span className="shrink-0 text-[#00ff9c]">
            $
          </span>

          <input
            aria-label="Enter a terminal command"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-gray-600"
            placeholder="Type help..."
            autoComplete="off"
            spellCheck={false}
          />

          <span className="cursor-blink text-[#00ff9c]">
            ▋
          </span>
        </form>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[9px] text-gray-600 sm:text-[10px]">
        <span className="mono">
          INTERACTIVE SHELL
        </span>

        <span className="mono">
          STATUS: ONLINE
        </span>
      </div>
    </div>
  );
}

/* -----------------------------------------
   MAIN HOMEPAGE
----------------------------------------- */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [matrixMode, setMatrixMode] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [roleText, setRoleText] = useState("Full-Stack Developer");
  const [profileOpen, setProfileOpen] = useState(false);

  useEffect(() => {
    function updateClock() {
      setClock(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date())
      );
    }

    updateClock();

    const interval = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
  function handleScroll() {
    setScrolled(window.scrollY > 20);
  }

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

useEffect(() => {
  const roles = [
    "Full-Stack Developer",
    "AI Engineer",
    "Creative Problem Solver",
    "Software Developer",
  ];

  let roleIndex = 0;
  let characterIndex = roles[0].length;
  let deleting = true;

  const interval = window.setInterval(() => {
    const currentRole = roles[roleIndex];

    if (deleting) {
      characterIndex--;

      setRoleText(currentRole.slice(0, characterIndex));

      if (characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    } else {
      const nextRole = roles[roleIndex];

      characterIndex++;

      setRoleText(nextRole.slice(0, characterIndex));

      if (characterIndex === nextRole.length) {
        deleting = true;
      }
    }
  }, 100);

  return () => window.clearInterval(interval);
}, []);

useEffect(() => {
  function handleMouseMove(event: MouseEvent) {
    setMousePosition({
      x: (event.clientX / window.innerWidth) * 100,
      y: (event.clientY / window.innerHeight) * 100,
    });
  }

  window.addEventListener("mousemove", handleMouseMove);

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);
useEffect(() => {
  function handleActiveSection() {
    const sections = navItems
      .map((item) =>
        document.getElementById(item.href.replace("#", ""))
      )
      .filter((section) => section !== null);

    let currentSection = "home";

    for (const section of sections) {
      if (section && section.getBoundingClientRect().top <= 200) {
        currentSection = section.id;
      }
    }

    setActiveSection(currentSection);
  }

  window.addEventListener("scroll", handleActiveSection);

  handleActiveSection();

  return () => {
    window.removeEventListener("scroll", handleActiveSection);
  };
}, []);

  const navItems = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "PROJECTS", href: "#projects" },
  { label: "CONTACT", href: "#contact" },
];
  return (
    <main className="site-grid relative min-h-screen overflow-hidden">
      <MatrixBackground matrixMode={matrixMode} />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(0,255,156,0.08),transparent_38%),radial-gradient(ellipse_at_90%_45%,rgba(168,85,247,0.08),transparent_38%)]" />

      {/* NAVBAR */}

      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#050608]/90 backdrop-blur-xl">
        <nav className= {`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${
          scrolled
             ? "border-[#00ff9c]/30 bg-[#050608]/90 shadow-[0_0_25px_rgba(0,255,156,0.08)] backdrop-blur-xl"
             : "border-transparent bg-transparent"
              }`}>
              <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#home" className="flex items-center gap-2">
            <span className="mono text-xl font-bold tracking-tight text-white">
              ANMOL
              <span className="text-[#00ff9c]">.SH</span>
            </span>

            <span className="h-2 w-2 rounded-full bg-[#00ff9c] shadow-[0_0_12px_#00ff9c]" />
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`mono relative text-[10px] tracking-[0.2em] transition-colors duration-300 hover:text-[#00ff9c] ${
                  activeSection === item.href.replace("#", "")
                   ? "text-[#00ff9c]"
                   : "text-gray-400"
                }`}
              >
                {activeSection === item.href.replace("#", "") && (
                  <span className="absolute -bottom-2 left-0 h-px w-full bg-[#00ff9c] shadow-[0_0_8px_#00ff9c]" />
                )}
                {item.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="mono hidden items-center gap-2 border border-[#00ff9c]/40 px-4 py-2 text-[10px] tracking-widest text-[#00ff9c] transition-all hover:bg-[#00ff9c] hover:text-black sm:flex"
          >
            <span className="pulse-glow h-1.5 w-1.5 rounded-full bg-[#00ff9c]" />
            CONNECT
          </a>

          <button
            className="rounded-lg border border-white/10 p-2 text-white md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#080a0e] px-6 py-4 md:hidden">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="mono block border-b border-white/[0.06] py-4 text-xs tracking-widest text-gray-300 hover:text-[#00ff9c]"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* HERO SECTION */}

      <section
        id="home"
        className="relative z-10 mx-auto flex min-h-[calc(100svh-72px)] max-w-7xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-12"
      >
        <div
  className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
  style={{
    background: `radial-gradient(500px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0,255,156,0.15), transparent 70%)`,
  }}
/>
        <div className="mb-9 flex flex-wrap items-center gap-3">
<span className="group mono relative flex items-center gap-2 overflow-hidden border border-[#00ff9c]/30 bg-[#00ff9c]/[0.06] px-3 py-2 text-[9px] tracking-[0.18em] text-[#00ff9c] shadow-[0_0_15px_rgba(0,255,156,0.05)] transition-all duration-300 hover:border-[#00ff9c]/70 hover:shadow-[0_0_20px_rgba(0,255,156,0.15)] sm:text-[10px]">
  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#00ff9c]/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

  <span className="pulse-glow relative h-1.5 w-1.5 rounded-full bg-[#00ff9c]" />

  <span className="relative">DIGITAL IDENTITY: VERIFIED</span>
</span>


          <span className="mono text-[9px] tracking-[0.15em] text-gray-500 sm:text-[10px]">
            INDIA / IST {clock}
          </span>
        </div>

        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div>
            <p className="mono mb-5 text-xs tracking-[0.25em] text-[#00ff9c]">
              &gt; INITIALIZING DEVELOPER PROFILE_
            </p>

            <h1 className="glitch-text max-w-3xl text-5xl font-extrabold leading-[1.04] tracking-[-0.065em] sm:text-7xl lg:text-[92px]">
              ANMOL
              <br />

              <span className="bg-gradient-to-r from-[#00ff9c] via-[#00e5ff] to-[#a855f7] bg-clip-text text-transparent">
                SHARMA.
              </span>
            </h1>
            

                        <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="mono flex items-center gap-2 border border-[#00ff9c]/20 bg-[#00ff9c]/5 px-3 py-2 text-[10px] text-gray-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00ff9c]" />
                SYSTEM STATUS:
                <span className="text-[#00ff9c]">ONLINE</span>
              </span>

              <span className="mono flex items-center gap-2 border border-[#00e5ff]/20 bg-[#00e5ff]/5 px-3 py-2 text-[10px] text-gray-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00e5ff]" />
                DEVELOPER MODE:
                <span className="text-[#00e5ff]">ACTIVE</span>
              </span>
            </div>

            <div className="mono mt-7 flex items-center gap-2 text-sm text-gray-300 sm:text-base">
              <span className="text-[#00ff9c]">
                &gt;
              </span>

              <span>
                {roleText}
              </span>

              <span className="cursor-blink text-[#00ff9c]">
                _
              </span>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
              I turn ideas into intelligent digital experiences.
              Building modern web applications, exploring AI,
              and creating technology that solves real problems.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 bg-[#00ff9c] px-5 py-3.5 text-xs font-bold tracking-wider text-black transition-all hover:shadow-[0_0_30px_rgba(0,255,156,0.25)] sm:px-6"
              >
                EXPLORE MY WORK

                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 border border-white/15 bg-white/[0.025] px-5 py-3.5 text-xs font-semibold tracking-wider text-white transition-all hover:border-[#a855f7]/60 hover:text-[#c084fc] sm:px-6"
              >
                INITIALIZE CONTACT

                <ArrowDownRight size={15} />
              </a>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/[0.08] pt-6">
              <a
                href="https://github.com/anmolsharma99"
                target="_blank"
                rel="noreferrer"
                className="mono flex items-center gap-2 text-[10px] tracking-wider text-gray-500 transition-colors hover:text-[#00ff9c]"
              >
                <FaGithub size={15} />
                GITHUB
                <ExternalLink size={10} />
              </a>

              <a
                href="https://www.linkedin.com/in/anmol-sharma-3a41b529a/"
                target="_blank"
                rel="noreferrer"
                className="mono flex items-center gap-2 text-[10px] tracking-wider text-gray-500 transition-colors hover:text-[#00ff9c]"
              >
                <FaLinkedinIn size={15} />
                LINKEDIN
                <ExternalLink size={10} />
              </a>

              <span className="mono flex items-center gap-2 text-[10px] tracking-wider text-gray-500">
                <Shield size={14} className="text-[#00ff9c]" />
                ALWAYS BUILDING
              </span>
            </div>
          </div>

          {/* TERMINAL */}

          <div className="relative mx-auto w-full max-w-lg lg:mx-0 lg:ml-auto">
            <div className="pointer-events-none absolute -inset-5 rounded-3xl bg-gradient-to-br from-[#00ff9c]/10 via-transparent to-[#a855f7]/10 blur-2xl" />

            <div className="relative">
              <div className="mono absolute -top-4 left-5 z-10 border border-[#00ff9c]/30 bg-[#050608] px-3 py-1.5 text-[9px] tracking-widest text-[#00ff9c]">
                LIVE INTERFACE / 001
              </div>

              <TerminalWindow
                matrixMode={matrixMode}
                setMatrixMode={setMatrixMode}
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  {
                    value: "01",
                    label: "MINDSET",
                    color: "text-[#00ff9c]",
                  },
                  {
                    value: "AI",
                    label: "INTEREST",
                    color: "text-[#c084fc]",
                  },
                  {
                    value: "∞",
                    label: "LEARNING",
                    color: "text-[#00e5ff]",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="terminal-panel rounded-lg px-3 py-4 text-center"
                  >
                    <p
                      className={`mono text-xl font-bold ${item.color}`}
                    >
                      {item.value}
                    </p>

                    <p className="mono mt-1 text-[8px] tracking-widest text-gray-500 sm:text-[9px]">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mono mt-4 flex items-center justify-between text-[9px] tracking-widest text-gray-500">
                <span>SYS.ID: ANMOL-001</span>

                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00ff9c]" />
                  SYSTEM READY
                </span>
              </div>
            </div>
          </div>
        </div>

        <a
          href="#about"
          className="mono mt-16 flex w-fit items-center gap-3 text-[10px] tracking-[0.2em] text-gray-500 transition-colors hover:text-[#00ff9c]"
        >
          <ArrowDown size={14} />
          SCROLL TO EXPLORE
        </a>
      </section>

      {/* ABOUT SECTION */}

      <section
        id="about"
        className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="mono mb-3 text-[10px] tracking-[0.25em] text-[#00ff9c]">
                01 / IDENTITY FILE
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                About{" "}
                <span className="text-[#00ff9c] drop-shadow-[0_0_12px_rgba(0,255,156,0.65)]">
                  Me.
                </span>
              </h2>
            </div>

            <Code2
              className="mb-1 text-[#00ff9c]/60"
              size={30}
            />
          </div>

          <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
            <div className="terminal-panel group relative overflow-hidden rounded-xl border border-[#00ff9c]/30 bg-[#080d12]/90 p-6 shadow-[0_0_18px_rgba(0,255,156,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff9c]/70 hover:shadow-[0_0_30px_rgba(0,255,156,0.2)] sm:p-8">
              <p className="mono mb-6 text-xs text-gray-500">
                <span className="text-[#00ff9c]">
                  const
                </span>{" "}
                developer = {"{"}
              </p>

              <div className="mono space-y-4 pl-3 text-xs leading-6 sm:pl-6 sm:text-sm">
                <p>
                  <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.45)]">
                    name:
                  </span>{" "}
                  <span className="text-[#00ff9c] drop-shadow-[0_0_10px_rgba(0,255,156,0.55)]">
                    &quot;Anmol Sharma&quot;
                  </span>
                  ,
                </p>

                <p>
                  <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(192,132,252,0.45)]">
                    role:
                  </span>{" "}
                  <span className="text-[#00ff9c]">
                    &quot;Full-Stack Developer&quot;
                  </span>
                  ,
                </p>

                <p>
                  <span className="text-purple-400">
                    interests:
                  </span>{" "}
                  [
                  <span className="text-[#00e5ff]">
                    &quot;Web&quot;
                  </span>
                  ,{" "}
                  <span className="text-[#00e5ff]">
                    &quot;AI&quot;
                  </span>
                  ,{" "}
                  <span className="text-[#00e5ff]">
                    &quot;Automation&quot;
                  </span>
                  ],
                </p>

                <p>
                  <span className="text-purple-400">
                    mindset:
                  </span>{" "}
                  <span className="text-[#00ff9c]">
                    &quot;Always Learning&quot;
                  </span>
                  ,
                </p>

                <p>
                  <span className="text-purple-400">
                    mission:
                  </span>{" "}
                  <span className="text-[#00ff9c]">
                    &quot;Build. Innovate. Improve.&quot;
                  </span>
                </p>
              </div>

              <p className="mono mt-6 text-xs text-gray-500">
                {"};"}
              </p>
            </div>

            <div className="terminal-panel group relative flex flex-col justify-between rounded-xl border border-[#00ff9c]/30 bg-[#080d12]/90 p-6 shadow-[0_0_15px_rgba(0,255,156,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff9c]/70 hover:shadow-[0_0_30px_rgba(0,255,156,0.18)] sm:p-8">
              <div>
                <p className="mono text-[10px] tracking-[0.2em] text-[#00ff9c]">
                  &gt; MY APPROACH
                </p>

                <p className="mt-5 text-lg leading-8 text-gray-200 sm:text-xl">
                  Curious by nature.
                  <br />

                  <span className="text-gray-500">
                    Driven by challenges.
                  </span>

                  <br />

                  <span className="text-[#00ff9c]">
                    Focused on building.
                  </span>
                </p>

                <p className="mt-5 text-sm leading-7 text-gray-500">
                  I enjoy understanding how things work, learning
                  new technologies, and turning concepts into
                  practical applications. Every project is an
                  opportunity to improve.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00ff9c]/20 bg-[#00ff9c]/5">
                  <Cpu
                    size={19}
                    className="text-[#00ff9c]"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    Continuous Learning
                  </p>

                  <p className="mono mt-1 text-[10px] text-gray-500">
                    KNOWLEDGE BASE: EXPANDING
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}

      <section
        id="skills"
        className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mono mb-3 text-[10px] tracking-[0.25em] text-[#00ff9c]">
            02 / TECHNICAL ARSENAL
          </p>

          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Skills &{" "}
              <span className="text-[#00ff9c] drop-shadow-[0_0_12px_rgba(0,255,156,0.55)]">
                Systems.
              </span>
            </h2>

            <span className="mono text-[10px] text-gray-500">
              MODULES: {String(skills.length).padStart(2, "0")}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="terminal-panel group relative overflow-hidden rounded-xl border border-[#00ff9c]/20 bg-[#080d12]/90 p-5 shadow-[0_0_12px_rgba(0,255,156,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-[#00ff9c]/70 hover:bg-[#00ff9c]/[0.04] hover:shadow-[0_0_25px_rgba(0,255,156,0.16),inset_0_0_20px_rgba(0,255,156,0.025)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00ff9c]/20 bg-[#00ff9c]/[0.04] shadow-[0_0_10px_rgba(0,255,156,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:border-[#00ff9c]/60 group-hover:bg-[#00ff9c]/[0.10] group-hover:shadow-[0_0_20px_rgba(0,255,156,0.25)]">
                    {index % 3 === 0 ? (
                      <Code2
                        size={19}
                        className="text-[#00ff9c]"
                      />
                    ) : index % 3 === 1 ? (
                      <Cpu
                        size={19}
                        className="text-purple-400"
                      />
                    ) : (
                      <Zap
                        size={19}
                        className="text-cyan-400"
                      />
                    )}
                  </div>

                  <span className="mono text-[9px] text-gray-500">
                    MOD.{String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mono text-[9px] tracking-widest text-gray-500">
                  {skill.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-gray-100">
                  {skill.name}
                </h3>

                <div className="mt-4 flex items-center justify-between border-t border-white/[0.07] pt-3">
                  <span className="mono text-[9px] text-gray-500">
                    STATUS
                  </span>

                  <span
                    className={`mono rounded-md border px-2 py-1 text-[9px] font-semibold tracking-wider transition-all duration-300 ${
                      skill.level === "CORE"
                        ? "border-[#00ff9c]/30 bg-[#00ff9c]/[0.08] text-[#00ff9c] shadow-[0_0_10px_rgba(0,255,156,0.08)] group-hover:border-[#00ff9c]/60 group-hover:shadow-[0_0_14px_rgba(0,255,156,0.2)]"
                        : "border-purple-400/25 bg-purple-400/[0.06] text-purple-300 group-hover:border-purple-400/50 group-hover:shadow-[0_0_12px_rgba(192,132,252,0.15)]"
                    }`}
                  >
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="mono mt-5 text-[10px] leading-6 text-gray-500">
            Skill levels are editable and should reflect your actual proficiency.
          </p>
        </div>
      </section>

      {/* PROJECTS SECTION */}

      <section
        id="projects"
        className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mono mb-3 text-[10px] tracking-[0.25em] text-[#00ff9c]">
            03 / MISSION DIRECTORY
          </p>

          <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
            <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
              Selected{" "}
              <span className="text-[#00ff9c]">
                Projects.
              </span>
            </h2>

            <span className="mono text-[10px] text-gray-500">
              ACCESS LEVEL: PUBLIC
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {projects.map((project) => (
              <article
                key={project.id}
                className="terminal-panel group flex flex-col rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#00ff9c]/45 sm:p-7"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="mono text-xs text-[#00ff9c]">
                    MISSION_{project.id}
                  </span>

                  <ArrowDownRight
                    size={20}
                    className="text-gray-500 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#00ff9c]"
                  />
                </div>

                <p className="mono text-[9px] tracking-[0.18em] text-purple-300">
                  {project.type}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {project.name}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-7 text-gray-400">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="mono border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[9px] text-gray-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="mono text-[9px] text-gray-500">
                    {project.status}
                  </span>

                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mono flex items-center gap-2 text-[10px] text-[#00ff9c] hover:underline"
                    >
                      INSPECT
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span className="mono text-[9px] text-gray-500">
                      LINK PENDING
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}

      <section
        id="contact"
        className="relative z-10 scroll-mt-24 px-5 py-24 sm:px-8 lg:px-12"
      >
        <div className="mx-auto max-w-7xl">
          <div className="terminal-panel relative overflow-hidden rounded-2xl p-7 sm:p-12 lg:p-16">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00ff9c]/[0.08] blur-[80px]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mono mb-5 inline-flex items-center gap-3 rounded-md border border-[#00ff9c]/30 bg-[#00ff9c]/[0.06] px-4 py-2 text-[10px] font-semibold tracking-[0.25em] text-[#00ff9c] shadow-[0_0_15px_rgba(0,255,156,0.08)] transition-all duration-300 hover:border-[#00ff9c]/70 hover:shadow-[0_0_22px_rgba(0,255,156,0.2)]">
                  <span className="relative flex h-2 w-2">
                     <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00ff9c] opacity-60" />
                     <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00ff9c] shadow-[0_0_8px_#00ff9c]" />
                  </span>
                  04 <span className="text-[#00ff9c]/40">/</span> ESTABLISH CONNECTION
                </p>

                <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-6xl">
                  Have an idea?
                  <br />

                  <span className="text-[#00ff9c] drop-shadow-[0_0_18px_rgba(0,255,156,0.55)]">
                    Let&apos;s build it.
                  </span>
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
                  Have a project, opportunity, or interesting
                  problem to solve? I&apos;d love to hear about it.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <button
                  type="button"
                  onClick={() => setProfileOpen(true)}
                  className="inline-flex items-center justify-center gap-3 bg-[#00ff9c] px-6 py-4 text-xs font-bold tracking-wider text-black transition-all hover:shadow-[0_0_25px_rgba(0,255,156,0.4)]"
                >
                  <Mail size={16} />
                  SEND A MESSAGE
                </button>

                <a
                  href="https://github.com/anmolsharma99"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-3 border border-white/15 px-6 py-4 text-xs font-semibold tracking-wider text-white transition-colors hover:border-[#a855f7]/50 hover:text-purple-300"
                >
                  <FaGithub size={16} />
                  EXPLORE GITHUB
                </a>
              </div>
            </div>

            <div className="mono relative mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-5 text-[9px] tracking-widest text-gray-500">
              <span>CONNECTION: AWAITING INPUT</span>

              <span className="flex items-center gap-2">
                <TerminalIcon size={12} />
                END OF TRANSMISSION
              </span>
            </div>
          </div>
        </div>
        {profileOpen && (
  <div
    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
    onClick={() => setProfileOpen(false)}
  >
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-title"
      className="group relative max-h-[85vh] w-full max-w-lg animate-[profileEnter_0.45s_cubic-bezier(0.16,1,0.3,1)_both] overflow-y-auto rounded-2xl border border-[#00ff9c]/50 bg-[#05090e]/95 p-6 shadow-[0_0_25px_rgba(0,255,156,0.12),0_0_80px_rgba(0,255,156,0.08)] backdrop-blur-2xl sm:p-8"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setProfileOpen(false)}
        aria-label="Close profile"
        className="absolute right-4 top-4 text-xl text-gray-400 transition hover:text-[#00ff9c]"
      >
        ×
      </button>

      <p className="mono text-[10px] tracking-[0.25em] text-[#00ff9c]">
        &gt; PERSONAL PROFILE
      </p>

      <h2
        id="profile-title"
        className="mt-3 text-3xl font-bold text-white"
      >
        Anmol <span className="text-[#00ff9c]">Sharma.</span>
      </h2>

      <div className="mt-6 space-y-3">
        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="mono text-[10px] text-gray-500">DATE OF BIRTH</p>
          <p className="mt-1 text-sm text-white">24 December 2005</p>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4">
          <p className="mono text-[10px] text-gray-500">BIRTHPLACE</p>
          <p className="mt-1 text-sm text-white">Mathura, Uttar Pradesh</p>
        </div>

        <a
          href="tel:+919027361337"
          className="block rounded-lg border border-[#00ff9c]/20 bg-[#00ff9c]/[0.04] p-4 transition hover:border-[#00ff9c]/60 hover:shadow-[0_0_15px_rgba(0,255,156,0.1)]"
        >
          <p className="mono text-[10px] text-gray-500">PHONE</p>
          <p className="mt-1 text-sm text-[#00ff9c]">+91 90273 61337 ↗</p>
        </a>

        <a
          href="mailto:sharmaanmol8765@gmail.com"
          className="block rounded-lg border border-[#00ff9c]/20 bg-[#00ff9c]/[0.04] p-4 transition hover:border-[#00ff9c]/60 hover:shadow-[0_0_15px_rgba(0,255,156,0.1)]"
        >
          <p className="mono text-[10px] text-gray-500">EMAIL</p>
          <p className="mt-1 break-all text-sm text-[#00ff9c]">
            sharmaanmol8765@gmail.com ↗
          </p>
        </a>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <a
          href="https://github.com/anmolsharma99"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-[#00ff9c]/30 px-4 py-3 text-center text-xs font-semibold text-[#00ff9c] transition hover:bg-[#00ff9c]/10 hover:shadow-[0_0_15px_rgba(0,255,156,0.15)]"
        >
          GITHUB ↗
        </a>

        <a
          href="https://linkedin.com/in/anmol-sharma"
          target="_blank"
          rel="noreferrer"
          className="rounded-lg border border-cyan-400/30 px-4 py-3 text-center text-xs font-semibold text-cyan-300 transition hover:bg-cyan-400/10 hover:shadow-[0_0_15px_rgba(34,211,238,0.15)]"
        >
          LINKEDIN ↗
        </a>
      </div>

      <a
        href="/Anmol_BCA_Tech.pdf"
        download
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-[#00ff9c] px-4 py-4 text-xs font-bold tracking-wider text-black transition hover:shadow-[0_0_25px_rgba(0,255,156,0.3)]"
      >
        DOWNLOAD RESUME ↓
      </a>
    </div>
  </div>
)}
      </section>

      {/* FOOTER */}

      <footer className="relative z-10 border-t border-white/[0.07] px-5 py-7 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <a
            href="#home"
            className="mono text-sm font-bold text-white"
          >
            ANMOL
            <span className="text-[#00ff9c]">.SH</span>
          </a>

          <p className="mono text-center text-[9px] tracking-widest text-gray-500">
            DESIGNED TO BUILD. ENGINEERED TO EVOLVE.
          </p>

          <a
            href="#home"
            className="mono flex items-center gap-2 text-[10px] text-gray-500 transition-colors hover:text-[#00ff9c]"
          >
            BACK TO TOP
            <ArrowRight
              size={12}
              className="-rotate-90"
            />
          </a>
        </div>

        <p className="mono mt-5 text-center text-[9px] text-gray-500">
          © 2026 ANMOL SHARMA. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </main>
  );
}