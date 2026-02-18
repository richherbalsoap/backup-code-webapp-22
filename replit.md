# EDULinker

## Overview
EDULinker is a school/education management dashboard built with React + Vite. It provides features like student management, homework sending, result sending, fee reminders, analytics, announcements, complaint handling, AI chatbot, and promotion panels. All data is real (manually entered) and persisted in localStorage via Zustand.

## Recent Changes
- 2026-02-17: Major performance optimization - removed framer-motion from all pages (except login), replaced backdrop-blur-xl with backdrop-blur-md everywhere, removed mouse-tracking from GoldenBackground, added golden falling lines, React.memo on Sidebar/Header/GoldenBackground, useCallback on toggleSidebar, reduced heavy box-shadows and blur effects.
- 2026-02-17: Complete golden premium theme overhaul across all pages. Login keeps pink theme, all other pages use golden (#FFD700) theme with glass blur effects, golden outlines, black dropdown backgrounds. Replaced StarfieldAnimation with GoldenBackground component. Header made compact with maximum blur. Dashboard now has interactive real calendar. Standards updated to Nursery-12th, Sections A-E across all pages. Announcements standards fixed from Roman numerals to proper format.
- 2026-02-17: Removed all demo/fake data from all pages. Connected all pages to Zustand store with localStorage persistence. Analytics now dynamically computes from real results. AI Chatbot reads from store instead of marks.json.
- 2026-02-15: Imported from GitHub. Fixed syntax error in StudentManagementPage.jsx. Configured for Replit (port 5000, allowed hosts).

## Project Architecture
- **Framework**: React 18 with Vite 4
- **Styling**: Tailwind CSS 3 + Radix UI components
- **State**: Zustand with `persist` middleware (localStorage key: `edulinker-storage`)
- **Routing**: React Router DOM v7
- **Dev Server**: Vite on port 5000 (0.0.0.0)
- **Deployment**: Static build (dist/)
- **Background Animation**: GoldenBackground component (spotlight, grid, horizon ring)

### Key Directories
- `src/` - React source code
  - `components/` - Shared UI components (Header, Sidebar, Layout, GoldenBackground)
  - `pages/` - Page components (Dashboard, Login, Student Management, etc.)
  - `context/` - React contexts (Auth, App)
  - `store/` - Zustand store (appStore.js) - centralized state with persistence
  - `lib/` - Utility functions
- `plugins/` - Custom Vite plugins (visual editor, selection mode)
- `public/` - Static assets
- `tools/` - Build tools (LLMs text generator)

### Design Theme
- **Login page**: Pink accent (#ff1a75) with falling lines, spotlight, tech grid, horizon ring
- **All other pages**: Golden accent (#FFD700) with spotlight, tech grid, horizon ring (no falling lines)
- **Glass blur effect**: backdrop-blur-xl on all panels and forms
- **Dropdowns**: Black background with golden borders, scrollable with max-height
- **Standards**: Nursery, LKG, UKG, 1-12
- **Sections**: A, B, C, D, E

### Data Flow
- Students are added via Student Management page and stored in Zustand
- All pages (Complaints, Fees, Promotion, etc.) read student lists from the shared store
- Results are saved to store and used by Analytics page for dynamic calculations
- AI Chatbot queries store data client-side (no server API needed)

## User Preferences
- Pink accent color (#ff1a75) for login animation theme
- Golden accent color (#FFD700) for dashboard and all panels - premium feel
- Glass blur effects on all panels
- Black dropdown backgrounds with golden outlines
- No falling lines/star animation - just spotlight, grid, and horizon ring
- No demo/fake data - real production app with manual data entry
- Future: Tably AI integration for voice call on complaints
- Future: Connect with separate Replit app to share homework data
