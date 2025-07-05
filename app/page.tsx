"use client";

import Header from "@/components/Header";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { Button } from "@/components/ui/button";

interface WalletState {
  mnemonic: string;
}

export default function Home() {
  const [walletState, setWalletState] = useState<WalletState>({
    mnemonic: "",
  });

  const handleCreateWallet = () => {
    // If mnemonic is not generated, generate it
    if (!walletState.mnemonic) {
      handleGenerateMnemonic();
    }

    // If mnemonic is generated, create the wallet
    
  };

  const handleGenerateMnemonic = async () => {
    const mnemonic = await generateMnemonic();
    setWalletState({ mnemonic });
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start bg-background">
      <Header onCreateWallet={handleCreateWallet} />
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        <MnemonicDisplay mnemonic={walletState.mnemonic} />
      </div>
    </div>
  );
}
