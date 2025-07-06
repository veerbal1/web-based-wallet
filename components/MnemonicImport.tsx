"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { validateMnemonic } from "bip39";
import { toast } from "sonner";

interface MnemonicImportProps {
  onImport: (mnemonic: string) => void;
  disabled?: boolean;
}

export default function MnemonicImport({ onImport, disabled }: MnemonicImportProps) {
  const [inputMnemonic, setInputMnemonic] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const handleImport = async () => {
    if (!inputMnemonic.trim()) {
      toast.error("Please enter a seed phrase");
      return;
    }

    setIsValidating(true);
    
    try {
      const mnemonic = inputMnemonic.trim().toLowerCase();
      
      if (!validateMnemonic(mnemonic)) {
        toast.error("Invalid seed phrase. Please check and try again.");
        setIsValidating(false);
        return;
      }

      onImport(mnemonic);
      setInputMnemonic("");
    } catch (error) {
      toast.error("Failed to import seed phrase");
      console.error("Import error:", error);
    } finally {
      setIsValidating(false);
    }
  };

  const handleClear = () => {
    setInputMnemonic("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      {/* Critical Security Warning */}
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-xl">🚨</div>
          <h3 className="text-base font-bold text-red-800 dark:text-red-200">
            NEVER IMPORT REAL MONEY SEED PHRASES
          </h3>
        </div>
        <p className="text-red-700 dark:text-red-300 font-medium text-sm text-center">
          Only use test phrases or dummy words for learning purposes!
        </p>
      </div>

      <div className="p-4 bg-card rounded-lg border shadow-sm">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-foreground">
              Import Existing Seed Phrase
            </h3>
            <p className="text-xs text-muted-foreground">
              Enter your existing 12 or 24 word seed phrase to restore your wallets
            </p>
          </div>

          <div className="space-y-3">
            <Textarea
              placeholder="Enter your seed phrase here (12 or 24 words separated by spaces)"
              value={inputMnemonic}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputMnemonic(e.target.value)}
              disabled={disabled || isValidating}
              className="min-h-[80px] text-sm"
              rows={3}
            />
            
            <div className="flex gap-2">
              <Button
                onClick={handleImport}
                disabled={disabled || isValidating || !inputMnemonic.trim()}
                className="flex-1"
              >
                {isValidating ? "Validating..." : "Import Seed Phrase"}
              </Button>
              
              {inputMnemonic && (
                <Button
                  variant="outline"
                  onClick={handleClear}
                  disabled={disabled || isValidating}
                >
                  Clear
                </Button>
              )}
            </div>
          </div>

          <div className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-800 dark:text-blue-200 mb-1">
              💡 Note
            </p>
            <p className="text-blue-700 dark:text-blue-300">
              Only import seed phrases from trusted sources. We validate the format but cannot verify the source.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 