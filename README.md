# Web-Based Wallet

A modern, secure web-based cryptocurrency wallet application built with Next.js that supports multiple blockchain networks. Generate, import, and manage wallets for Bitcoin, Ethereum, and Solana all in one place.

## Features

- **Multi-Chain Support**: Generate wallets for Bitcoin, Ethereum, and Solana
- **Mnemonic Management**: Create new wallets from mnemonic phrases or import existing ones
- **Secure Key Derivation**: Uses BIP39/BIP32 standards for deterministic wallet generation
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Production Ready**: Optimized builds with WebAssembly support

## Supported Blockchains

- **Bitcoin**: Native SegWit (bech32) addresses using BIP84 derivation path
- **Ethereum**: Standard Ethereum addresses using BIP44 derivation path
- **Solana**: Ed25519 keypairs with base58 encoding

## Technologies Used

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Crypto Libraries**: 
  - `bip39` - Mnemonic phrase generation
  - `bip32` - HD wallet key derivation
  - `bitcoinjs-lib` - Bitcoin wallet operations
  - `ethers.js` - Ethereum wallet operations
  - `@solana/web3.js` - Solana wallet operations
  - `tiny-secp256k1` - Elliptic curve cryptography

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd web-based-wallet
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Usage

1. **Create New Wallet**: Generate a new mnemonic phrase and derive wallets for all supported chains
2. **Import Existing Wallet**: Import an existing wallet using a 12-word mnemonic phrase
3. **View Wallet Details**: See private keys, public keys/addresses for each blockchain
4. **Multi-Account Support**: Generate multiple accounts from the same mnemonic

## Project Structure

```
web-based-wallet/
├── app/                    # Next.js app router pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── Header.tsx        # App header
│   ├── MnemonicDisplay.tsx # Mnemonic phrase display
│   ├── MnemonicImport.tsx  # Mnemonic import form
│   ├── WalletDisplay.tsx   # Individual wallet display
│   └── WalletRowsDisplay.tsx # Wallet list display
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
│   ├── bitcoin-wallet.ts  # Bitcoin wallet generation
│   ├── ethereum-wallet.ts # Ethereum wallet generation
│   ├── solana-wallet.ts   # Solana wallet generation
│   └── wallet-generators.ts # Wallet factory functions
├── types/                 # TypeScript type definitions
└── public/               # Static assets
```

## Security Considerations

⚠️ **Important Security Notes**:
- This is a development/educational project
- Private keys are displayed in the browser for educational purposes
- Never use this in production with real funds
- Always verify addresses before sending transactions
- Store mnemonic phrases securely offline

## Configuration

The project includes special webpack configuration for WebAssembly support (required for cryptographic libraries):

```typescript
// next.config.ts
webpack: (config, { isServer }) => {
  config.experiments = {
    ...config.experiments,
    asyncWebAssembly: true,
    syncWebAssembly: true,
  };
  // ... additional WebAssembly configuration
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for educational purposes. Use at your own risk.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Bitcoin BIP Standards](https://github.com/bitcoin/bips)
- [Ethereum EIP Standards](https://eips.ethereum.org/)
- [Solana Documentation](https://docs.solana.com/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
