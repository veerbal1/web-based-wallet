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
      toast("Copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-4 bg-card rounded-lg border shadow-sm">
      <div className="space-y-3 sm:space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm sm:text-base font-semibold text-foreground">
            Your Seed Phrase
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="text-xs h-7 px-2 sm:px-3"
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-2">
          {words.map((word, index) => (
            <div
              key={index}
              className="flex items-center gap-1 sm:gap-1.5 p-2 bg-muted rounded border"
            >
              <span className="text-xs font-medium text-muted-foreground w-3 sm:w-4 flex-shrink-0">
                {index + 1}.
              </span>
              <span className="text-xs font-mono text-foreground truncate">{word}</span>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800">
          <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1 flex items-center gap-1">
            <span className="text-sm">⚠️</span>
            <span>Important</span>
          </p>
          <p className="text-yellow-700 dark:text-yellow-300 leading-relaxed">
            Store this seed phrase securely. Anyone with access to it can control your wallet.
          </p>
        </div>
      </div>
    </div>
  );
}
