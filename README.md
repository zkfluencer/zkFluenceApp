# zkFluencer

**Privacy-Preserving Creator Marketing Platform on Farcaster**

A Farcaster Mini App that revolutionizes influencer marketing by enabling creators to participate in brand campaigns while maintaining privacy through zero-knowledge proofs. Built on the Celo blockchain with seamless Farcaster integration.

![zkFluencer](apps/web/public/opengraph-image.png)

## 🌟 Overview

zkFluencer connects brands with content creators for authentic social media campaigns, leveraging zero-knowledge proofs to verify creator credentials and social metrics without exposing sensitive data. The platform operates as a Farcaster Mini App, providing a native mobile-first experience within the Farcaster ecosystem.

### Key Features

- **🔐 Privacy-First Verification**: Zero-knowledge proofs verify creator credentials without exposing personal data
- **🎯 Farcaster Integration**: Native Mini App with seamless authentication and user data integration
- **💰 Campaign Marketplace**: Discover and join brand campaigns with transparent reward structures
- **👥 Multi-Role Support**:
  - **Creators**: Browse campaigns, submit content, earn rewards
  - **Brands**: Create campaigns, review submissions, distribute rewards
- **🌐 Web3 Wallet Integration**: Secure on-chain transactions via Wagmi/Viem
- **📊 Real-time Analytics**: Track campaign participation, submissions, and earnings
- **📱 Mobile-Optimized**: Responsive design for seamless mobile experience

### Campaign Categories

- **Social Content**: Share authentic experiences with products and services
- **Educational Tutorials**: Create beginner-friendly blockchain tutorials
- **Product Reviews**: In-depth reviews of dApps and ecosystem tools
- **Community Engagement**: Drive awareness and adoption in Web3 communities

## 🏗️ Architecture

### System Architecture

```mermaid
graph TB
    subgraph "Farcaster Ecosystem"
        FC[Farcaster User]
        WC[Warpcast Client]
        FN[Farcaster Network]
    end

    subgraph "zkFluencer Platform"
        subgraph "Frontend (Next.js 15)"
            UI[React UI Components]
            SDK[Farcaster Mini App SDK]
            WEB3[Web3 Integration<br/>Wagmi + Viem]
            CTX[Context Providers]
        end

        subgraph "API Layer"
            API[Next.js API Routes]
            AUTH[Authentication]
            CAMP[Campaign API]
            NOTIF[Notification API]
            WEBHOOK[Webhook Handler]
        end

        subgraph "Smart Contracts (Celo)"
            SC_CAMP[Campaign Manager]
            SC_REWARD[Reward Distribution]
            SC_ZK[ZK Verifier]
        end

        subgraph "External Services"
            TIKTOK[TikTok API]
            SELF[Self.xyz<br/>ZK Proofs]
        end
    end

    subgraph "Blockchain"
        CELO[Celo Network<br/>Alfajores/Mainnet]
        WALLET[User Wallets]
    end

    FC -->|Uses| WC
    WC -->|Opens Mini App| SDK
    SDK -->|Renders| UI
    UI -->|User Actions| CTX
    CTX -->|State Management| API

    API -->|Verify Auth| AUTH
    API -->|Campaign Ops| CAMP
    API -->|Send Notifs| NOTIF

    WEB3 -->|Sign Tx| WALLET
    WALLET -->|Interact| CELO

    SC_CAMP -->|Deployed on| CELO
    SC_REWARD -->|Deployed on| CELO
    SC_ZK -->|Deployed on| CELO

    API -->|Fetch Data| TIKTOK
    API -->|Generate Proofs| SELF

    FN -->|Webhook Events| WEBHOOK

    style FC fill:#9333ea
    style WC fill:#9333ea
    style UI fill:#3b82f6
    style SDK fill:#3b82f6
    style SC_CAMP fill:#10b981
    style SC_REWARD fill:#10b981
    style SC_ZK fill:#10b981
    style CELO fill:#fcff52
```

### Component Architecture

