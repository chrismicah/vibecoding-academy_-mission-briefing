
import { Step, MissionPath } from './types';

export const STEPS: Step[] = [
  {
    id: 0,
    path: MissionPath.HOME,
    title: "The Semantic Developer",
    description: "Build professional websites by talking, not coding. Welcome to the era of Vibe Coding.",
    command: "claude"
  },
  {
    id: 1,
    path: MissionPath.STEP1,
    title: "Understand Your Tools",
    description: "The Terminal is your cockpit. Git is your time machine. Cursor is your workspace.",
    command: "claude"
  },
  {
    id: 2,
    path: MissionPath.STEP2,
    title: "Install Your Toolchain",
    description: "Set up Node.js, Git, and Claude Code on Windows or Mac in minutes.",
    command: "curl -fsSL https://claude.ai/install.sh | bash"
  },
  {
    id: 3,
    path: MissionPath.STEP3,
    title: "Set Up Your IDE",
    description: "Download Cursor — the AI-native code editor. Create your project folder and open it.",
    command: "cursor my-website"
  },
  {
    id: 4,
    path: MissionPath.STEP4,
    title: "Find Design Inspiration",
    description: "Browse Dribbble for designs you love. Screenshot your favorites to build a mood board.",
    command: "dribbble.com → screenshot → save to Desktop"
  },
  {
    id: 5,
    path: MissionPath.STEP5,
    title: "The Architect Phase",
    description: "Turn your screenshots into a spec doc. Give Claude your vision, get a blueprint.",
    command: "Generate a detailed design spec for a personal portfolio website..."
  },
  {
    id: 6,
    path: MissionPath.STEP6,
    title: "Initialize Your Project",
    description: "Authenticate Claude and set up your AI's long-term memory with CLAUDE.md.",
    command: "cd ~/Desktop/my-website && claude"
  },
  {
    id: 7,
    path: MissionPath.STEP7,
    title: "Build with Vibe Coding",
    description: "The construction loop: Prompt, Preview, Refine. Build your entire site with natural language.",
    command: "Using the design-spec.md, generate a basic HTML structure..."
  },
  {
    id: 8,
    path: MissionPath.STEP8,
    title: "How to Run Your Site",
    description: "Create a reusable run command so you never have to remember technical steps again.",
    command: "Refer to how_to_run.md to run this"
  },
  {
    id: 9,
    path: MissionPath.STEP9,
    title: "Version Control",
    description: "Save your progress like video game checkpoints. Push to the cloud with natural language.",
    command: "Set up a new Git repo here and add all files."
  },
  {
    id: 10,
    path: MissionPath.STEP10,
    title: "Deploy to the World",
    description: "Go from localhost to a live URL in one command. Deploy with Vercel.",
    command: "vercel --prod"
  },
  {
    id: 11,
    path: MissionPath.STEP11,
    title: "Mastery & Troubleshooting",
    description: "Handle errors, understand costs, and level up your semantic development skills.",
    command: "/compact"
  },
  {
    id: 12,
    path: MissionPath.STEP12,
    title: "The Art of Refinement",
    description: "Master the design layers, find the wow factor, and embrace continuous iteration.",
    command: "Compare my site to the reference. What's still different?"
  }
];
