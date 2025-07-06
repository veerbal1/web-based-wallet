"use client";

import Header from "@/components/Header";
import MnemonicDisplay from "@/components/MnemonicDisplay";
import WalletDisplay from "@/components/WalletDisplay";
import { useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { Button } from "@/components/ui/button";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";

// Initialize bip32 with secp256k1
const BIP32 = bip32.BIP32Factory(ecc);

interface WalletInfo {
  chainTitle: string;
  privateKey: string;
  publicKey: string;
}

interface WalletRow {
  index: number;
  wallets: WalletInfo[];
}

interface WalletState {
  mnemonic: string;
  walletRows: WalletRow[];
}

export default function Home() {
  const [walletState, setWalletState] = useState<WalletState>({
    mnemonic: "",
    walletRows: [],
  });

  const generateSolanaWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
    const seedBuffer = mnemonicToSeedSync(mnemonic);
    const path = `m/44'/501'/${accountIndex}'/0'`;
    const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));
    
    const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
    const keypair = Keypair.fromSecretKey(secretKey);
    
    return {
      chainTitle: "Solana",
      privateKey: bs58.encode(secretKey),
      publicKey: keypair.publicKey.toBase58(),
    };
  };

  const generateEthereumWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
    const seedBuffer = mnemonicToSeedSync(mnemonic);
    const root = BIP32.fromSeed(seedBuffer);
    const path = `m/44'/60'/0'/0/${accountIndex}`;
    const child = root.derivePath(path);
    
    if (!child.privateKey) {
      throw new Error("Failed to derive private key");
    }
    
    const privateKey = Buffer.from(child.privateKey).toString("hex");
    const wallet = new ethers.Wallet(privateKey);
    
    return {
      chainTitle: "Ethereum",
      privateKey: privateKey,
      publicKey: wallet.address,
    };
  };

  const handleCreateWallet = () => {
    let currentMnemonic = walletState.mnemonic;
    
    // If mnemonic is not generated, generate it
    if (!currentMnemonic) {
      currentMnemonic = generateMnemonic();
    }

    // Get the next wallet index
    const nextIndex = walletState.walletRows.length;
    
    // Generate both Solana and Ethereum wallets for this index
    const solanaWallet = generateSolanaWallet(currentMnemonic, nextIndex);
    const ethereumWallet = generateEthereumWallet(currentMnemonic, nextIndex);
    
    // Create new wallet row
    const newWalletRow: WalletRow = {
      index: nextIndex,
      wallets: [solanaWallet, ethereumWallet],
    };
    
    // Update state
    setWalletState(prevState => ({
      mnemonic: currentMnemonic,
      walletRows: [...prevState.walletRows, newWalletRow],
    }));
  };

  const handleGenerateMnemonic = () => {
    const mnemonic = generateMnemonic();
    setWalletState(prevState => ({ ...prevState, mnemonic }));
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-start bg-background">
      <Header onCreateWallet={handleCreateWallet} />
      
      <div className="flex flex-col items-center justify-center gap-6 p-4">
        <MnemonicDisplay mnemonic={walletState.mnemonic} />
        
        {/* Wallet Rows Section */}
        {walletState.walletRows.length > 0 && (
          <div className="w-full max-w-7xl space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">
                Your Wallets
              </h2>
              <Button onClick={handleCreateWallet} variant="outline">
                Add Wallet Row
              </Button>
            </div>
            
            <div className="space-y-8">
              {walletState.walletRows.map((walletRow, rowIndex) => (
                <div key={rowIndex} className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">
                    Wallet {rowIndex + 1}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        )}
      </div>
    </div>
  );
}
