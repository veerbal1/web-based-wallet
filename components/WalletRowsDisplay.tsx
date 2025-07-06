import WalletDisplay from "@/components/WalletDisplay";
import { WalletRow } from "@/types/wallet";

interface WalletRowsDisplayProps {
  walletRows: WalletRow[];
}

export default function WalletRowsDisplay({ walletRows }: WalletRowsDisplayProps) {
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
          <div key={rowIndex} className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Wallet {rowIndex + 1}
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