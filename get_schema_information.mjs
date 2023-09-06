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

const schemaUID = "0x66D2B264CF5E3BE442A782BBC97913CE6FD6BA10A39A1365A178DF9E466006E8";

const schemaRecord = await schemaRegistry.getSchema({ uid: schemaUID });

console.log(schemaRecord);