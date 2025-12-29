<div align="center">
  <br />
  
  <h1>🎬 CineMind AI</h1>
  
  <div>
    <img src="https://img.shields.io/badge/-Next.js_16-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-Django_5.1-black?style=for-the-badge&logoColor=white&logo=django&color=092E20" alt="django" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-React_Query-black?style=for-the-badge&logoColor=white&logo=react&color=FF4154" alt="react-query" />
  </div>

  <h3 align="center">Intelligent Movie Discovery Platform with AI-Powered Recommendations</h3>

</div>

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [Core Tech Stack](#core-tech-stack)
3. [Architecture](#architecture)
4. [Key Features](#key-features)
5. [Getting Started](#getting-started)

## Introduction

**CineMind AI** is a full-stack movie discovery platform that combines modern web technologies with AI intelligence. The application uses LLM APIs (Groq, GitHub Models) and the TMDB API to deliver intelligent movie recommendations based on user preferences, while providing a responsive, type-safe user experience with Next.js and Django.

## Core Tech Stack

### Frontend Architecture
| Category | Technologies |
|----------|---|
| **Framework** | Next.js  (Turbopack), React  with TypeScript |
| **State Management** | TanStack React Query  |
| **UI Components** | shadcn/ui (Radix UI), Material-UI, Lucide Icons |
| **Styling** | Tailwind CSS , Framer Motion |
| **HTTP Client** | Axios with custom interceptors |
| **Utilities** | React-use hooks, Class Variance Authority |

### Backend Architecture
| Category | Technologies |
|----------|---|
| **Framework** | Django , Django REST Framework |
| **Database** | SQLite (dev), PostgreSQL-ready |
| **AI/LLM Providers** | Groq API, GitHub Models (OpenAI-compatible), Google Generative AI |
| **External APIs** | TMDB API |
| **Middleware** | Django CORS Headers, WhiteNoise, Gunicorn |
| **Config Management** | Python-decouple |

### APIs & Integrations
- **TMDB API**: Movie data, cast information, recommendations, trending content
- **Groq LLM**: Fast inference for AI recommendations (Llama 3.1)
- **GitHub Models API**: OpenAI-compatible GPT-4o integration
- **Google Generative AI**: Alternative LLM provider

## Architecture

### Frontend Components
- **Reusable UI Components**: Custom buttons, cards, carousels, chat bubbles, expandable chat
- **Custom Hooks**: `useAuthGate`, `useNotification`, `useSavedMovies`, `use-auto-scroll`
- **Smart Pages**: Authentication routes, movie details with cast, recommendations, saved movies list
- **React Query Integration**: Server state management with devtools for debugging

### Backend Services
```
core/services/
  ├── ai_engine.py       → Weighted user profile analysis & preference scoring
  ├── llm_providers.py   → Multi-LLM provider abstraction (Groq, GitHub, Google)
  ├── tmdb.py           → TMDB API wrapper with caching
  └── search.py         → Trending search aggregation
```

## Key Features

✨ **AI-Powered Recommendations**
- Weighted user profile analysis (loved, saved, liked, hated movies)
- Multi-LLM support with fallback mechanisms
- Context-aware movie suggestions based on interaction history

🔍 **Smart Search & Discovery**
- Real-time search with debouncing (React-use)
- Trending movies with algorithm-based ranking
- Trending search tracking and analytics

🎬 **Rich Movie Information**
- Comprehensive details: ratings, runtime, release dates, overviews
- Cast carousels with profile images
- Movie recommendations carousel per title
- Pagination for large datasets

💾 **User Interactions**
- Save movies to personal watchlist
- Star rating system (1-5 scale)
- Movie interaction tracking with weighted preferences
- User avatar support

🎨 **Modern UI/UX**
- Responsive design (mobile-first)
- Smooth animations (Framer Motion)
- Custom carousels (Embla Carousel)
- Dark/Light theme support
- Type-safe components (TypeScript)







