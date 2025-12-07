<div align="center">
  <br />
  
  <h1>🎬 CineMind</h1>
  
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="next.js" />
    <img src="https://img.shields.io/badge/-Django-black?style=for-the-badge&logoColor=white&logo=django&color=092E20" alt="django" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
  </div>

  <h3 align="center">A Modern Movie Discovery Platform</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)

## <a name="introduction">🤖 Introduction</a>

CineMind is a full-stack movie discovery platform built with Next.js 16 for the frontend and Django for the backend. Users can browse trending movies, search for titles, explore detailed movie information including cast and recommendations, all powered by the TMDB API. The application features a responsive design with a modern UI and tracks trending searches to surface popular content.

## <a name="tech-stack">⚙️ Tech Stack</a>

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React framework with server-side rendering, routing, and optimized builds using Turbopack
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript for better developer experience and code quality
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework for rapid UI development
- **[shadcn/ui](https://ui.shadcn.com/)** - Re-usable component library built with Radix UI and Tailwind CSS
- **[Axios](https://axios-http.com/)** - Promise-based HTTP client for API requests
- **[React-use](https://github.com/streamich/react-use)** - Collection of essential React hooks including debouncing

### Backend
- **[Django 5.1](https://www.djangoproject.com/)** - High-level Python web framework for rapid development
- **[Django REST Framework](https://www.django-rest-framework.org/)** - Powerful toolkit for building Web APIs
- **[Django CORS Headers](https://github.com/adamchainz/django-cors-headers)** - Handles Cross-Origin Resource Sharing
- **[Python-decouple](https://github.com/HBNetwork/python-decouple)** - Environment variable management
- **[SQLite](https://www.sqlite.org/)** - Lightweight database for development (easily replaceable with PostgreSQL/MySQL for production)

### APIs
- **[TMDB API](https://www.themoviedb.org/documentation/api)** - The Movie Database API for movie data, posters, cast information, and recommendations


## <a name="features">🔋 Features</a>

👉 **Movie Search**: Real-time search with debouncing for smooth user experience

👉 **Trending Movies**: Algorithm-based trending section that tracks popular searches and displays numbered rankings

👉 **Movie Details**: Comprehensive movie information including ratings, release dates, runtime, and overviews

👉 **Cast Display**: Horizontal carousel showcasing movie cast members with profile images

👉 **Recommendations**: AI-powered movie recommendations carousel based on the current movie

👉 **Pagination**: Efficient navigation through large movie collections

👉 **Responsive Design**: Fully responsive layout that adapts to all screen sizes

👉 **Modern UI/UX**: Clean interface with custom carousels, hover effects, and smooth transitions

👉 **Backend API**: Django REST API with trending search tracking and TMDB integration

👉 **Type Safety**: Full TypeScript implementation for better code reliability

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone 
cd react-movies

```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
NEXT_PUBLIC_API_BASE_URL=your backend-url
```


**Running the Project**

```bash
npm run dev
```

Open [http://localhost:3000] in your browser to view the project.





