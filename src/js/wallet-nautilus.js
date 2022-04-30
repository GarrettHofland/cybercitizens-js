"use strict";
let wasm;
import("ergo-lib-wasm-browser").then((res) => (wasm = res));

/**
 * 
 * @returns wallet access approved
 */
const checkAccess = () => {
    return ergo_check_read_access();
};

/**
 * 
 * @returns wallet connection status
 */
const connect = async () => {
    const readAccess = await ergo_request_read_access();

    if (readAccess) {
        await saveChangeAddress();
        return await ergo_check_read_access();
    }

    return false;
};

/**
 * 
 * @returns change address of the connected wallet
 * @remarks the change address of a wallet is the address where all incomplete transactions return unspent ERG
 */
const getAddress = async () => {
    return await ergo.get_change_address();
}

/**
 * 
 * @returns tokens owned by the connected wallet
 */
const getUtxos = async () => {
    return await ergo.get_utxos();
};

/**
 * 
 * @returns parse json of the tokens owned by the connected wallet
 * @remarks useful for getting sigmaUSD stablecoins to complete a transaction isntead of ERG
 */
const getAllUtxos = async () => {
    const parsed = [];
    const utxos = await ergo.get_utxos();
    for (const utxo of utxos) {
        try {
            wasm.ErgoBox.from_json(JSONBigInt.stringify(utxo));
            parsed.push(utxo);
        } catch (err) {
            console.error(err);
            return null;
        }
    }
    return parsed;
};


/**
 * 
 * @returns balance of ERG of the connected wallet
 */
const getWalletBalance = () => {
    return nanoToERG(ergo.get_balance());
};

/**
 * 
 * @param {*} txToSign 
 * @returns a signed transaction
 * @remarks a signed transaction is an off-chain transaction that has been approved by the wallet to be spent (eUTXO model)
 */
const signTx = async (txToSign) => {
    try {
        return await ergo.sign_tx(txToSign);
    } catch (err) {
        console.error(err);
        return null;
    }
};

// Below to be used once we start the next wave for sending tx directly from dapp

/**
 * 
 * @param {*} txToSubmit 
 * @returns a submitted transaction
 */
const submitTx = async (txToSubmit) => {
    try {
        return await ergo.submit_tx(txToSubmit);
    } catch (err) {
        console.error(err);
        return null;
    }
};

/**
 * 
 * @param {*} tx transaction
 * @returns a submitted transaction
 * @remarks logic for handling the flow of an ERGO transaction
 */
const processTx = async (tx) => {
    const signedTx = await signTx(tx);
    if (!signedTx) {
        console.error("Could not sign transaction.");
        return null;
    }
    console.log("Transaction signed, waiting for transaction submission.");

    const subTx = await submitTx(signedTx);
    if (!subTx) {
        console.error("Could not submit transaction.");
        return null;
    }
    console.log("Transaction submitted: " + subTx);
    return subTx;
};

/**
 * 
 * @param {*} tx 
 * @remarks print a link to the transaction on the ergo explorer
 */
const getTxLink = (tx) => {
    console.log(`https://explorer.ergoplatform.com/en/transactions/${tx}`);
};

const setupWalletForGame = async () => {

    if(!checkChangeAddressSaved()) {
        await connect();
    }
    else { // User has not already accepted, so we don't want to send a popup
        return;
    }
}

const saveChangeAddress = async () => {
    let addr = await getAddress();
    localStorage.setItem('userWallet', addr);
};

const checkChangeAddressSaved = () => {
    return ('userWallet' in localStorage);
};
await setupWalletForGame();

document.getElementById('wallet').addEventListener('click', () => {
    connect();
});