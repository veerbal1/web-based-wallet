import { useState } from "react";
import { generateMnemonic } from "bip39";
import { toast } from "sonner";
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

    // Show success toast
    toast.success(`Wallet ${nextIndex + 1} added successfully!`, {
      description: "New Solana, Ethereum, and Bitcoin wallets generated",
    });

    // Scroll to bottom to show new wallet
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      });
    }, 100);
  };

  const handleGenerateNewWallet = () => {
    // Generate new mnemonic and create first wallet row
    const newMnemonic = generateMnemonic();
    const firstWalletRow = generateWalletRow(newMnemonic, 0);
    
    setWalletState({
      mnemonic: newMnemonic,
      walletRows: [firstWalletRow],
    });

    // Show success toast
    toast.success("New wallet created successfully!", {
      description: "Seed phrase generated and first wallet row created",
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

    // Show success toast
    toast.success("Seed phrase imported successfully!", {
      description: "Click 'Add Wallet' to generate wallets from this seed phrase",
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