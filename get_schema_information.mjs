import { SchemaRegistry } from "@ethereum-attestation-service/eas-sdk";
import config from "config";
import {ethers} from "ethers";

/** Definition **/
const provider = new ethers.providers.EtherscanProvider(
    "sepolia",
    config.get('provider.apiKey')
);
const schemaRegistryContractAddress = "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0"; // Sepolia 0.26
const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
schemaRegistry.connect(provider);

const schemaUID = "0x22CD9FBC082E65AC85C8E4A5682E6FFBE8DC1A4F3A0A1CB4C2FC94878B058F0D";

const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

console.log(schemaRecord);