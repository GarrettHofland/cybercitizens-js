let accessGranted = false;

window.onload = function(){  
    ergo_request_read_access().then(access => {
        if(access) {
            ergo.get_used_addresses().then(addresses => {
                    addresses.forEach(addr => {
                    console.log(addr);
                });
            });
        }
        else {
            console.log("Access not Granted");
        }
    });
}   