import {
  TOKEN_PROGRAM_ID,
  createMint,
  mintTo,
  getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";

// Function to create a new token mint
export const createNewTokenMint = async (
  connection: Connection,
  payer: Keypair,
  mintAuthority: PublicKey,
  freezeAuthority: PublicKey | null,
  decimals: number
): Promise<PublicKey> => {
  try {
    const mint = await createMint(
      connection,
      payer,
      mintAuthority,
      freezeAuthority,
      decimals
    );
    console.log("Token mint created:", mint.toString());
    return mint;
  } catch (error) {
    console.error("Error creating token mint:", error);
    throw error;
  }
};

// Function to mint tokens to an account
export const mintTokens = async (
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  destination: PublicKey,
  authority: Keypair,
  amount: number
): Promise<string> => {
  try {
    const signature = await mintTo(
      connection,
      payer,
      mint,
      destination,
      authority,
      amount
    );
    console.log("Tokens minted:", signature);
    return signature;
  } catch (error) {
    console.error("Error minting tokens:", error);
    throw error;
  }
};

// Function to get or create the associated token account
export const getOrCreateTokenAccount = async (
  connection: Connection,
  payer: Keypair,
  mint: PublicKey,
  owner: PublicKey
): Promise<PublicKey> => {
  try {
    const tokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mint,
      owner
    );
    console.log("Token account:", tokenAccount.address.toString());
    return tokenAccount.address;
  } catch (error) {
    console.error("Error getting or creating token account:", error);
    throw error;
  }
};
