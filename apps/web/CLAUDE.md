# zkFluence Farcaster Mini App - Claude Code Project Guide

## Project Overview

**zkFluence** is a Farcaster Mini App marketplace connecting brands with content creators for influencer marketing campaigns. Built as a monorepo with Turborepo, featuring Next.js 15, TypeScript, and comprehensive Farcaster SDK integration.

**Location**: `/Users/osx/Projects/ETHGlobal-BA25/zkFluenceApp/apps/web`

## Tech Stack

### Core Framework
- **Framework**: Next.js 15.1.3 (App Router)
- **Language**: TypeScript 5
- **Runtime**: React 18.3.1
- **Styling**: Tailwind CSS 4.1.9
- **Monorepo**: Turborepo with PNPM workspace

### Farcaster Integration
- `@farcaster/frame-sdk` - Mini App SDK core functionality
- `@farcaster/frame-core` - Framework primitives
- `@farcaster/miniapp-wagmi-connector` - Wallet integration
- `@farcaster/quick-auth` - Authentication flows

### UI & Components
- **Design System**: shadcn/ui (Radix UI primitives)
- **Icons**: lucide-react
- **Charts**: recharts
- **Theming**: next-themes
- **Notifications**: sonner
- **Carousels**: embla-carousel-react

### Blockchain & Web3
- **Wagmi**: Web3 React hooks (v2.14.12)
- **Viem**: Ethereum interactions (v2.27.2)
- **Target Chain**: Celo blockchain

### Data & State
- **Forms**: react-hook-form + zod validation
- **Queries**: @tanstack/react-query
- **Date**: date-fns

### Development Tools
- **Debug**: eruda (mobile debugging)
- **Analytics**: @vercel/analytics
- **Env Validation**: @t3-oss/env-nextjs

## Project Structure

```
apps/web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   │   ├── auth/sign-in/    # Farcaster auth
│   │   │   ├── campaigns/       # Campaign CRUD
│   │   │   ├── creators/        # Creator management
│   │   │   ├── notify/          # Notifications
│   │   │   └── webhook/         # Webhooks
│   │   ├── company/      # Brand dashboard
│   │   │   ├── analytics/
│   │   │   ├── campaigns/
│   │   │   ├── creators/
│   │   │   └── dashboard/
│   │   ├── creator/      # Creator dashboard
│   │   │   ├── campaigns/
│   │   │   ├── dashboard/
│   │   │   ├── feed/
│   │   │   ├── profile/
│   │   │   ├── submissions/
│   │   │   └── wallet/
│   │   └── .well-known/  # Farcaster manifest
│   ├── components/       # React components
│   │   ├── ui/          # shadcn/ui components
│   │   ├── bottom-nav.tsx
│   │   └── theme-provider.tsx
│   ├── contexts/         # React contexts
│   ├── hooks/           # Custom hooks
│   │   ├── use-api.ts
│   │   ├── use-farcaster-notifications.ts
│   │   ├── use-mobile.ts
│   │   └── use-toast.ts
│   ├── lib/             # Utilities
│   │   ├── api/         # API utilities
│   │   ├── blockchain/  # Web3 helpers
│   │   ├── contracts/   # Contract interactions
│   │   ├── farcaster/   # Farcaster SDK helpers
│   │   ├── utils/       # General utilities
│   │   ├── app-utils.ts
│   │   ├── env.ts       # Environment validation
│   │   ├── memory-store.ts
│   │   ├── notification-client.ts
│   │   ├── utils.ts
│   │   └── warpcast.ts
│   └── types/           # TypeScript types
│       ├── campaign.ts
│       ├── creator.ts
│       └── transaction.ts
├── public/              # Static assets
├── .env.template        # Environment variables template
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies

apps/contracts/          # Hardhat smart contracts (sibling app)
```

## Key Workflows

### User Roles
1. **Brands/Companies**: Create campaigns, browse creators, manage analytics
2. **Creators**: Browse campaigns, submit content, manage profile, track earnings

### Core Features
- Farcaster authentication & authorization
- Campaign creation and management
- Creator discovery and application
- Content submission and approval
- Wallet integration (via Wagmi)
- Push notifications (Farcaster SDK)
- Analytics dashboard

## Environment Variables

Required environment variables (see [.env.template](/.env.template)):

```bash
# Application
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_APP_ENV=development
JWT_SECRET=your-jwt-secret-here

# Farcaster Account Association (required for Mini App)
NEXT_PUBLIC_FARCASTER_HEADER=your-farcaster-header-here
NEXT_PUBLIC_FARCASTER_PAYLOAD=your-farcaster-payload-here
NEXT_PUBLIC_FARCASTER_SIGNATURE=your-farcaster-signature-here

# Celo Blockchain
CELO_RPC_URL=https://forno.celo.org
```

**Important**: Farcaster account association values must be generated from:
`https://farcaster.xyz/~/developers/mini-apps/manifest?domain=YOUR_DOMAIN`

See [FARCASTER_SETUP.md](/FARCASTER_SETUP.md) for detailed instructions.

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # Run ESLint
pnpm type-check       # TypeScript validation

