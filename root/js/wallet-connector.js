window.onload = function(){
    document.getElementById("wallet").addEventListener("click",function(){
        ergo_request_read_access();
    });
}