```mermaid
graph LR
    subgraph "User Interface Layer"
        HOME[Home Page]
        CREATOR[Creator Dashboard]
        COMPANY[Company Dashboard]
        PROFILE[Profile Page]
        CAMPAIGN[Campaign Details]
    end

    subgraph "Shared Components"
        WIZARD[Onboarding Wizard]
        CARD[Campaign Card]
        WALLET_UI[Wallet Connect]
        NAV[Navigation]
        THEME[Theme Toggle]
    end

    subgraph "Context Providers"
        MINIAPP[MiniApp Context<br/>Farcaster SDK]
        WEB3_CTX[Web3 Context<br/>Wagmi Config]
        THEME_CTX[Theme Context]
    end

    subgraph "UI Component Library"
        SHADCN[shadcn/ui Components]
        RADIX[Radix UI Primitives]
    end

    HOME --> WIZARD
    HOME --> CARD
    CREATOR --> CARD
    CREATOR --> WALLET_UI
    COMPANY --> CARD

    WIZARD --> MINIAPP
    WALLET_UI --> WEB3_CTX
    NAV --> THEME_CTX

    CARD --> SHADCN
    WIZARD --> SHADCN
    SHADCN --> RADIX

    style HOME fill:#3b82f6
    style CREATOR fill:#3b82f6
    style COMPANY fill:#3b82f6
    style MINIAPP fill:#9333ea
    style WEB3_CTX fill:#10b981
```

### Data Flow Architecture

```mermaid
graph TD
    subgraph "Client Side"
        USER[User Action]
        HOOK[React Hook]
        CONTEXT[Context State]
    end

    subgraph "API Layer"
        API_ROUTE[API Route Handler]
        VALIDATION[Data Validation<br/>Zod Schema]
        BUSINESS[Business Logic]
    end

    subgraph "External Integrations"
        FC_API[Farcaster API]
        TT_API[TikTok API]
        ZK_API[Self.xyz API]
    end

    subgraph "Blockchain Layer"
        CONTRACT[Smart Contract]
        EVENT[Blockchain Event]
    end

    subgraph "Data Storage"
        STATE[Client State]
        CHAIN[On-Chain Data]
    end

    USER -->|Trigger| HOOK
    HOOK -->|Update| CONTEXT
    CONTEXT -->|API Call| API_ROUTE

    API_ROUTE -->|Validate| VALIDATION
    VALIDATION -->|Process| BUSINESS

    BUSINESS -->|Call| FC_API
    BUSINESS -->|Call| TT_API
    BUSINESS -->|Call| ZK_API

    BUSINESS -->|Write| CONTRACT
    CONTRACT -->|Emit| EVENT
    EVENT -->|Listen| HOOK

    CONTEXT -->|Persist| STATE
    CONTRACT -->|Store| CHAIN

    style USER fill:#3b82f6
    style CONTEXT fill:#9333ea
    style CONTRACT fill:#10b981
    style CHAIN fill:#fcff52
```

### Smart Contract Architecture

```mermaid
graph TB
    subgraph "Smart Contract Layer (Celo)"
        subgraph "Core Contracts"
            CM[CampaignManager.sol<br/>Main contract for campaign CRUD]
            CR[CreatorRegistry.sol<br/>Creator profiles & verification]
            RD[RewardDistributor.sol<br/>USDC/cUSD distribution]
        end

        subgraph "Verification Layer"
            ZKV[ZKVerifier.sol<br/>Verify zero-knowledge proofs]
            SIG[SignatureVerifier.sol<br/>Verify off-chain signatures]
        end

        subgraph "Support Contracts"
            ACC[AccessControl.sol<br/>Role-based permissions]
            PAUSE[Pausable.sol<br/>Emergency pause mechanism]
            REENT[ReentrancyGuard.sol<br/>Prevent reentrancy attacks]
        end

        subgraph "External Interfaces"
            ERC20[IERC20<br/>USDC/cUSD token]
            ORACLE[IPriceOracle<br/>Price feeds (future)]
        end
    end

    CM -->|Inherits| ACC
    CM -->|Inherits| PAUSE
    CM -->|Inherits| REENT
    CM -->|Uses| ZKV
    CM -->|Uses| CR
    CM -->|Uses| RD

    CR -->|Uses| ZKV
    CR -->|Uses| SIG

    RD -->|Transfers| ERC20
    RD -->|Inherits| REENT

    style CM fill:#10b981
    style CR fill:#10b981
    style RD fill:#10b981
    style ZKV fill:#9333ea
    style ERC20 fill:#fcff52
```

