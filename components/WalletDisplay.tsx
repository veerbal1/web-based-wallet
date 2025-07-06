"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Copy } from "lucide-react";
import { getChainIcon } from "@/lib/chain-icons";
import Image from "next/image";

interface WalletDisplayProps {
  privateKey: string;
  publicKey: string;
  chainTitle: string;
}

export default function WalletDisplay({ 
  privateKey, 
  publicKey, 
  chainTitle 
}: WalletDisplayProps) {
  const [showPrivateKey, setShowPrivateKey] = useState(false);

  const handleCopy = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`${type} copied to clipboard`);
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error(`Failed to copy ${type.toLowerCase()}`);
    }
  };

  const truncateKey = (key: string, showFull: boolean = false) => {
    if (showFull || key.length <= 20) return key;
    return `${key.slice(0, 8)}...${key.slice(-8)}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-3 sm:p-4 bg-card rounded-lg border shadow-sm">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={getChainIcon(chainTitle)}
              alt={`${chainTitle} icon`}
              width={24}
              height={24}
              className="w-6 h-6"
            />
            <h2 className="text-sm sm:text-base font-semibold text-foreground">
              {chainTitle} Wallet
            </h2>
          </div>
          <div className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded">
            {chainTitle}
          </div>
        </div>

        {/* Public Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              Public Key
            </label>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCopy(publicKey, "Public Key")}
              className="h-7 px-2 text-xs"
            >
              <Copy className="h-3 w-3 mr-1" />
              Copy
            </Button>
          </div>
          <div className="p-2 bg-muted rounded border">
            <p className="text-xs font-mono text-foreground break-all">
              {truncateKey(publicKey)}
            </p>
          </div>
        </div>

        {/* Private Key */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs sm:text-sm font-medium text-foreground">
              Private Key
            </label>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPrivateKey(!showPrivateKey)}
                className="h-7 px-2 text-xs"
              >
                {showPrivateKey ? (
                  <EyeOff className="h-3 w-3 mr-1" />
                ) : (
                  <Eye className="h-3 w-3 mr-1" />
                )}
                {showPrivateKey ? "Hide" : "Show"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(privateKey, "Private Key")}
                className="h-7 px-2 text-xs"
              >
                <Copy className="h-3 w-3 mr-1" />
                Copy
              </Button>
            </div>
          </div>
          <div className="p-2 bg-muted rounded border">
            <p className="text-xs font-mono text-foreground break-all">
              {showPrivateKey 
                ? truncateKey(privateKey, true) 
                : "•".repeat(64)
              }
            </p>
          </div>
        </div>

        {/* Security Warning */}
        <div className="text-xs text-muted-foreground bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
          <p className="font-medium text-red-800 dark:text-red-200 mb-1 flex items-center gap-1">
            <span className="text-sm">🔒</span>
            <span>Security Warning</span>
          </p>
          <p className="text-red-700 dark:text-red-300 leading-relaxed">
            Never share your private key. Keep it secure and private at all times.
          </p>
        </div>
      </div>
    </div>
  );
} 