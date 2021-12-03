import * as wasm from "ergo-lib-wasm-browser";

if(document.querySelector("#wallet")) {
    document.querySelector("#wallet").onclick = function() {
        alert("Wallet connector");
    }
}