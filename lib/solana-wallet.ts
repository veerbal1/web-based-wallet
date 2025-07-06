import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { WalletInfo } from "@/types/wallet";

export const generateSolanaWallet = (mnemonic: string, accountIndex: number): WalletInfo => {
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