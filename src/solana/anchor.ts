import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";
import idl from "./idl.json";

const programID = new web3.PublicKey(idl.metadata.address);

// Function to get the program
export const getProgram = (connection: web3.Connection, wallet: any) => {
  const provider = new AnchorProvider(
    connection,
    wallet,
    AnchorProvider.defaultOptions()
  );
  const program = new Program(idl, programID, provider);
  return program;
};
