import { SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import { EAS, Offchain, SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import { ethers } from 'ethers';
import config from "config";


// Initialize the sdk with the address of the EAS Schema contract address
const eas = new EAS(EASContractAddress);
const provider = new ethers.providers.EtherscanProvider(
    "sepolia",
    config.get('provider.apiKey')
);

eas.connect(provider);
// Signer is an ethers.js Signer instance
const signer = new ethers.Wallet(config.get('wallet.privateKey'), provider);

const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0";
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);

schemaRegistry.connect(signer);

const schema = "uint256 keyIdentifier";
const resolverAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const revocable = true;

const transaction = await schemaRegistry.register({
    schema,
    resolverAddress,
    revocable,
});
console.log(transaction)

// Optional: Wait for transactio
await transaction.wait();