export interface WalletInfo {
  chainTitle: string;
  privateKey: string;
  publicKey: string;
}

export interface WalletRow {
  index: number;
  wallets: WalletInfo[];
}

export interface WalletState {
  mnemonic: string;
  walletRows: WalletRow[];
} 