import config from "config";
import { EAS, SchemaEncoder } from "@ethereum-attestation-service/eas-sdk";
import {ethers} from "ethers";

/** Definition **/
const provider = new ethers.providers.EtherscanProvider(
    "sepolia",
    config.get('provider.apiKey')
);
export const EASContractAddress = "0xC2679fBD37d54388Ce493F1DB75320D236e1815e"; // Sepolia v0.26
const eas = new EAS(EASContractAddress);
const signer = new ethers.Wallet(config.get('wallet.privateKey'), provider);

/** Let's connect **/
eas.connect(signer);

/** Initialize SchemaEncoder with the schema string **/
const schemaEncoder = new SchemaEncoder("uint256 keyIdentifier");
const encodedData = schemaEncoder.encodeData([
    { name: "keyIdentifier", value: 13432, type: "uint256" },
]);

const schemaUID = "0x66d2b264cf5e3be442a782bbc97913ce6fd6ba10a39a1365a178df9e466006e8";

const tx = await eas.attest({
    schema: schemaUID,
    data: {
        recipient: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0" ,
        expirationTime: 0,
        revocable: true, // Be aware that if your schema is not revocable, this MUST be false
        data: encodedData,
    },
});

const newAttestationUID = await tx.wait();

console.log("New attestation UID:", newAttestationUID);