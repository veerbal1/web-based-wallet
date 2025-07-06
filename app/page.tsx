"use client";

import Header from "@/components/Header";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import WalletRowsDisplay from "@/components/WalletRowsDisplay";
import { useWalletState } from "@/hooks/useWalletState";

export default function Home() {
  const { walletState, handleCreateWallet } = useWalletState();

  return (
    <div className="min-h-screen w-full flex flex-col justify-start bg-background">
      <Header onCreateWallet={handleCreateWallet} />
      
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        <MnemonicDisplay mnemonic={walletState.mnemonic} />
        
        <WalletRowsDisplay 
          walletRows={walletState.walletRows}
          onAddWallet={handleCreateWallet}
        />
      </div>
    </div>
  );
}
