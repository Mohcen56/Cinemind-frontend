<div align="center">
  <br />
  
  # 🎬 CineMind AI - Frontend
  
  <div>
    <img src="https://img.shields.io/badge/-Next.js_16-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-React_19-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS_4-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logoColor=white&logo=reactquery&color=FF4154" alt="react-query" />
  </div>

  <h3 align="center">✨ Modern Movie Discovery UI with AI-Powered Chat Assistant</h3>

  <br />

  <div>
    <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat-square&logo=shadcnui&logoColor=white" alt="shadcn" />
    <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" alt="framer" />
    <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" alt="axios" />
    <img src="https://img.shields.io/badge/Radix_UI-161618?style=flat-square&logo=radixui&logoColor=white" alt="radix" />
    <img src="https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white" alt="mui" />
  </div>

</div>

---

## 📋 Table of Contents

- [🎯 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [📦 Tech Stack](#-tech-stack)
- [🧩 Component Structure](#-component-structure)
- [🪝 Custom Hooks](#-custom-hooks)
- [🎨 Key Features](#-key-features)
- [⚡ Getting Started](#-getting-started)
- [📂 Project Structure](#-project-structure)

---

## 🎯 Overview

The **CineMind Frontend** is a modern, responsive React application built with Next.js 16 and TypeScript. It provides an intuitive interface for movie discovery, featuring an AI-powered chat assistant, real-time search, and personalized recommendations.

### ✨ Highlights

- ⚡ **Next.js 16** with Turbopack for blazing-fast development
- 🎨 **shadcn/ui + Tailwind CSS 4** for beautiful, accessible components
- 🔄 **TanStack React Query** for intelligent server state management
- 💬 **AI Chat Assistant** with expandable chat interface
- 🎭 **Framer Motion** for smooth, delightful animations
- 📱 **Mobile-First** responsive design

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          🎬 CineMind Frontend                               │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        📱 App Shell (layout.tsx)                     │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────────┐  │   │
│  │  │ 🔔 Notif    │  │ 💬 Chat     │  │ 🔄 Query                    │  │   │
│  │  │ Provider    │  │ Provider    │  │ Provider (React Query)      │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         📄 Pages (App Router)                        │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │ 🏠 Home  │  │ 🎬 Movie │  │ 💾 Saved │  │ 🔐 Auth  │            │   │
│  │  │ page.tsx │  │ [id]/    │  │ page.tsx │  │ login/   │            │   │
│  │  │          │  │ page.tsx │  │          │  │ signup/  │            │   │
│  │  └──────────┘  └──────────┘  └──────────┘  └──────────┘            │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                       🧩 Components Library                          │   │
│  │                                                                      │   │
│  │  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐     │   │
│  │  │  🎬 movies/     │  │  🎭 movie-info/ │  │  💾 saved/      │     │   │
│  │  │  ├ MovieCard    │  │  ├ CastGrid     │  │  └ SavedMovies  │     │   │
│  │  │  ├ Search       │  │  ├ StarRating   │  │     List        │     │   │
│  │  │  ├ Trending     │  │  ├ Interactions │  │                 │     │   │
│  │  │  │  Carousel    │  │  └ Recommend    │  │                 │     │   │
│  │  │  └ Assistant    │  │     Carousel    │  │                 │     │   │
│  │  │     Chat        │  │                 │  │                 │     │   │
│  │  └─────────────────┘  └─────────────────┘  └─────────────────┘     │   │
│  │                                                                      │   │
│  │  ┌─────────────────────────────────────────────────────────────┐   │   │
│  │  │                    🎨 ui/ (shadcn/ui)                        │   │   │
│  │  │  button · card · avatar · carousel · chat-input · ChatBubble │   │   │
│  │  │  ChatMessageList · expandable-chat · input · separator · ... │   │   │
│  │  └─────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         🪝 Hooks & Utils                             │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌───────────┐  │   │
│  │  │ useAuthGate │  │ useNotif    │  │ useSaved    │  │ useAuto   │  │   │
│  │  │             │  │ ication     │  │ Movies      │  │ Scroll    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  └───────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
│                                    ▼                                        │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        🌐 API Layer (lib/api/)                       │   │
│  │              Axios Interceptors · React Query · Error Handling       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                    │                                        │
└────────────────────────────────────┼────────────────────────────────────────┘
                                     │
                                     ▼
                          ┌─────────────────────┐
                          │   🔌 Backend API    │
                          │   (Django REST)     │
                          └─────────────────────┘
```

---

## 📦 Tech Stack

### 🎯 Core Framework

| Technology | Version | Purpose |
|------------|---------|---------|
| **Next.js** | 16.x | React framework with App Router |
| **React** | 19.x | UI library |
| **TypeScript** | 5.x | Type-safe development |
| **Turbopack** | Built-in | Fast bundler |

### 🎨 UI & Styling

| Technology | Purpose |
|------------|---------|
| **Tailwind CSS 4** | Utility-first styling |
| **shadcn/ui** | Accessible component primitives |
| **Radix UI** | Headless UI components |
| **Material-UI** | Additional components & icons |
| **Framer Motion** | Animations & transitions |
| **Lucide Icons** | Beautiful icon library |
| **Embla Carousel** | Touch-friendly carousels |

### 🔄 State & Data

| Technology | Purpose |
|------------|---------|
| **TanStack React Query** | Server state management |
| **Axios** | HTTP client with interceptors |
| **React-use** | Utility hooks (debounce, etc.) |

### 🛠️ Utilities

| Technology | Purpose |
|------------|---------|
| **Class Variance Authority** | Component variants |
| **clsx + tailwind-merge** | Conditional class merging |
| **tw-animate-css** | Animation utilities |

---

## 🧩 Component Structure

### 🎬 Movie Components (`components/movies/`)

```
┌─────────────────────────────────────────────────────────────┐
│                     🎬 Movie Components                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐       ┌─────────────────────────────┐ │
│  │   🎴 MovieCard  │       │     🔍 Search               │ │
│  │                 │       │                             │ │
│  │  • Poster       │       │  • Real-time search input   │ │
│  │  • Title        │       │  • Debounced API calls      │ │
│  │  • Rating       │       │  • Auto-suggestions         │ │
│  │  • Save button  │       │  • Trending integration     │ │
│  │  • Hover effects│       │                             │ │
│  └─────────────────┘       └─────────────────────────────┘ │
│                                                             │
│  ┌─────────────────┐       ┌─────────────────────────────┐ │
│  │ 📈 Trending     │       │  💬 MovieAssistantChat      │ │
│  │    Carousel     │       │                             │ │
│  │                 │       │  • Expandable chat UI       │ │
│  │  • Auto-scroll  │       │  • AI recommendations       │ │
│  │  • Touch support│       │  • Message bubbles          │ │
│  │  • Embla powered│       │  • Context-aware            │ │
│  └─────────────────┘       └─────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🎭 Movie Info Components (`components/movie-info/`)

```
┌─────────────────────────────────────────────────────────────┐
│                   🎭 Movie Info Components                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐       ┌─────────────────────────────┐ │
│  │  👥 CastGrid    │       │   ⭐ StarRating             │ │
│  │                 │       │                             │ │
│  │  • Actor cards  │       │  • 1-5 star rating          │ │
│  │  • Profile pics │       │  • 0.5 increments           │ │
│  │  • Character    │       │  • Interactive hover        │ │
│  │    names        │       │  • Persisted to backend     │ │
│  └─────────────────┘       └─────────────────────────────┘ │
│                                                             │
│  ┌─────────────────┐       ┌─────────────────────────────┐ │
│  │ 🎬 Recommend    │       │  💾 MovieInteractions       │ │
│  │    Carousel     │       │                             │ │
│  │                 │       │  • Save/unsave toggle       │ │
│  │  • Similar films│       │  • Rating display           │ │
│  │  • TMDB powered │       │  • Interaction state        │ │
│  │  • Click to view│       │  • Optimistic updates       │ │
│  └─────────────────┘       └─────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 🎨 UI Components (`components/ui/`)

| Component | Description |
|-----------|-------------|
| `button.tsx` | Variant-based button with CVA |
| `card.tsx` | Container with header, content, footer |
| `avatar.tsx` | User profile pictures |
| `carousel.tsx` | Embla-powered carousel wrapper |
| `chat-input.tsx` | AI chat input field |
| `ChatBubble.tsx` | Message bubble (user/AI) |
| `ChatMessageList.tsx` | Scrollable message container |
| `expandable-chat.tsx` | Collapsible chat panel |
| `input.tsx` | Styled form inputs |
| `separator.tsx` | Visual dividers |

---

## 🪝 Custom Hooks

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            🪝 Custom Hooks                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔐 useAuthGate                                                      │   │
│  │  ────────────────────────────────────────────────────────────────    │   │
│  │  Protects routes requiring authentication                           │   │
│  │  • Redirects to login if unauthenticated                            │   │
│  │  • Returns loading state during auth check                          │   │
│  │  • Integrates with token-based auth                                 │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  🔔 useNotification                                                  │   │
│  │  ────────────────────────────────────────────────────────────────    │   │
│  │  Global notification/toast system                                   │   │
│  │  • Success, error, info, warning types                              │   │
│  │  • Auto-dismiss with configurable duration                          │   │
│  │  • Queue management for multiple toasts                             │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  💾 useSavedMovies                                                   │   │
│  │  ────────────────────────────────────────────────────────────────    │   │
│  │  Manages user's watchlist/saved movies                              │   │
│  │  • Fetch saved movies with React Query                              │   │
│  │  • Toggle save state with optimistic updates                        │   │
│  │  • Cache invalidation on mutations                                  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  📜 use-auto-scroll                                                  │   │
│  │  ────────────────────────────────────────────────────────────────    │   │
│  │  Auto-scrolls chat messages to bottom                               │   │
│  │  • Smooth scroll behavior                                           │   │
│  │  • Triggers on new message                                          │   │
│  │  • Respects user scroll position                                    │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Key Features

### 💬 AI Chat Assistant

```
┌─────────────────────────────────────────┐
│  🤖 AI Movie Assistant                  │
├─────────────────────────────────────────┤
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 👤 "Recommend me something      │   │
│  │     like Inception"             │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 🤖 Based on your love for       │   │
│  │ mind-bending thrillers, try:    │   │
│  │                                 │   │
│  │ • Interstellar (2014)           │   │
│  │ • Tenet (2020)                  │   │
│  │ • The Prestige (2006)           │   │
│  └─────────────────────────────────┘   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │ 💬 Type your message...    [➤] │   │
│  └─────────────────────────────────┘   │
└─────────────────────────────────────────┘
```

- 🎯 **Context-Aware** - Uses your ratings & watchlist
- ⚡ **Real-time** - Instant AI responses
- 📱 **Expandable UI** - Minimizes to corner button
- 🎨 **Beautiful Bubbles** - User/AI message styling

### 🔍 Smart Search

- ⌨️ **Debounced Input** - React-use powered
- 📈 **Trending Suggestions** - Popular searches
- 🔄 **Real-time Results** - Instant feedback
- 📊 **Search Analytics** - Tracks trending terms

### 🎬 Movie Discovery

- 🎴 **Beautiful Cards** - Poster, rating, actions
- 📈 **Trending Carousel** - Weekly hot movies
- 👥 **Cast Information** - Actor grids with photos
- 🎬 **Recommendations** - Similar movies carousel

### 💾 User Features

- ⭐ **Star Ratings** - 1-5 with 0.5 increments
- 📌 **Save to Watchlist** - Quick save toggle
- 👤 **User Profiles** - Avatar support
- 🔐 **Authentication** - Token-based auth

### 🎨 UI/UX Excellence

- 📱 **Mobile-First** - Responsive on all devices
- 🌊 **Smooth Animations** - Framer Motion
- 🎠 **Touch Carousels** - Embla-powered
- ♿ **Accessible** - Radix UI primitives

---

## ⚡ Getting Started

### 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see [Backend README](../Backend/README.md))

### 🛠️ Installation

```bash
# 1. Navigate to frontend directory
cd Frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local

# 4. Configure API URL in .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000/api

# 5. Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 📂 Project Structure

```
Frontend/
├── 📄 package.json              # Dependencies & scripts
├── 📄 next.config.ts            # Next.js configuration
├── 📄 tsconfig.json             # TypeScript config
├── 📄 tailwind.config.ts        # Tailwind CSS config
├── 📄 components.json           # shadcn/ui config
│
├── 📁 public/                   # Static assets
│   ├── icons/                   # App icons
│   └── readme/                  # README images
│
└── 📁 src/
    ├── 📁 app/                  # 📱 Next.js App Router
    │   ├── layout.tsx           # Root layout + providers
    │   ├── page.tsx             # 🏠 Home page
    │   │
    │   ├── 📁 (auth)/           # 🔐 Auth routes (grouped)
    │   │   ├── login/
    │   │   └── signup/
    │   │
    │   ├── 📁 movie/[id]/       # 🎬 Dynamic movie pages
    │   │
    │   ├── 📁 saved/            # 💾 Saved movies page
    │   │
    │   └── 📁 hooks/            # Page-specific hooks
    │       ├── useAuthGate.ts
    │       ├── useNotification.ts
    │       └── useSavedMovies.ts
    │
    ├── 📁 components/           # 🧩 React Components
    │   ├── Pagination.tsx
    │   ├── Spinner.tsx
    │   │
    │   ├── 📁 movies/           # 🎬 Movie-related
    │   │   ├── MovieCard.tsx
    │   │   ├── MovieAssistantChat.tsx
    │   │   ├── Search.tsx
    │   │   └── TrendingCarousel.tsx
    │   │
    │   ├── 📁 movie-info/       # 🎭 Movie detail page
    │   │   ├── CastGrid.tsx
    │   │   ├── MovieInteractions.tsx
    │   │   ├── RecommendationsCarousel.tsx
    │   │   └── StarRating.tsx
    │   │
    │   ├── 📁 saved/            # 💾 Saved movies
    │   │   └── SavedMoviesList.tsx
    │   │
    │   ├── 📁 ui/               # 🎨 shadcn/ui components
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── avatar.tsx
    │   │   ├── carousel.tsx
    │   │   ├── chat-input.tsx
    │   │   ├── ChatBubble.tsx
    │   │   ├── ChatMessageList.tsx
    │   │   ├── expandable-chat.tsx
    │   │   └── ...
    │   │
    │   ├── 📁 user/             # 👤 User components
    │   │
    │   └── 📁 hooks/            # 🪝 Component hooks
    │       └── use-auto-scroll.tsx
    │
    ├── 📁 hooks/                # 🪝 Global hooks
    │   ├── useAuthGate.ts
    │   └── useNotification.ts
    │
    ├── 📁 lib/                  # 🔧 Utilities
    │   ├── react-query.ts       # React Query config
    │   ├── 📁 api/              # API client functions
    │   └── 📁 utils/            # Helper functions
    │
    ├── 📁 providers/            # 🔄 Context Providers
    │   ├── ChatProvider.tsx
    │   ├── NotificationProvider.tsx
    │   └── QueryProvider.tsx
    │
    ├── 📁 styles/               # 🎨 Global styles
    │   ├── globals.css
    │   └── App.css
    │
    └── 📁 types/                # 📝 TypeScript types
        ├── movie.ts
        ├── movieDetail.ts
        └── User.ts
```

---

## 🔗 Related

- 🔙 [Backend README](../Backend/README.md) - Django REST API documentation
- 📖 [Deployment Guide](../Backend/DEPLOYMENT.md) - Production deployment

---

<div align="center">
  
  **Built with ❤️ using Next.js, React & TypeScript**
  
  ⭐ Star this repo if you found it helpful!
  
</div>







