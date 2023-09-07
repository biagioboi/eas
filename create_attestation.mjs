import config from "config";
import {EAS, SchemaEncoder} from "@ethereum-attestation-service/eas-sdk";
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
let total = 0;
let times = [];
for (let i = 0; i < 10; i++) {
    console.log(i);
    let start = performance.now()
    /** Initialize SchemaEncoder with the schema string **/
    const schemaEncoder = new SchemaEncoder("bytes32 publicKeyLeft, bytes32 publicKeyRight");
    const encodedData = schemaEncoder.encodeData([
        {
            name: "publicKeyLeft",
            value: "0x4DA24C8ACB3000B1EF5E469DB6B18571344D23CF84D8F0BE374903104FCA383E",
            type: "bytes32"
        },
        {
            name: "publicKeyRight",
            value: "0x2AB4FEEB190D9CE3CAE0E7FD6EEA3C21D366839724850AFD34DAB19DB198EAB4",
            type: "bytes32"
        }
    ]);

    const schemaUID = "0xF5524E651B1B642995A647D02766657F47A08035B3CE7626C9BCBB652CA8E0EF";

    const tx = await eas.attest({
        schema: schemaUID,
        data: {
            recipient: config.get('wallet.address'),
            expirationTime: 498249832948,
            revocable: true, // Be aware that if your schema is not revocable, this MUST be false
            data: encodedData,
        },
    });

    const newAttestationUID = await tx.wait();
    var diff = performance.now() - start;
    times.push((diff).toFixed(10));
    console.log("New attestation UID:", newAttestationUID);
}


var json = JSON.stringify(times);
import * as fs from 'fs';
fs.writeFile('results_create_attest_new_new.json', json, 'utf8', () => console.log("done"));