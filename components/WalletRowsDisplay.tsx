import { useEffect, useState } from "react";
import WalletDisplay from "@/components/WalletDisplay";
import { WalletRow } from "@/types/wallet";

interface WalletRowsDisplayProps {
  walletRows: WalletRow[];
}

export default function WalletRowsDisplay({ walletRows }: WalletRowsDisplayProps) {
  const [newWalletIndex, setNewWalletIndex] = useState<number | null>(null);

  useEffect(() => {
    if (walletRows.length > 0) {
      const latestIndex = walletRows.length - 1;
      setNewWalletIndex(latestIndex);
      
      // Remove the highlight after animation
      const timer = setTimeout(() => {
        setNewWalletIndex(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [walletRows.length]);

  if (walletRows.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-7xl space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Your Wallets
        </h2>
      </div>
      
      <div className="space-y-8">
        {walletRows.map((walletRow, rowIndex) => (
          <div 
            key={rowIndex} 
            className={`space-y-4 transition-all duration-1000 ${
              newWalletIndex === rowIndex 
                ? 'animate-pulse bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-200 dark:border-green-800' 
                : 'rounded-xl'
            }`}
          >
            <h3 className="text-lg font-medium text-foreground">
              Wallet {rowIndex + 1}
              {newWalletIndex === rowIndex && (
                <span className="ml-2 text-sm font-normal text-green-600 dark:text-green-400">
                  ✨ New!
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {walletRow.wallets.map((wallet, walletIndex) => (
                <WalletDisplay
                  key={`${rowIndex}-${walletIndex}`}
                  chainTitle={wallet.chainTitle}
                  privateKey={wallet.privateKey}
                  publicKey={wallet.publicKey}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 