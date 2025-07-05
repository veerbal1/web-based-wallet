"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface MnemonicDisplayProps {
  mnemonic: string;
}

export default function MnemonicDisplay({ mnemonic }: MnemonicDisplayProps) {
  const [copied, setCopied] = useState(false);

  if (!mnemonic) {
    return null;
  }

  const words = mnemonic.split(" ");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(mnemonic);
      toast("Copied to clipboard", {
        position: "top-center",
      });
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg border shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">
            Your Seed Phrase
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-sm"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-muted rounded-md border"
            >
              <span className="text-sm font-medium text-muted-foreground w-6">
                {index + 1}.
              </span>
              <span className="text-sm font-mono text-foreground">{word}</span>
            </div>
          ))}
        </div>

        <div className="text-sm text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-800">
          <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            ⚠️ Important
          </p>
          <p className="text-yellow-700 dark:text-yellow-300">
            Store this seed phrase securely. Anyone with access to it can
            control your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