### State Machine - Campaign Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Draft: Brand creates campaign
    Draft --> Active: Brand funds campaign
    Active --> Active: Creators join & submit
    Active --> Paused: Emergency pause
    Paused --> Active: Resume campaign
    Active --> ReviewPhase: Deadline reached
    ReviewPhase --> ReviewPhase: Brand reviews submissions
    ReviewPhase --> Distributing: All reviews complete
    Distributing --> Completed: Rewards distributed
    Completed --> [*]

    Active --> Cancelled: Brand cancels
    Draft --> Cancelled: Brand cancels
    Cancelled --> [*]: Refund to brand

    note right of Active
        Creators can:
        - Join campaign
        - Submit content
        - View status
    end note

    note right of ReviewPhase
        Brand can:
        - Approve submissions
        - Reject submissions
        - Request revisions
    end note

    note right of Distributing
        Smart contract:
        - Transfers rewards
        - Emits events
        - Updates state
    end note
```

### Database Schema (Off-chain Metadata)

```mermaid
erDiagram
    CAMPAIGN ||--o{ SUBMISSION : has
    CAMPAIGN ||--o{ PARTICIPANT : has
    CREATOR ||--o{ SUBMISSION : creates
    CREATOR ||--o{ PARTICIPANT : joins
    BRAND ||--o{ CAMPAIGN : creates

    CAMPAIGN {
        string id PK
        string brandId FK
        string title
        string description
        string category
        uint256 budget
        uint256 rewardPerCreator
        uint256 startDate
        uint256 endDate
        string status
        bytes32 metadataHash
        string txHash
    }

    CREATOR {
        string id PK
        string farcasterFid
        string walletAddress
        string tiktokHandle
        uint256 followerCount
        bool verified
        bytes32 zkProofHash
        uint256 verificationDate
        string[] tags
    }

    BRAND {
        string id PK
        string name
        string walletAddress
        string logoUrl
        string industry
        uint256 totalBudget
        uint256 activeCampaigns
    }

    SUBMISSION {
        string id PK
        string campaignId FK
        string creatorId FK
        string contentUrl
        string contentHash
        string status
        uint256 submittedAt
        uint256 reviewedAt
        string feedback
        string txHash
    }

    PARTICIPANT {
        string id PK
        string campaignId FK
        string creatorId FK
        uint256 joinedAt
        string status
        bool rewarded
        uint256 rewardAmount
    }
```

## 🏗️ Project Structure

This is a monorepo managed by Turborepo:

```
zkFluenceApp/
├── apps/
│   ├── web/              # Next.js 15 Frontend Application
│   │   ├── src/
│   │   │   ├── app/                    # App Router pages
│   │   │   │   ├── creator/            # Creator dashboard & flows
│   │   │   │   ├── company/            # Brand dashboard & flows
│   │   │   │   ├── api/                # API routes
│   │   │   │   └── .well-known/        # Farcaster manifest
│   │   │   ├── components/             # React components
│   │   │   │   ├── ui/                 # shadcn/ui components
│   │   │   │   ├── onboarding-wizard.tsx
│   │   │   │   ├── campaign-card.tsx
│   │   │   │   └── wallet-connect.tsx
│   │   │   ├── contexts/               # React contexts
│   │   │   │   └── miniapp-context.tsx # Farcaster SDK context
│   │   │   ├── hooks/                  # Custom React hooks
│   │   │   └── lib/                    # Utilities & helpers
│   │   ├── public/
│   │   │   └── .well-known/
│   │   │       └── farcaster.json      # Mini App manifest
│   │   ├── next.config.mjs
│   │   ├── postcss.config.mjs
│   │   └── package.json
│   └── contracts/        # Smart Contract Development
│       ├── contracts/                  # Solidity contracts
│       ├── scripts/                    # Deployment scripts
│       ├── test/                       # Contract tests
│       └── hardhat.config.ts
├── packages/             # Shared packages (if any)
├── turbo.json           # Turborepo configuration
└── package.json         # Root package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 20+ and pnpm
- Farcaster account for testing Mini App features
- Celo wallet for blockchain interactions

### Installation

1. **Clone the repository**
   ```bash
   cd zkFluenceApp
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp apps/web/.env.template apps/web/.env.local
   ```

   Configure the following variables:
   - `NEXT_PUBLIC_FARCASTER_APP_URL`: Your app's production URL
   - `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`: WalletConnect project ID
   - `NEXT_PUBLIC_CELO_RPC_URL`: Celo RPC endpoint

4. **Start development server**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

### Testing as a Farcaster Mini App

1. Deploy to Vercel or ngrok for HTTPS
2. Update `public/.well-known/farcaster.json` with your domain
3. Open in Warpcast mobile app to test Mini App features

## 📱 User Workflows & Sequence Diagrams

### Creator Onboarding Flow

```mermaid
sequenceDiagram
    participant U as Creator
    participant W as Warpcast
    participant F as zkFluencer App
    participant SDK as Farcaster SDK
    participant API as API Layer
    participant TT as TikTok API
    participant ZK as Self.xyz
    participant SC as Smart Contract
    participant CE as Celo Network

    U->>W: Opens zkFluencer Mini App
    W->>F: Launch App with Context
    F->>SDK: Initialize SDK
    SDK-->>F: SDK Ready + User Context

    F->>F: Extract Farcaster Profile
    Note over F: FID, Username, PFP, Verifications

    F->>U: Show Onboarding Wizard
    U->>F: Connect Wallet
    F->>U: Request Wallet Connection
    U->>F: Approve Wallet

    U->>F: Link TikTok Account
    F->>API: Request TikTok OAuth
    API->>TT: OAuth Flow
    TT-->>API: Access Token
    API->>TT: Fetch Creator Profile
    TT-->>API: Profile Data (Followers, Engagement)

    API->>ZK: Generate ZK Proof
    Note over ZK: Prove follower count > threshold<br/>without revealing exact count
    ZK-->>API: ZK Proof Generated

    API->>SC: Store Creator Profile Hash
    SC->>CE: Write Transaction
    CE-->>SC: Tx Confirmed
    SC-->>API: Profile Stored

    API-->>F: Onboarding Complete
    F->>U: Redirect to Dashboard
```

### Campaign Discovery & Join Flow

```mermaid
sequenceDiagram
    participant C as Creator
    participant F as Frontend
    participant API as API Layer
    participant SC as Campaign Contract
    participant CE as Celo Network

    C->>F: Browse Campaigns
    F->>API: GET /api/campaigns
    API->>SC: Query Active Campaigns
    SC-->>API: Campaign List
    API-->>F: Return Campaigns with Metadata
    F->>C: Display Campaign Feed

    C->>F: Click Campaign Card
    F->>API: GET /api/campaigns/:id
    API->>SC: Get Campaign Details
    SC-->>API: Campaign Data + Requirements
    API-->>F: Campaign Details
    F->>C: Show Campaign Page

    C->>F: Click "Join Campaign"
    F->>API: POST /api/campaigns/:id/join

    API->>API: Verify Creator Eligibility
    Note over API: Check ZK Proof,<br/>Follower Requirements,<br/>Previous Participation

    API->>SC: registerCreator(campaignId, creatorHash)
    SC->>CE: Write Transaction
    Note over CE: Gas fee paid by creator
    CE-->>SC: Tx Confirmed
    SC-->>API: Creator Registered

    API->>API: Send Notification
    Note over API: Notify creator via webhook

    API-->>F: Join Success
    F->>C: Show Success Message
    F->>F: Update UI State
```

### Content Submission & Reward Flow

```mermaid
sequenceDiagram
    participant C as Creator
    participant F as Frontend
    participant API as API Layer
    participant TT as TikTok API
    participant SC as Campaign Contract
    participant R as Reward Contract
    participant CE as Celo Network

    C->>F: Navigate to Campaign Details
    F->>C: Show Submission Form

    C->>F: Paste TikTok Video URL
    F->>API: POST /api/content/analyze
    API->>TT: Fetch Video Metadata
    TT-->>API: Video Stats (Views, Likes, Comments)
    API-->>F: Video Preview + Stats

    C->>F: Add Description & Submit
    F->>API: POST /api/campaigns/:id/submit

    API->>API: Validate Submission
    Note over API: Check video requirements,<br/>creator eligibility,<br/>submission deadline

    API->>SC: submitContent(campaignId, contentHash)
    SC->>CE: Write Transaction
    CE-->>SC: Tx Confirmed
    SC-->>API: Submission Recorded

    API->>API: Notify Brand
    API-->>F: Submission Success
    F->>C: Show "Pending Review" Status

    Note over F,C: Brand reviews submission...

    rect rgb(200, 240, 200)
        Note over API,R: Brand Approval Process
        API->>SC: approveSubmission(campaignId, creatorId)
        SC->>R: triggerReward(creatorAddress, amount)
        R->>CE: Transfer USDC/cUSD
        CE-->>R: Transfer Confirmed
        R-->>SC: Reward Distributed
        SC-->>API: Approval Complete
    end

    API->>API: Send Notification
    API-->>F: Reward Notification
    F->>C: Show "Approved + Reward Sent"

    C->>F: Check Wallet
    F->>CE: Query Balance
    CE-->>F: Updated Balance
    F->>C: Display New Balance
```

### Brand Campaign Creation Flow

```mermaid
sequenceDiagram
    participant B as Brand
    participant F as Frontend
    participant API as API Layer
    participant SC as Campaign Contract
    participant W as Wallet
    participant CE as Celo Network

    B->>F: Navigate to Create Campaign
    F->>B: Show Campaign Form

    B->>F: Fill Campaign Details
    Note over B,F: Title, Description, Requirements,<br/>Budget, Reward per Creator,<br/>Duration, Category

    B->>F: Click "Create Campaign"
    F->>API: POST /api/campaigns

    API->>API: Validate Campaign Data
    Note over API: Check budget > 0,<br/>reward distribution viable,<br/>dates valid

    API->>B: Request Wallet Signature
    B->>W: Sign Campaign Metadata
    W-->>API: Signature

    API->>SC: createCampaign(metadata, budget)
    Note over SC: Campaign struct stored on-chain

    B->>W: Approve Token Spend
    W->>CE: Approve(campaignContract, budget)
    CE-->>W: Approval Confirmed

    SC->>CE: TransferFrom(brand, contract, budget)
    Note over CE: Lock campaign budget in contract
    CE-->>SC: Budget Locked

    SC->>CE: Emit CampaignCreated Event
    CE-->>API: Event Received

    API-->>F: Campaign Created
    F->>B: Redirect to Campaign Dashboard
    F->>B: Show Campaign Stats (0 participants)
```

### Creator ZK Verification Flow

```mermaid
sequenceDiagram
    participant C as Creator
    participant F as Frontend
    participant API as API Layer
    participant TT as TikTok API
    participant ZK as Self.xyz API
    participant SC as ZK Verifier Contract
    participant CE as Celo Network

    C->>F: Click "Verify TikTok"
    F->>API: POST /api/tiktok/compress-user-profile

    API->>TT: OAuth: Request User Profile
    Note over TT: Follower count, Engagement rate,<br/>Account age, Verified status
    TT-->>API: Raw Profile Data

    API->>ZK: Generate ZK Proof Request
    Note over ZK: Proof Type: RangeProof<br/>Claim: followers > 10k<br/>Without revealing exact count

    ZK->>ZK: Generate Proof
    Note over ZK: Uses zkSNARK/zkSTARK<br/>to create privacy-preserving proof

    ZK-->>API: ZK Proof + Public Inputs

    API->>SC: verifyProof(proof, publicInputs)
    SC->>CE: Execute Verification
    Note over CE: On-chain verification of ZK proof
    CE-->>SC: Proof Valid ✓

    SC->>CE: Emit VerificationComplete Event
    SC-->>API: Verification Success

    API->>API: Store Verification Metadata
    Note over API: Hash proof, timestamp,<br/>verification level

    API-->>F: Verification Complete
    F->>C: Show "Verified Creator" Badge
    F->>F: Update Profile UI
```

## 📱 User Workflows

### Creator Workflow

1. **Onboarding**
   - Connect Farcaster account (automatic via Mini App SDK)
   - Link Web3 wallet for rewards
   - Complete creator profile

2. **Discover Campaigns**
   - Browse available campaigns in the feed
   - Filter by category, reward, and requirements
   - View campaign details and requirements

3. **Join & Submit**
   - Join campaign with one tap
   - Create and submit content
   - Track submission status

4. **Earn Rewards**
   - Receive crypto rewards upon approval
   - View earnings dashboard
   - Withdraw to wallet

### Brand Workflow

1. **Campaign Creation**
   - Define campaign objectives and requirements
   - Set budget and reward structure
   - Configure submission criteria

2. **Creator Discovery**
   - View creator applications
   - Review creator profiles and metrics
   - Select participants

3. **Review & Approve**
   - Review submitted content
   - Approve/reject submissions
   - Distribute rewards automatically

4. **Analytics**
   - Track campaign performance
   - View engagement metrics
   - Export results

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.1.3 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS v4.1.9
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React Context API
- **Forms**: React Hook Form + Zod validation

### Web3 Integration
- **Farcaster**:
  - `@farcaster/frame-sdk` (Mini App SDK)
  - `@farcaster/quick-auth` (Authentication)
  - `@farcaster/miniapp-wagmi-connector` (Wallet connector)
- **Wallet**: Wagmi v2.19 + Viem v2.39
- **Blockchain**: Celo (Alfajores testnet, Mainnet)

### Smart Contracts
- **Framework**: Hardhat
- **Language**: Solidity
- **Testing**: Chai + Ethers.js
- **Deployment**: Hardhat Deploy

### Infrastructure
- **Monorepo**: Turborepo
- **Package Manager**: PNPM
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics

## 📦 Available Scripts

### Development
```bash
pnpm dev              # Start all development servers
pnpm dev:web          # Start only web app
pnpm build            # Build all packages and apps
pnpm lint             # Lint all packages
pnpm type-check       # Run TypeScript checks
```

### Smart Contracts
```bash
pnpm contracts:compile              # Compile contracts
pnpm contracts:test                 # Run contract tests
pnpm contracts:deploy               # Deploy to local network
pnpm contracts:deploy:alfajores     # Deploy to Celo Alfajores testnet
pnpm contracts:deploy:celo          # Deploy to Celo mainnet
```

### Web App
```bash
cd apps/web
pnpm dev              # Start Next.js dev server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Lint web app
```

## 🔧 Configuration

### Farcaster Mini App Manifest

Located at `apps/web/public/.well-known/farcaster.json`:

```json
{
  "accountAssociation": {
    "header": "...",
    "payload": "...",
    "signature": "..."
  },
  "frame": {
    "version": "1",
    "name": "zkFluencer",
    "iconUrl": "https://your-domain/icon.png",
    "homeUrl": "https://your-domain",
    "buttonTitle": "Launch zkFluencer"
  }
}
```

### Next.js Configuration

Key features in `next.config.mjs`:
- ESLint disabled during builds (for faster deployments)
- TypeScript build errors enabled
- Webpack externals for Web3 packages
- Image optimization disabled for Farcaster compatibility

### Tailwind CSS v4

Using CSS-based configuration in `apps/web/src/app/globals.css`:
- Custom color scheme with dark mode support
- Design tokens via CSS variables
- Responsive breakpoints
- Custom animations

## 🌐 Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure environment variables
3. Set root directory to `apps/web`
4. Deploy

### Manual Deployment

```bash
cd apps/web
pnpm build
pnpm start
```

## 🔐 Security & Privacy

- **Zero-Knowledge Proofs**: Creator verification without data exposure
- **Web3 Authentication**: Decentralized identity via Farcaster
- **Smart Contract Security**: Audited reward distribution
- **Privacy-First**: Minimal data collection, maximum user control

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Live App**: [https://zk-fluence.vercel.app](https://zk-fluence.vercel.app)
- **Documentation**: Coming soon
- **Discord**: Coming soon
- **Twitter**: Coming soon

## 🙏 Acknowledgments

- Built during ETHGlobal Buenos Aires 2025
- Powered by Celo blockchain
- Integrated with Farcaster protocol
- UI components by shadcn/ui

---

**Note**: This is a hackathon project built for ETHGlobal Buenos Aires 2025. For production use, additional security audits and testing are recommended.
