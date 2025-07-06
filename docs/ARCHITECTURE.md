# Web-Based Wallet Architecture

## Overview
This web-based wallet generates multi-chain wallets (Solana, Ethereum, Bitcoin) from a single mnemonic phrase, compatible with popular wallets like Phantom.

## File Structure

```
web-based-wallet/
├── app/
│   └── page.tsx                 # Main page component (clean & simple)
├── components/
│   ├── Header.tsx               # Header with "Create Wallet" button
│   ├── MnemonicDisplay.tsx      # Displays seed phrase
│   ├── WalletDisplay.tsx        # Individual wallet component with icons
│   └── WalletRowsDisplay.tsx    # Manages wallet rows display
├── hooks/
│   └── useWalletState.ts        # Custom hook for wallet state management
├── lib/
│   ├── wallet-generators.ts     # Main orchestrator for wallet generation
│   ├── solana-wallet.ts         # Solana wallet generation
│   ├── ethereum-wallet.ts       # Ethereum wallet generation
│   ├── bitcoin-wallet.ts        # Bitcoin wallet generation
│   └── chain-icons.ts           # Utility for mapping chains to icons
├── types/
│   └── wallet.ts                # TypeScript interfaces
├── public/
│   └── icons/
│       ├── solana.svg           # Solana blockchain icon
│       ├── eth.svg              # Ethereum blockchain icon
│       └── bitcoin.svg          # Bitcoin blockchain icon
└── docs/
    └── ARCHITECTURE.md          # This file
```

## Key Components

### 1. Types (`types/wallet.ts`)
- `WalletInfo`: Individual wallet structure (chain, private key, public key)
- `WalletRow`: Collection of wallets for different chains
- `WalletState`: Overall application state

### 2. Wallet Generators (`lib/`)
- `solana-wallet.ts`: `generateSolanaWallet()` - Creates Solana wallet using Ed25519
- `ethereum-wallet.ts`: `generateEthereumWallet()` - Creates Ethereum wallet using secp256k1
- `bitcoin-wallet.ts`: `generateBitcoinWallet()` - Creates Bitcoin wallet using secp256k1
- `wallet-generators.ts`: `generateWalletRow()` - Orchestrates all three wallet types

### 3. UI Utilities (`lib/`)
- `chain-icons.ts`: `getChainIcon()` - Maps blockchain names to their icon paths

### 4. State Management (`hooks/useWalletState.ts`)
- `useWalletState()`: Custom hook managing wallet state
- `handleCreateWallet()`: Creates new wallet row
- `handleGenerateMnemonic()`: Generates new mnemonic phrase

### 5. UI Components
- `Header`: Main navigation and create wallet action
- `MnemonicDisplay`: Shows seed phrase with copy functionality
- `WalletDisplay`: Individual wallet with private/public keys and blockchain icons
- `WalletRowsDisplay`: Manages display of multiple wallet rows

## Wallet Generation Details

### Derivation Paths
- **Solana**: `m/44'/501'/{index}'/0'` (Ed25519)
- **Ethereum**: `m/44'/60'/0'/0/{index}` (secp256k1)
- **Bitcoin**: `m/84'/0'/0'/0/{index}` (secp256k1, native SegWit)

### Key Formats
- **Solana**: Base58 encoded private key
- **Ethereum**: `0x` + hex private key
- **Bitcoin**: WIF compressed format (starts with 'L' or 'K')

### Address Formats
- **Solana**: Base58 encoded public key
- **Ethereum**: Hex address starting with `0x`
- **Bitcoin**: bech32 address starting with `bc1`

### Visual Elements
- **Icons**: Each wallet displays its respective blockchain icon
- **Responsive Design**: Icons scale properly on different screen sizes
- **Brand Recognition**: Instant visual identification of blockchain type

## Data Flow

1. User clicks "Create new Wallet"
2. `useWalletState` hook handles the action
3. If no mnemonic exists, generates new one
4. Calls `generateWalletRow()` with current index
5. `generateWalletRow()` imports and calls individual wallet generators
6. Each wallet generator creates its specific wallet type
7. `WalletDisplay` component gets appropriate icon via `getChainIcon()`
8. State updates trigger UI re-render
9. New wallet row displays in `WalletRowsDisplay` with icons

## Benefits of This Architecture

1. **Single Responsibility**: Each file has exactly one function/purpose
2. **Separation of Concerns**: Blockchain logic is completely isolated
3. **Reusability**: Individual wallet generators can be used independently
4. **Maintainability**: Easy to modify/debug specific blockchain support
5. **Testability**: Each function can be tested in complete isolation
6. **Readability**: Super focused, easy-to-understand files
7. **Type Safety**: Full TypeScript support throughout
8. **Modularity**: Easy to add/remove blockchain support
9. **Visual Clarity**: Icons provide instant blockchain recognition

## Adding New Blockchain Support

To add a new blockchain (e.g., Polygon):

1. Create `lib/polygon-wallet.ts` with `generatePolygonWallet()` function
2. Add polygon icon to `public/icons/polygon.svg`
3. Update `lib/chain-icons.ts` to include Polygon mapping
4. Import and add to `lib/wallet-generators.ts` 
5. Update grid layout in `WalletRowsDisplay.tsx`
6. No changes needed to other components

Example:
```typescript
// lib/polygon-wallet.ts
export const generatePolygonWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
  // Polygon-specific generation logic
}

// lib/chain-icons.ts
export const getChainIcon = (chainTitle: string): string => {
  const iconMap: Record<string, string> = {
    'Solana': '/icons/solana.svg',
    'Ethereum': '/icons/eth.svg',
    'Bitcoin': '/icons/bitcoin.svg',
    'Polygon': '/icons/polygon.svg', // Add this
  };
  
  return iconMap[chainTitle] || '/icons/default.svg';
};

// lib/wallet-generators.ts
import { generatePolygonWallet } from "./polygon-wallet";

export const generateWalletRow = (mnemonic: string, accountIndex: number) => {
  const solanaWallet = generateSolanaWallet(mnemonic, accountIndex);
  const ethereumWallet = generateEthereumWallet(mnemonic, accountIndex);
  const bitcoinWallet = generateBitcoinWallet(mnemonic, accountIndex);
  const polygonWallet = generatePolygonWallet(mnemonic, accountIndex); // Add this
  
  return {
    index: accountIndex,
    wallets: [solanaWallet, ethereumWallet, bitcoinWallet, polygonWallet],
  };
};
```

## Development Notes

- All wallets use the same mnemonic but different derivation paths
- Compatible with Phantom wallet key derivation
- Responsive design for mobile and desktop
- Proper error handling throughout
- Security warnings for private key exposure
- Each wallet generator is completely independent
- Zero coupling between blockchain implementations 