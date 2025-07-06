import { useState } from "react";
import { generateMnemonic } from "bip39";
import { WalletState } from "@/types/wallet";
import { generateWalletRow } from "@/lib/wallet-generators";

export const useWalletState = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    mnemonic: "",
    walletRows: [],
  });

  const handleCreateWallet = () => {
    let currentMnemonic = walletState.mnemonic;
    
    // If mnemonic is not generated, generate it
    if (!currentMnemonic) {
      currentMnemonic = generateMnemonic();
    }

    // Get the next wallet index
    const nextIndex = walletState.walletRows.length;
    
    // Generate new wallet row with all three chains
    const newWalletRow = generateWalletRow(currentMnemonic, nextIndex);
    
    // Update state
    setWalletState(prevState => ({
      mnemonic: currentMnemonic,
      walletRows: [...prevState.walletRows, newWalletRow],
    }));
  };

  const handleGenerateNewWallet = () => {
    // Generate new mnemonic and create first wallet row
    const newMnemonic = generateMnemonic();
    const firstWalletRow = generateWalletRow(newMnemonic, 0);
    
    setWalletState({
      mnemonic: newMnemonic,
      walletRows: [firstWalletRow],
    });
  };

  const handleGenerateMnemonic = () => {
    const mnemonic = generateMnemonic();
    setWalletState(prevState => ({ ...prevState, mnemonic }));
  };

  const handleImportMnemonic = (mnemonic: string) => {
    // Clear existing wallets and set new mnemonic
    setWalletState({
      mnemonic: mnemonic,
      walletRows: [],
    });
  };

  const hasExistingWallets = walletState.walletRows.length > 0;
  const hasAnyContent = !!walletState.mnemonic || hasExistingWallets;

  return {
    walletState,
    handleCreateWallet,
    handleGenerateNewWallet,
    handleGenerateMnemonic,
    handleImportMnemonic,
    hasExistingWallets,
    hasAnyContent,
  };
}; 