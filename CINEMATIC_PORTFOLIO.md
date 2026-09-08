# Cinematic portfolio

The homepage is implemented in `src/components/CinematicPortfolio.tsx`, with base styles in `cinematic-portfolio.css` and the immersive scene design in `studio-experience.css`. Manal's existing services, six projects, career history, and social links are preserved in `portfolio-data.ts`. The existing AI chat remains connected to its original API. All changes are local.

## Scroll choreography

- `StudioIntro.tsx` pins a viewport for a three-part introduction: oversized name reveal with a chrome ribbon, a rotating laptop entrance, then a dolly-like screen approach and fade into the next section.
- `three/StudioScene.tsx` authors the twisted ribbon geometry and laptop (chassis, keys, trackpad, hinge and textured screen) in code. Reflections use locally constructed lightformers, without external models or environment downloads.
- `StudioMotion.tsx` adds a scroll-reactive typography bridge, orbital decoration, moving marquee, cursor light and page progress.
- `StudioProjects.tsx` presents all six projects as scroll-controlled full-screen chapters. Device frames rotate in perspective as scenes enter and leave. Screens pan with scroll, mobile projects use phone frames, and numbered controls jump between chapters.
- Reduced-motion users receive a static hero and a normal vertical project list. Inactive project chapters are inert so keyboard focus cannot enter invisible scenes.

## Project recordings

Project scenes animate the existing interfaces inside newly authored device frames. To add a recording to a project detail dialog, place an optimized MP4 or WebM file in `public/projects/` and add `video: '/projects/your-demo.mp4'` to the corresponding project in `portfolio-data.ts`.

The shared media component uses the screenshot as a poster, loads the video near the viewport, plays muted and looping on hover/focus or while its detail dialog is open, and pauses when inactive or off-screen. Reduced-motion users see the poster. Prefer short 720p/1080p recordings encoded for web playback, without audio tracks. No unrelated stock demos are substituted for actual projects.

## Behavior and performance

- Framer Motion handles text reveals, section entrances, counters, and magnetic controls.
- Lenis coordinates smooth scrolling with GSAP ScrollTrigger for timeline progress; Framer Motion maps scroll progress directly into the intro and project scenes.
- The Three.js scene is lazy loaded, limited to 1.5 device pixel ratio, and stops rendering outside the hero. A rendering boundary protects the page on devices without usable WebGL. Reflections render once; the custom ribbon geometry is disposed on unmount.
- Reduced-motion settings disable smooth scrolling, continuous CSS animations, video playback, and the 3D scene.
- Project dialogs support Escape, an explicit close button, and focus restoration. Mobile navigation and native form validation are keyboard accessible.
- The contact form prepares a `mailto:` draft; the visitor must send it through their email client. It does not claim delivery or require a new backend.

## Validation

`npm run build` and `npx tsc --noEmit` validate the application. Browser checks covered desktop and 390px mobile layouts, project dialogs, horizontal navigation, mobile menu, reduced-motion behavior, contact validation, and opening AI chat. AI responses require the existing server credentials and were not sent during UI validation. Frame-rate performance has not been measured across physical devices.

For isolated validation alongside an existing Next.js server, set `NEXT_BUILD_DIR` to `.next-verify` (development) or `.next-production` (build), then use an unused port. Both caches are ignored by Git. The existing Google-hosted Inter font requires network access during a fresh build.
