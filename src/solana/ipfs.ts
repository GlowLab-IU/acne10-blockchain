import { create } from "ipfs-http-client";

// IPFS node address
const ipfsNode = "https://ipfs.infura.io:5001";

// Create an IPFS client
const ipfs = create({ url: ipfsNode });

// Function to upload data to IPFS
export const uploadToIPFS = async (data: any) => {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    console.log("IPFS upload result:", result);
    return result.cid.toString();
  } catch (error) {
    console.error("IPFS upload error:", error);
    throw error;
  }
};

// Function to retrieve data from IPFS
export const retrieveFromIPFS = async (cid: string) => {
  try {
    const stream = ipfs.cat(cid);
    let data = "";
    for await (const chunk of stream) {
      data += new TextDecoder().decode(chunk);
    }
    console.log("IPFS retrieve result:", data);
    return JSON.parse(data);
  } catch (error) {
    console.error("IPFS retrieve error:", error);
    throw error;
  }
};
