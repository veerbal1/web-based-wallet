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

  const handleGenerateMnemonic = () => {
    const mnemonic = generateMnemonic();
    setWalletState(prevState => ({ ...prevState, mnemonic }));
  };

  return {
    walletState,
    handleCreateWallet,
    handleGenerateMnemonic,
  };
}; 