import { Button } from "@/components/ui/button";

export default function Header({
  onCreateWallet,
  showCreateButton = false,
}: {
  onCreateWallet: () => void;
  showCreateButton?: boolean;
}) {
  return (
    <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
        <div className="space-y-1 sm:space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Web based Crypto Wallet
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            for learning purposes
          </p>
        </div>

        {showCreateButton && (
          <Button 
            size="lg" 
            onClick={onCreateWallet}
            className="w-full sm:w-auto shrink-0"
          >
            Add Wallet
          </Button>
        )}
      </div>
    </div>
  );
}
