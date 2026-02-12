# Feature Context: vibecode-tutorial-site

## Feature Description
Refactor the existing "Vibecoding Academy" React site into the complete "VibeCode" edtech platform as specified in design_doc.md. The site teaches "vibecoding" - building websites with AI tools without deep technical knowledge.

## Current Codebase Architecture

### Tech Stack
- **React 19.2.3** with TypeScript
- **Vite** for bundling
- **Framer Motion 12.29.0** for animations
- **React Router DOM 7.13.0** (HashRouter)
- **Lucide React** for icons
- **Tailwind CSS** (via CDN)
- **Fonts**: Inter + Space Grotesk

### File Structure
```
/
├── App.tsx              # Main app with AnimatedRoutes
├── index.tsx            # React entry point
├── index.html           # HTML template with Tailwind CDN
├── constants.ts         # STEPS array defining pages
├── types.ts             # Step interface & MissionPath enum
├── components/
│   ├── Starfield.tsx    # Animated star background
│   ├── Terminal.tsx     # Terminal command display
│   └── Navigation.tsx   # Progress bar + nav buttons
├── pages/
│   ├── Home.tsx         # Landing page
│   ├── Step1.tsx        # "The Gear" page
│   ├── Step2.tsx        # "The Blueprint" page
│   └── Step3.tsx        # "The Launch" page
└── design_doc.md        # Target specification
```

## Key Source Files Analysis

| File | Purpose | Key Patterns |
|------|---------|--------------|
| `App.tsx:14-27` | AnimatedRoutes with AnimatePresence | Route definitions need updating for new pages |
| `constants.ts:4-33` | STEPS array | Drives navigation, terminal commands, page data |
| `types.ts:2-15` | Step interface + MissionPath enum | Add new paths for Steps 4-8 |
| `Navigation.tsx:27-41` | Progress indicator | Auto-scales with STEPS array |
| `pages/Home.tsx` | Hero page pattern | Template for homepage refactor |
| `pages/Step1.tsx` | Step page pattern | Template for tutorial pages |

## Page Structure Patterns

### Current Page Template (from Step1.tsx)
```tsx
<div className="min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-40 text-center">
  <motion.div initial/animate/exit/transition>
    <Icon />
    <h2>Title</h2>
    <p>Description</p>
    <ContentSection />
    <Terminal command={} />
  </motion.div>
</div>
```

### Animation Pattern
- Entry: `initial={{ opacity: 0, x: 50 }}`
- Active: `animate={{ opacity: 1, x: 0 }}`
- Exit: `exit={{ opacity: 0, x: -50 }}`

## Target Pages (from design_doc.md)

| # | Current | Target URL | Target Title | Key Content |
|---|---------|------------|--------------|-------------|
| 0 | Home | `/` | Welcome to VibeCode | Hero, video embed, testimonials, CTA |
| 1 | Step1 (Gear) | `/step-1-planning` | Define Your Goal & Vibe | Brainstorm purpose, AI prompts |
| 2 | Step2 (Blueprint) | `/step-2-content` | Generate Content with AI | Copy.ai, ChatGPT prompts |
| 3 | Step3 (Launch) | `/step-3-design` | Design Layouts & Graphics | Canva, DALL-E, logos |
| 4 | NEW | `/step-4-build` | Build Website Structure | Wix ADI, Durable AI |
| 5 | NEW | `/step-5-advanced` | Add Advanced Features | Firebase, auth, storage |
| 6 | NEW | `/step-6-host` | Host and Launch for Free | InfinityFree, deployment |
| 7 | NEW | `/step-7-optimize` | Optimize for SEO | SurferSEO, analytics |
| 8 | NEW | `/step-8-iterate` | Iterate and Scale | Updates, monetization |

## React Bits Integration Notes

From design_doc.md, these React Bits components are mentioned:
- **SplashCursor**: Interactive cursor effects
- **Background Studio**: Animated hero backgrounds
- **Shape Magic**: Custom section borders
- **Texture Lab**: Image effects/previews
- **Animated buttons**: CTA interactions
- **Animated graphics**: Various visual effects

Installation: `npm install react-bits`

## Implementation Guidance

### Phase 1: Core Structure Updates
1. Update `types.ts` with new MissionPath enum values (8 steps + home)
2. Update `constants.ts` with new STEPS array content
3. Update `App.tsx` routes to match new paths

### Phase 2: Refactor Existing Pages
4. Refactor `Home.tsx` to VibeCode homepage (hero, testimonials, video)
5. Refactor `Step1.tsx` to "Define Your Goal & Vibe" content
6. Refactor `Step2.tsx` to "Generate Content with AI" content
7. Refactor `Step3.tsx` to "Design Layouts & Graphics" content

### Phase 3: Create New Pages
8. Create `Step4.tsx` - Build Website Structure
9. Create `Step5.tsx` - Add Advanced Features
10. Create `Step6.tsx` - Host and Launch
11. Create `Step7.tsx` - Optimize for SEO
12. Create `Step8.tsx` - Iterate and Scale

### Phase 4: Enhancements
13. Update `index.html` title/meta for VibeCode branding
14. Consider React Bits integration (optional enhancement)

## UI/Content Style Notes

- **Tone**: Beginner-friendly, encouraging, non-technical
- **Visual**: Keep dark theme, starfield, terminal aesthetic
- **Content**: AI prompts, tool recommendations, step-by-step guides
- **Icons**: Use Lucide icons matching each step's theme
