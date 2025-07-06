import { mnemonicToSeedSync } from "bip39";
import { ethers } from "ethers";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";
import { WalletInfo } from "@/types/wallet";

// Initialize bip32 with secp256k1
const BIP32 = bip32.BIP32Factory(ecc);

export const generateEthereumWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
  const seedBuffer = mnemonicToSeedSync(mnemonic);
  const root = BIP32.fromSeed(seedBuffer);
  const path = `m/44'/60'/0'/0/${accountIndex}`;
  const child = root.derivePath(path);
  
  if (!child.privateKey) {
    throw new Error("Failed to derive private key");
  }
  
  const privateKey = "0x" + Buffer.from(child.privateKey).toString("hex");
  const wallet = new ethers.Wallet(privateKey);
  
  return {
    chainTitle: "Ethereum",
    privateKey: privateKey,
    publicKey: wallet.address,
  };
}; 