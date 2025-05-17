import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
} from "@solana/web3.js";

// кластер, к которому мы хотим подключиться
const cluster = "devnet";
// создаем подключение
const connection = new Connection(`https://api.${cluster}.solana.com`);

// функция для получения баланса SOL
export const getSolBalance = async (publicKey: PublicKey) => {
  try {
    const balance = await connection.getBalance(publicKey);
    return balance / LAMPORTS_PER_SOL;
  } catch (error) {
    console.error("Error getting SOL balance:", error);
    return 0;
  }
};

// функция для отправки SOL
export const sendSol = async (
  fromWallet: PublicKey,
  toWallet: PublicKey,
  amount: number,
  privateKey: Uint8Array
) => {
  try {
    // Get the recent blockhash
    const { blockhash } = await connection.getLatestBlockhash("finalized");

    // Construct the transaction
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: fromWallet,
        toPubkey: toWallet,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    transaction.recentBlockhash = blockhash;
    transaction.feePayer = fromWallet;

    // Sign the transaction
    const keypair = Keypair.fromSecretKey(privateKey);
    transaction.sign(keypair);

    // Serialize the transaction
    const serializedTransaction = transaction.serialize();

    // Send the transaction
    const signature = await connection.sendRawTransaction(
      serializedTransaction
    );

    // Confirm the transaction
    await connection.confirmTransaction(signature, "finalized");

    console.log(`Transaction successful! Signature: ${signature}`);
    return signature;
  } catch (error) {
    console.error("Error sending SOL:", error);
    throw error;
  }
};
