let accessGranted = false;

window.onload = function(){
    window.scrollTo(0,0);
    document.getElementById("wallet").addEventListener("click", function(){
        try {
            ergo_request_read_access().then(access => {
                if(access) {
                    ergo.get_used_addresses().then(addresses => {
                        addresses.forEach(addr => {
                            document.getElementById('userWallet').innerText = "Address: " + addr;
                        });
                    });
                }
                else {
                    document.getElementById('userWallet').innerText = "Error occured while connecting wallet, please ensure you have Yoroi Nightly and Yoroi DApp Connector Installed and try again.";
                }
            });
        } catch (e) {
            console.error(e);
        }
    });
}