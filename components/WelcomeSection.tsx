"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import MnemonicImport from "./MnemonicImport";

interface WelcomeSectionProps {
  onGenerateNew: () => void;
  onImport: (mnemonic: string) => void;
}

export default function WelcomeSection({ onGenerateNew, onImport }: WelcomeSectionProps) {
  const [showImport, setShowImport] = useState(false);

  if (showImport) {
    return (
      <div className="w-full max-w-2xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Import Wallet</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowImport(false)}
            className="text-sm"
          >
            ← Back to options
          </Button>
        </div>
        <MnemonicImport onImport={onImport} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-card rounded-lg border shadow-sm text-center space-y-8">
      {/* Critical Security Warning */}
      <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg p-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="text-2xl">⚠️</div>
          <h3 className="text-lg font-bold text-red-800 dark:text-red-200">
            CRITICAL SECURITY WARNING
          </h3>
        </div>
        <p className="text-red-700 dark:text-red-300 font-medium">
          🚨 DO NOT USE REAL MONEY SEED PHRASES 🚨
        </p>
        <p className="text-red-600 dark:text-red-400 text-sm mt-2">
          This tool is for LEARNING PURPOSES ONLY. Never enter seed phrases that control real cryptocurrency funds. 
          Always use test/dummy phrases or generate new ones for learning.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground text-lg">
          Get started by creating a new wallet or importing an existing one
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border bg-background space-y-4">
            <div className="text-3xl">🎲</div>
            <h3 className="font-semibold text-foreground">Generate New Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Create a brand new seed phrase and wallets for Solana, Ethereum, and Bitcoin
            </p>
            <Button onClick={onGenerateNew} className="w-full">
              Generate New Wallet
            </Button>
          </div>

          <div className="p-6 rounded-lg border bg-background space-y-4">
            <div className="text-3xl">📥</div>
            <h3 className="font-semibold text-foreground">Import Existing Wallet</h3>
            <p className="text-sm text-muted-foreground">
              Restore your wallets using an existing 12 or 24 word seed phrase
            </p>
            <Button 
              variant="outline" 
              onClick={() => setShowImport(true)}
              className="w-full"
            >
              Import Wallet
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded border border-yellow-200 dark:border-yellow-800">
          <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-1">
            ⚠️ Security Reminder
          </p>
          <p className="text-yellow-700 dark:text-yellow-300">
            Never share your seed phrase with anyone. We recommend using this tool in a secure environment for learning purposes only.
          </p>
        </div>
      </div>
    </div>
  );
} 