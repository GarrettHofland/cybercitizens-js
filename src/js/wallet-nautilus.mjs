"use strict";
let wasm;
import("ergo-lib-wasm-browser").then((res) => (wasm = res));
import JSONBigInt from "json-bigint";
import {
    parseUnsignedTx
  } from "./parseUtils.js";
import { 
    currentHeight 
} from "./ergo-lib/explorer.js";

const NANO_ERG = 1000000000;
const MIN_ERG_FEE = 0.001;
const FEE_PERCENT = 0.001; // 0.1%
const FEE_ADDRESS = "9ep7QhRWxW1meuqbAYWm1AqQv4qQY4smu2nL3ryqUNrbf3zHHmK";
const PP_REF = "ERGOFund Donation Tool";
const txFee = 1000000;

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
    console.log(parsed);
    return parsed;
};

/**
 * 
 * @param {number} amount 
 * @returns fee to the receiver of using this service to process a transaction
 */
 export const computeFee = (amount) => {
    var feeFloat = MIN_ERG_FEE;
    if (feeFloat < amount * FEE_PERCENT) {
      feeFloat = amount * FEE_PERCENT;
    }
    return feeFloat;
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
 * @param {*} erg 
 * @returns amount of ERG from nanoERG
 */
const nanoToERG = (nanoErg) => {
  try {
    return nanoErg / NANO_ERG
  } catch (err) {
    return err;
  }
}

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
    console.log(checkChangeAddressSaved());

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

/**
 * 
 * @param {address, changeAddress, amount} 
 * @returns false if the transaction is not processed, otherwise the tx id is printed to console for the time being
 */
//  export const sendTransaction = async ({
//     address,
//     changeAddress,
//     amount
//   }) => {
export const sendTransaction = async () => {
    const changeAddress = await getAddress();
    const address = '9g5tGeBUZqiTmv7FSFoqMCyq9NdgC6rAxZTFRCgVuybtRSaQGT4';
    const creationHeight = await currentHeight();
    const currency = "ERG";
    const amount = 1;
    const amountFloat = parseFloat(amount);
    console.log("change address:" + changeAddress);
    console.log("receiv address:" + address);
  
    const feeFloat = computeFee(currency, amountFloat);
    //console.log("inputs:", address, currency, amountFloat, ref, feeFloat);
  
    console.log("Amt float: " + amountFloat + ", fee float: " + feeFloat);
  
    // Prepare total ergs and/or SIGUSD to send
    var globalNanoErgsToSendInt = BigInt(Math.round(amountFloat * NANO_ERG));
    console.log(globalNanoErgsToSendInt);
    var tokens = new wasm.Tokens();
    if (currency == "SIGUSD") {
      if (feeFloat > 0) {
        globalNanoErgsToSendInt = BigInt(2 * MIN_ERG_BOX_VALUE);
      } else {
        globalNanoErgsToSendInt = BigInt(MIN_ERG_BOX_VALUE);
      }
      tokens.add(
        new wasm.Token(
          wasm.TokenId.from_str(SIGUSD_TOKENID),
          wasm.TokenAmount.from_i64(
            wasm.I64.from_str(Math.round(amountFloat * 100).toString())
          )
        )
      );
    }
  
    // Get the input boxes from the connected wallet
    const utxos = await getAllUtxos();
    const selector = new wasm.SimpleBoxSelector();
    const globalNanoErgsToSend = wasm.BoxValue.from_i64(
      wasm.I64.from_str(globalNanoErgsToSendInt.toString())
    );
    let boxSelection = {};
    try {
      boxSelection = selector.select(
        wasm.ErgoBoxes.from_boxes_json(utxos),
        wasm.BoxValue.from_i64(
          globalNanoErgsToSend
          .as_i64()
          .checked_add(wasm.TxBuilder.SUGGESTED_TX_FEE().as_i64())
        ),
        tokens
      );
    } catch (e) {
      let msg = "[Wallet] Error: ";
      if (JSON.stringify(e).includes("BoxValue out of bounds")) {
        msg = msg + "Increase the Erg amount to process the transaction. ";
      }
      console.log(e);
      return null;
    }
    //console.log('boxSelection: ', boxSelection.boxes().len());
  
    // Prepare the output boxes
    const outputCandidates = wasm.ErgoBoxCandidates.empty();
  
    // Build the seller output box
    var ergsStr = Math.round((amountFloat - feeFloat) * NANO_ERG).toString();
    var ergsAmountBoxValue = wasm.BoxValue.from_i64(wasm.I64.from_str(ergsStr));
    var sellerTokenAmount = 0;
    if (currency == "SIGUSD") {
      ergsAmountBoxValue = wasm.BoxValue.from_i64(
        wasm.I64.from_str(MIN_ERG_BOX_VALUE.toString())
      );
    }
    console.log(ergsAmountBoxValue + " box value for seller box");
    //console.log('ergsStr', ergsStr);
    const sellerBoxBuilder = new wasm.ErgoBoxCandidateBuilder(
      ergsAmountBoxValue,
      wasm.Contract.pay_to_address(wasm.Address.from_base58(address)),
      creationHeight
    );
    if (currency == "SIGUSD") {
      sellerTokenAmount = Math.round((amountFloat - feeFloat) * 100);
      sellerBoxBuilder.add_token(
        wasm.TokenId.from_str(
          "03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04"
        ),
        wasm.TokenAmount.from_i64(
          wasm.I64.from_str(BigInt(sellerTokenAmount).toString())
        )
      );
    }
    // Add the registers
    // R4 provided in input by the seller to identify the transaction from the generated link
    // R5 as a reference of the payment portal
    const byteArray = new TextEncoder().encode("Cybercitizens test tx");
    const encodedRef = new Uint8Array(byteArray.buffer);
    sellerBoxBuilder.set_register_value(
      4,
      wasm.Constant.from_byte_array(encodedRef)
    );
    const ppRegister = new TextEncoder().encode(PP_REF);
    const encodedPpRegister = new Uint8Array(ppRegister.buffer);
    sellerBoxBuilder.set_register_value(
      5,
      wasm.Constant.from_byte_array(encodedPpRegister)
    );
    //console.log('R4:', new TextDecoder().decode(sellerBoxBuilder.register_value(4).to_byte_array()));
    //console.log('R5:', new TextDecoder().decode(sellerBoxBuilder.register_value(5).to_byte_array()));
    try {
      outputCandidates.add(sellerBoxBuilder.build());
    } catch (e) {
      console.log(`building error: ${e}`);
      throw e;
    }
  
    // Build the fee output box
    if (feeFloat > 0) {
      const feeStrNano = Math.round(feeFloat * NANO_ERG).toString();
      var feeAmountBoxValue = wasm.BoxValue.from_i64(
        wasm.I64.from_str(feeStrNano)
      );
      if (currency == "SIGUSD") {
        feeAmountBoxValue = wasm.BoxValue.from_i64(
          wasm.I64.from_str(MIN_ERG_BOX_VALUE.toString())
        );
      }
      const feeBoxBuilder = new wasm.ErgoBoxCandidateBuilder(
        feeAmountBoxValue,
        wasm.Contract.pay_to_address(wasm.Address.from_base58(FEE_ADDRESS)),
        creationHeight
      );
      if (currency === "SIGUSD") {
        const feeNanoErgToSend = Math.round(feeFloat * 100);
        feeBoxBuilder.add_token(
          wasm.TokenId.from_str(
            "03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04"
          ),
          wasm.TokenAmount.from_i64(
            wasm.I64.from_str(feeNanoErgToSend.toString())
          )
        );
      }
      try {
        outputCandidates.add(feeBoxBuilder.build());
      } catch (e) {
        console.log(`building error: ${e}`);
        throw e;
      }
    }
  
    // Create the transaction
    const txBuilder = wasm.TxBuilder.new(
      boxSelection,
      outputCandidates,
      creationHeight,
      wasm.TxBuilder.SUGGESTED_TX_FEE(),
      wasm.Address.from_base58(changeAddress),
      wasm.BoxValue.SAFE_USER_MIN()
    );
    const dataInputs = new wasm.DataInputs();
    txBuilder.set_data_inputs(dataInputs);
    const tx = parseUnsignedTx(txBuilder.build().to_json());
    //console.log(`tx: ${JSONBigInt.stringify(tx)}`);
  
    const correctTx = parseUnsignedTx(
      wasm.UnsignedTransaction.from_json(JSONBigInt.stringify(tx)).to_json()
    );
    // Put back complete selected inputs in the same order
    correctTx.inputs = correctTx.inputs.map((box) => {
      //console.log(`box: ${JSONBigInt.stringify(box)}`);
      const fullBoxInfo = utxos.find((utxo) => utxo.boxId === box.boxId);
      return {
        ...fullBoxInfo,
        extension: {},
      };
    });
    //console.log(`correctTx: ${JSONBigInt.stringify(correctTx)}`);
  
    console.log("Transaction waiting to be processed and signed...");
  
    // Send transaction for signing
    processTx(correctTx).then((txId) => {
      console.log("[txId]", txId);
      if (txId) {
        getTxLink(txId);
        // Display success modal here
      }
    });
    return false;
  };

await setupWalletForGame();

document.getElementById('wallet').addEventListener('click', () => {
    connect();
});

document.getElementById('sendTx').addEventListener('click', () => {
    console.log("click");
    sendTransaction();
});