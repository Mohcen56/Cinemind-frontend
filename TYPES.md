# Type System Organization

## Overview

CineMind uses a clean, centralized type system to maintain consistency across the frontend application.

## Type Files

### `src/types/User.ts` ✅ (Single Source of Truth)
```typescript
export interface User {
  id: number;
  email: string;
  username: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}
```

**Usage:**
```typescript
import type { User } from '@/src/types/User';

// or re-exported from auth API
import type { User } from '@/src/lib/api';
```

### `src/types/movie.ts`
Movie data types for TMDB API responses.

### `src/types/movieDetail.ts`
Detailed movie information types.

### `src/types/global.d.ts`
Reserved for global types (currently empty/minimal).

## Consolidated Approach

All types are defined in their specific files:
- **User types** → `User.ts`
- **Movie types** → `movie.ts`, `movieDetail.ts`
- **General types** → `global.d.ts` (if needed)

This keeps the codebase:
- 📦 **Organized** - Types grouped by domain
- 🔍 **Traceable** - Easy to find where types are defined
- 🔄 **Maintainable** - Single source of truth
- 🚀 **Efficient** - Better tree-shaking for builds

## API Types

Authentication types are also exported from the auth API module:
```typescript
import type { User, AuthResponse, RegisterData, LoginData } from '@/src/lib/api';
```

This provides a unified import for auth-related functionality and types.
