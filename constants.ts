
import { Step, MissionPath } from './types';

export const STEPS: Step[] = [
  {
    id: 0,
    path: MissionPath.HOME,
    title: "Welcome to VibeCode",
    description: "Build websites with AI vibes - no coding required. Start your journey today.",
    command: "vibecode start --tutorial"
  },
  {
    id: 1,
    path: MissionPath.STEP1,
    title: "Define Your Goal & Vibe",
    description: "Start with purpose. Describe your vibe and let AI translate it into structure.",
    command: "ai prompt: 'Help me create a structure for my website'"
  },
  {
    id: 2,
    path: MissionPath.STEP2,
    title: "Generate Content with AI",
    description: "Use AI tools to create text, images, and copy without writing a single line.",
    command: "ai prompt: 'Write engaging content for my site'"
  },
  {
    id: 3,
    path: MissionPath.STEP3,
    title: "Design Layouts & Graphics",
    description: "Create stunning visuals with Canva and DALL-E. No design skills needed.",
    command: "ai prompt: 'Create a logo for my wellness brand'"
  },
  {
    id: 4,
    path: MissionPath.STEP4,
    title: "Build Website Structure",
    description: "Use no-code AI builders like Wix ADI to bring your vision to life.",
    command: "wix-adi create --from-vibe"
  },
  {
    id: 5,
    path: MissionPath.STEP5,
    title: "Add Advanced Features",
    description: "Integrate auth, storage, and uploads with Firebase - using AI prompts.",
    command: "ai prompt: 'Connect my site to Firebase'"
  },
  {
    id: 6,
    path: MissionPath.STEP6,
    title: "Host & Launch for Free",
    description: "Get your site online with free hosting. No bandwidth limits.",
    command: "deploy --host infinityfree"
  },
  {
    id: 7,
    path: MissionPath.STEP7,
    title: "Optimize for SEO",
    description: "Make your site discoverable. Add keywords and track your traffic.",
    command: "seo analyze --optimize"
  },
  {
    id: 8,
    path: MissionPath.STEP8,
    title: "Iterate & Scale",
    description: "Keep improving with AI. Share, get feedback, and grow your vibe.",
    command: "vibecode evolve --continuous"
  }
];
