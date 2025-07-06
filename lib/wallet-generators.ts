import { generateSolanaWallet } from "./solana-wallet";
import { generateEthereumWallet } from "./ethereum-wallet";
import { generateBitcoinWallet } from "./bitcoin-wallet";

export const generateWalletRow = (mnemonic: string, accountIndex: number) => {
  const solanaWallet = generateSolanaWallet(mnemonic, accountIndex);
  const ethereumWallet = generateEthereumWallet(mnemonic, accountIndex);
  const bitcoinWallet = generateBitcoinWallet(mnemonic, accountIndex);
  
  return {
    index: accountIndex,
    wallets: [solanaWallet, ethereumWallet, bitcoinWallet],
  };
}; 