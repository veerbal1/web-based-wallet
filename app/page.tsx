"use client";

import Header from "@/components/Header";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import WelcomeSection from "@/components/WelcomeSection";
import WalletRowsDisplay from "@/components/WalletRowsDisplay";
import { useWalletState } from "@/hooks/useWalletState";

export default function Home() {
  const { 
    walletState, 
    handleCreateWallet, 
    handleGenerateNewWallet,
    handleImportMnemonic, 
    hasAnyContent
  } = useWalletState();

  return (
    <div className="min-h-screen w-full flex flex-col justify-start bg-background">
      <Header 
        onCreateWallet={handleCreateWallet} 
        showCreateButton={hasAnyContent}
      />
      
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        {/* Show welcome section when no content exists */}
        {!hasAnyContent && (
          <WelcomeSection 
            onGenerateNew={handleGenerateNewWallet}
            onImport={handleImportMnemonic}
          />
        )}

        {/* Show mnemonic display when mnemonic exists */}
        {walletState.mnemonic && (
          <MnemonicDisplay mnemonic={walletState.mnemonic} />
        )}
        
        {/* Show wallet rows when they exist */}
        <WalletRowsDisplay 
          walletRows={walletState.walletRows}
        />
      </div>
    </div>
  );
}
