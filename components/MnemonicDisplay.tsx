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
    <div className="w-full max-w-4xl mx-auto space-y-4">
      {/* Security Warning */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
        <div className="flex items-center justify-center gap-2">
          <div className="text-lg">🚨</div>
          <p className="text-red-700 dark:text-red-300 font-medium text-sm">
            LEARNING TOOL ONLY - DO NOT USE WITH REAL FUNDS
          </p>
        </div>
      </div>

      <div className="bg-card p-4 sm:p-6 rounded-lg border shadow-sm">
        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Your Seed Phrase
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="text-xs h-8 px-3"
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              Store this securely. You'll need it to recover your wallets.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3 max-w-4xl mx-auto">
            {words.map((word, index) => (
              <div
                key={index}
                className="bg-background border rounded-lg p-2 sm:p-3 text-center"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {index + 1}
                </div>
                <div className="text-sm sm:text-base font-medium text-foreground">
                  {word}
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
              💡 Important
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Write down these words in order and store them safely. Anyone with access to this seed phrase can control your wallets.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
