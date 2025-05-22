# SolFarcaster Project

## Overview

This is a React-based single-page application showcasing the SolFarcaster (SOLFAR) meme token that bridges Solana and Farcaster ecosystems. The application features a modern, dark-themed design with 3D animations, particle effects, and trading functionality integration.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript, Vite for bundling
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions and interactions
- **3D Graphics**: React Three Fiber with drei helpers for 3D coin visualization
- **Database**: PostgreSQL with Drizzle ORM
- **Backend**: Express.js server with TypeScript
- **Deployment**: Configured for Replit with autoscale deployment

### Directory Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components (shadcn/ui)
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utility functions and configurations
├── server/               # Backend Express server
├── shared/               # Shared types and schemas
└── migrations/           # Database migration files
```

## Key Components

### Frontend Architecture
- **Component Library**: Uses shadcn/ui with Radix UI primitives for consistent, accessible components
- **Styling System**: Tailwind CSS with CSS custom properties for theming
- **State Management**: React Query for server state, local state with React hooks
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Server Framework**: Express.js with TypeScript
- **Database Layer**: Drizzle ORM with PostgreSQL (configured for Neon serverless)
- **Storage Interface**: Abstracted storage layer with in-memory implementation for development
- **API Structure**: RESTful endpoints under `/api` prefix

### Design System
- **Theme**: Dark mode with green (#00FFA3) and purple (#9945FF) accent colors
- **Typography**: Inter font family for clean, modern text
- **Animations**: Framer Motion for entrance animations, scroll triggers, and hover effects
- **3D Elements**: Three.js coin visualization with interactive hover states

## Data Flow

### Client-Side Data Management
1. React Query handles API calls and caching
2. Component state manages UI interactions and form data
3. Custom hooks abstract common functionality (mobile detection, toast notifications)

### Server-Side Processing
1. Express middleware handles request logging and error management
2. Storage interface abstracts database operations
3. Vite integration provides development hot reloading

### Database Schema
- Users table with basic authentication fields
- Prepared for token-related data structures
- Zod validation for type safety

## External Dependencies

### Core Libraries
- **UI Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Animation**: Framer Motion for complex animations
- **3D Graphics**: Three.js ecosystem (@react-three/fiber, @react-three/drei)
- **Database**: Drizzle ORM with PostgreSQL
- **HTTP Client**: Native fetch with React Query

### Development Tools
- **Build Tool**: Vite for fast development and optimized builds
- **TypeScript**: Strict type checking across the entire codebase
- **ESBuild**: For server-side bundling in production

### Planned Integrations
- **Solana Wallet Adapter**: For blockchain wallet connections
- **Pump.fun API**: For real-time token data and trading
- **Dexscreener**: For trading chart visualization

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with npm package management
- **Database**: PostgreSQL 16 integration
- **Hot Reloading**: Vite dev server with HMR support
- **Error Handling**: Runtime error modal for development debugging

### Production Deployment
- **Platform**: Replit with autoscale deployment target
- **Build Process**: Vite builds client assets, ESBuild bundles server code
- **Port Configuration**: Server runs on port 5000, mapped to external port 80
- **Static Assets**: Client build output served from dist/public directory

### Database Management
- **ORM**: Drizzle with PostgreSQL dialect
- **Migrations**: Managed through drizzle-kit
- **Environment**: DATABASE_URL configuration for connection string

### Security Considerations
- **CORS**: Configured for cross-origin requests
- **Session Management**: Express session with PostgreSQL store
- **Input Validation**: Zod schemas for type-safe data validation

### Performance Optimizations
- **Code Splitting**: Vite automatically splits chunks for optimal loading
- **Asset Optimization**: Automatic minification and compression
- **Caching Strategy**: React Query provides intelligent caching for API responses