# Smart Contracts (from monorepo root)
pnpm contracts:compile           # Compile contracts
pnpm contracts:test             # Run tests
pnpm contracts:deploy           # Local deployment
pnpm contracts:deploy:alfajores # Celo testnet
pnpm contracts:deploy:celo      # Celo mainnet
```

## Code Conventions

### TypeScript
- **Strict Mode**: Enabled
- **Path Aliases**: `@/` maps to `src/`
- **Type Definitions**: Centralized in `src/types/`

### React/Next.js
- **App Router**: All routes in `src/app/`
- **Server Components**: Default for pages
- **Client Components**: Use `"use client"` directive
- **API Routes**: RESTful in `src/app/api/`

### Styling
- **Tailwind**: Utility-first with CSS variables for theming
- **Theme System**: CSS variables in `globals.css`, dark mode via `next-themes`
- **Components**: shadcn/ui patterns with composition

### File Naming
- **Components**: kebab-case (e.g., `bottom-nav.tsx`)
- **Types**: kebab-case (e.g., `campaign.ts`)
- **Utilities**: kebab-case (e.g., `use-api.ts`)
- **Pages/Routes**: Next.js conventions (`page.tsx`, `route.ts`)

## Architecture Patterns

### Authentication Flow
1. User initiates sign-in via Farcaster
2. `/api/auth/sign-in` validates Farcaster signature
3. JWT token generated and stored
4. Token validated on protected routes

### Data Flow
1. **Client** → React Query hooks (`use-api.ts`)
2. **API Routes** → Business logic + data validation
3. **Response** → Type-safe TypeScript interfaces

### State Management
- **Server State**: TanStack Query (API data)
- **Form State**: react-hook-form (form handling)
- **UI State**: React context (theme, notifications)
- **Global State**: Contexts in `src/contexts/`

## Farcaster Mini App Integration

### Key Files
- `src/app/.well-known/farcaster.json/route.ts` - Manifest endpoint
- `src/lib/farcaster/` - SDK integration helpers
- `src/hooks/use-farcaster-notifications.ts` - Push notifications

### Mini App Lifecycle
1. **Initialization**: SDK setup in root layout
2. **Authentication**: Farcaster Quick Auth flow
3. **Notifications**: Opt-in via SDK
4. **Wallet**: Wagmi connector integration

## Common Development Tasks

### Adding a New Page
1. Create route in `src/app/[role]/[feature]/page.tsx`
2. Define types in `src/types/`
3. Create API route if needed in `src/app/api/`
4. Add UI components in `src/components/`

### Adding a shadcn/ui Component
```bash
# Components are already installed, import from @/components/ui/
# To add new ones, use: npx shadcn-ui@latest add [component]
```

### Working with Forms
1. Define schema with zod
2. Use react-hook-form with zodResolver
3. Leverage shadcn/ui form components

### API Development
1. Create route handler in `src/app/api/[endpoint]/route.ts`
2. Implement GET/POST/PUT/DELETE methods
3. Return NextResponse with proper status codes
4. Validate with zod schemas

## Testing & Debugging

### Mobile Debugging
- **Eruda**: Auto-enabled in development for mobile console
- **Farcaster Devtools**: Available in Warpcast mini app view

### Local Testing
1. Run `pnpm dev`
2. Use ngrok for Farcaster testing: `ngrok http 3000`
3. Update `.env.local` with ngrok URL
4. Generate Farcaster manifest with ngrok domain

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables in Vercel dashboard
3. Deploy from `main` branch
4. Update Farcaster manifest with production domain

### Environment Checklist
- [ ] `NEXT_PUBLIC_URL` matches deployment domain
- [ ] `JWT_SECRET` is cryptographically secure
- [ ] Farcaster account association generated for production domain
- [ ] `CELO_RPC_URL` configured for target network

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Farcaster Mini Apps](https://miniapps.farcaster.xyz/)
- [Wagmi Docs](https://wagmi.sh/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Celo Docs](https://docs.celo.org/)

### Project Files
- [FARCASTER_SETUP.md](../../FARCASTER_SETUP.md) - Farcaster configuration guide
- [README.md](../../README.md) - Monorepo overview
- [.env.template](./.env.template) - Environment variables reference

## Git Workflow

**Current Branch**: `frontend-framework`
**Main Branch**: `main`

### Modified Files
- `src/app/company/analytics/page.tsx`
- `src/app/company/campaigns/create/page.tsx`
- `src/app/company/creators/page.tsx`

### Untracked Files
- `.gitignore`
- `src/app/company/campaigns/page.tsx`

### Recent Commits
- `rebuild landing page`
- `update ui`
- `fixing app bugs`
- `fixing framework nextjs`

## SuperClaude Integration Notes

### Recommended Personas
- `--persona-frontend` - UI/UX development, component work
- `--persona-backend` - API routes, authentication, data handling
- `--persona-security` - Farcaster auth, JWT security, wallet integration
- `--persona-architect` - System design, feature planning

### Recommended Flags
- `--c7` - Framework documentation (Next.js, Farcaster SDK)
- `--magic` - UI component generation (shadcn/ui patterns)
- `--seq` - Complex debugging, multi-step analysis
- `--uc` - Token efficiency for large file operations

### Common Commands
```bash
# Analyze codebase
/analyze --focus frontend --c7

# Implement new feature
/implement "feature description" --persona-frontend --magic

# Debug authentication
/troubleshoot --focus security --seq

# Add component
/build component --magic --c7
```

## Project-Specific Considerations

### Farcaster Mini App Constraints
- Must be mobile-optimized (primary Farcaster client is mobile)
- Requires HTTPS for production (account association)
- Limited to Farcaster context (no standalone mode)
- Push notifications require user opt-in

### Celo Blockchain
- Low transaction fees (gas-efficient)
- Mobile-first blockchain
- Fast finality (~5 seconds)
- EVM-compatible

### Performance Targets
- **LCP**: <2.5s (Farcaster client viewport)
- **Bundle Size**: <500KB initial (mobile networks)
- **Interactive**: <100ms (native-like feel)

---

**Last Updated**: 2025-11-23
**Project Status**: Active Development (ETHGlobal BA25)
