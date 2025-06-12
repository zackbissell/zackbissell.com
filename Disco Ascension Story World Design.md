# Disco Ascension – A Disco House Paradox: Story World Design

This document outlines the immersive web experience for **Disco Ascension**, merging disco mythology with a sci‑fi conspiracy theme. It expands on the PDFs included in this repository and is intended as a practical reference for implementation.

## 1. Narrative & Aesthetic Vision
- **Mood:** Dark and mysterious, echoing classified government files with neon‑amber and warning‑red accents.
- **Core Story:** The page chronicles a series of anomalous incidents during Zack Bissell's DJ set. Key moments include a *Disco Ball Manifestation*, *Peak Paradox Event*, *Groove Singularity* (all witnesses in perfect sync), and a final *Containment Breach*.
- **Inspirations:** The Montauk Project, X‑Files, 70s/80s retro‑futurism, declassified dossiers, and classic disco/house lore.

## 2. Visual Language
- **Palette:** Dark backgrounds with amber (#FFC107 range) and stark warning‑red highlights. Occasional tech‑console neon‑green text.
- **Typography:** Large bold headings paired with monospace blocks for terminal‑style text.
- **Icons:** Use Lucide React icons such as `AlertTriangle`, `Clock`, `FileText`, and `Radio`.
- **Textures:** Glitch effects, CRT overlays, redacted text snippets, and graph‑paper style backgrounds. Animated starfields can reinforce the retro‑sci‑fi vibe.

## 3. Interactive Elements
- **Incident Timeline:** Overlay time‑stamped entries on the audio timeline; syncing with playback when possible.
- **Classified Files Toggle:** Button labelled "Access Classified Research Files" reveals a terminal‑styled log panel with detailed incident reports.
- **Leaked File Links:** Styled links trigger an "Access Denied" alert when clicked.
- **Animations:** Glitch keyframes for headings, scroll‑reveal effects via Framer Motion, and subtle hover states for interactive elements.

## 4. Layout & Components
1. **Hero Section** – Features a `CLASSIFIED MATERIAL` banner, the gradient title "DISCO ASCENSION", and a warning box about anomalous frequencies.
2. **Audio Player** – Card titled "The Last Known Copy" with a large play button and a blurred placeholder for the future SoundCloud/Mixcloud embed.
3. **Conspiracy Files** – Toggleable terminal panel that lists the incident log.
4. **Tracklist** – Translucent card titled "Declassified Tracklist" with numbered entries. Some tracks are redacted to maintain the conspiratorial tone.
5. **Share CTA** – Final call‑to‑action with buttons "Share the Anomaly" and "Report to Authorities".

Each section is structured as a centered container with generous vertical spacing (e.g., `max-w-4xl mx-auto py-12`).

## 5. Copy Guidelines
- Maintain a tongue‑in‑cheek conspiratorial voice blending DJ vernacular with sci‑fi bureaucracy. Example warning: `LISTEN WITH CAUTION: This transmission contains anomalous temporal frequencies...`
- Mention ETAB (European Temporal Anomalies Bureau) and leaked Pioneer AlphaTheta memos, including lines like `Mochakk didn't touch the Key Sync at all`.
- The tracklist should display warnings about temporal inconsistencies and include redacted entries labelled `CLASSIFIED`.

## 6. Codex Integration Notes
- Components are built with React and Tailwind CSS. Use `useState` to manage the visibility of toggleable sections.
- Example prompt for Codex:
  > Generate a React component for the Disco Ascension hero section with Tailwind CSS. Include an alert banner with `AlertTriangle`, a gradient title from amber to red, and a red warning box describing anomalous frequencies.
- Structure the code so new incidents or leaked files can be appended easily without redesigning the page.

