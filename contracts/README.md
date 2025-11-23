# zkFluence - Self Protocol Verification Contracts

Smart contract-based verification for Self Protocol integration in zkFluence influencer marketing platform.

## Overview

This directory contains Foundry-based smart contracts for on-chain Self Protocol verification. The contracts store verification data on-chain, providing transparent and trustless identity verification for creators and brands.

## Features

- ✅ **Multi-Chain Support** - Deployed on Celo Mainnet, supports Base networks
- ✅ **On-Chain Verification Storage** - Verification data stored immutably on blockchain
- ✅ **Self Protocol Integration** - Extends SelfVerificationRoot for seamless integration
- ✅ **Disclosed Information** - Stores date of birth, name, and nationality
- ✅ **Age Verification** - Built-in age calculation from date of birth
- ✅ **User Type Management** - Distinguish between Creators and Brands
- ✅ **Access Control** - Owner and user can revoke verifications
- ✅ **Platform Statistics** - Track total verifications, creators, and brands

## Prerequisites

- [Foundry](https://book.getfoundry.sh/getting-started/installation) installed
- Celo tokens for gas (get from exchanges or faucet for testnet)
- Private key with funds
- CeloScan API key for contract verification (optional)

## Installation

```bash
# Navigate to contracts directory
cd contracts

# Install Foundry dependencies
forge install

# Copy environment variables
cp .env.example .env
```

## Configuration

Edit `.env` with your values:

```bash
# Your private key (KEEP THIS SECRET!)
PRIVATE_KEY=0xyour_private_key_here

# Network (celo for mainnet, celo-sepolia for testnet)
NETWORK=celo

# Must match frontend NEXT_PUBLIC_SELF_SCOPE
SCOPE_SEED=zkfluence-platform

# Minimum age requirement
MINIMUM_AGE=18

# API key for contract verification
CELOSCAN_API_KEY=your_celoscan_api_key_here

# Optional: Excluded countries (comma-separated ISO codes)
EXCLUDED_COUNTRIES=

# Optional: OFAC compliance
OFAC_ENABLED=false
```

## Deployment

### Deploy to Celo Mainnet

```bash
# Deploy to production
./script/deploy-verification.sh celo
```

### Deploy to Celo Testnet (Alfajores)

```bash
# Deploy to testnet for testing
./script/deploy-verification.sh celo-sepolia
```

The deployment script will:
1. Build the contracts
2. Deploy ZkFluenceVerification contract
3. Verify contract on CeloScan or Sourcify
4. Display deployment summary with contract address

## Frontend Integration

After deployment, update your `apps/web/.env`:

```bash
# Self Protocol Configuration
NEXT_PUBLIC_SELF_ENDPOINT=0xYourContractAddress
NEXT_PUBLIC_VERIFICATION_CONTRACT_ADDRESS=0xYourContractAddress
NEXT_PUBLIC_SELF_SCOPE=zkfluence-platform
NEXT_PUBLIC_SELF_ENDPOINT_TYPE=celo  # or 'celo-sepolia' for testnet
```

## Contract Architecture

### ZkFluenceVerification.sol

Main verification contract extending `SelfVerificationRoot`.

**Key Features:**
- Stores verification data on-chain
- Maps wallet addresses to verification status
- Tracks date of birth, name, and nationality
- Distinguishes between Creators and Brands
- Provides age calculation function
- Supports verification revocation
- Platform statistics tracking

**Main Functions:**

```solidity
// Check if address is verified
function isVerified(address userAddress) external view returns (bool)

// Get verification data
function getVerificationData(address userAddress) external view returns (VerificationData memory)

// Get age from date of birth
function getAge(address userAddress) external view returns (uint256)

// Set user type (Creator or Brand)
function setUserType(address userAddress, UserType userType) external

// Check if verified creator
function isVerifiedCreator(address userAddress) external view returns (bool)

// Check if verified brand
function isVerifiedBrand(address userAddress) external view returns (bool)

// Revoke verification (user or owner only)
function revokeVerification(address userAddress) external

// Get platform statistics
function getStats() external view returns (uint256 total, uint256 creators, uint256 brands)
```

## Network Configuration

### Celo Mainnet (Production)
- **Chain ID**: 42220
- **RPC**: https://forno.celo.org
- **Explorer**: https://celoscan.io
- **Hub Address**: 0xe57F4773bd9c9d8b6Cd70431117d353298B9f5BF

### Celo Testnet - Alfajores
- **Chain ID**: 44787
- **RPC**: https://alfajores-forno.celo-testnet.org
- **Explorer**: https://alfajores.celoscan.io
- **Hub Address**: 0x16ECBA51e18a4a7e61fdC417f0d47AFEeDfbed74
- **Faucet**: https://faucet.celo.org/alfajores

## Testing

```bash
# Run tests
forge test

# Run with verbosity
forge test -vvv

# Run specific test
forge test --match-test testVerification
```

## Security Considerations

1. **Never commit `.env`** - Contains your private key
2. **Test on testnet first** - Use Celo Alfajores before mainnet
3. **Verify contracts** - Always verify on CeloScan or Sourcify
4. **Access control** - Only owner and user can revoke verifications
5. **Scope matching** - Frontend scope must match contract scope
6. **Age requirements** - Ensure minimum age is appropriate

## Troubleshooting

### Deployment Failed

- Ensure private key has sufficient CELO for gas
- Check that `.env` is properly configured
- Verify Foundry is installed: `forge --version`

### Verification Failed

- Ensure CeloScan API key is valid
- Wait a few minutes after deployment
- Try Sourcify verification as alternative

### Wrong Network

- Check `NETWORK` in `.env` (celo or celo-sepolia)
- Verify hub address matches the network
- Check RPC endpoints in `foundry.toml`

## Project Structure

```
contracts/
├── src/
│   └── ZkFluenceVerification.sol    # Main contract
├── script/
│   ├── Base.s.sol                   # Base deployment script
│   ├── DeployVerification.s.sol     # Deployment logic
│   └── deploy-verification.sh       # Automated deployment
├── test/                             # Test files
├── lib/                              # Foundry dependencies
├── foundry.toml                     # Foundry configuration
├── .env.example                     # Environment template
└── README.md                        # This file
```

## Support

- [Self Protocol Docs](https://docs.self.xyz)
- [Foundry Book](https://book.getfoundry.sh)
- [Celo Docs](https://docs.celo.org)
- [Sourcify Verification](https://sourcify.dev)

## License

MIT
