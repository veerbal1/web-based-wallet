import { Button } from "@/components/ui/button";

export default function Header({
  onCreateWallet,
}: {
  onCreateWallet: () => void;
}) {
  return (
    <div className="max-w-4xl w-full mx-auto p-8">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Web based Crypto Wallet
          </h1>
          <p className="text-muted-foreground text-lg">for learning purposes</p>
        </div>

        <Button size="lg" onClick={onCreateWallet}>
          Create new Wallet
        </Button>
      </div>
    </div>
  );
}
