import { mnemonicToSeedSync } from "bip39";
import * as bip32 from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { ECPairFactory } from "ecpair";
import { WalletInfo } from "@/types/wallet";

// Initialize bip32 with secp256k1
const BIP32 = bip32.BIP32Factory(ecc);
// Initialize ECPair factory
const ECPair = ECPairFactory(ecc);

export const generateBitcoinWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
  const seedBuffer = mnemonicToSeedSync(mnemonic);
  const root = BIP32.fromSeed(seedBuffer);
  // Use native SegWit derivation path (same as Phantom)
  const path = `m/84'/0'/0'/0/${accountIndex}`;
  const child = root.derivePath(path);
  
  if (!child.privateKey) {
    throw new Error("Failed to derive private key");
  }
  
  // Convert private key to WIF compressed format (starts with 'L' or 'K')
  const privateKeyWIF = ECPair.fromPrivateKey(
    Buffer.from(child.privateKey),
    { network: bitcoin.networks.bitcoin }
  ).toWIF();
  
  // Generate native SegWit (bech32) address - same as Phantom
  const { address } = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(child.publicKey),
    network: bitcoin.networks.bitcoin,
  });
  
  if (!address) {
    throw new Error("Failed to generate Bitcoin address");
  }
  
  return {
    chainTitle: "Bitcoin",
    privateKey: privateKeyWIF,
    publicKey: address,
  };
}; 