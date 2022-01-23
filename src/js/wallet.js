const walletButton = document.getElementById("wallet");
const walletMenu = document.getElementById("wallet-connector");
const walletOutput = document.getElementById("wallet-output");
const exit = document.getElementById("exit");
const clear = document.getElementById("clear");
const finish = document.getElementById("finish");
const walletInput = document.getElementById("user-address");

if (finish) {
    finish.disabled = true;
    finish.style.backgroundColor = "grey";
}

walletButton.addEventListener('click', () => {
    if (getWalletAddress() != null) {
        walletInput.value = getWalletAddress();
        walletOutput.textContent = "Wallet set."
        walletOutput.style.color = "green";
    }
    walletMenu.classList.toggle("open");
});

const closeWalletMenu = () => {
    walletMenu.classList.toggle("open");
    if (getWalletAddress() == null) {
        walletOutput.textContent = "Invalid wallet address.";
        walletOutput.style.color = "red";
        walletInput.value = "";
    }
}

const clearWalletAddress = () => {
    removeWalletAddress();
    walletOutput.textContent = "Wallet information cleared.";
    walletOutput.style.color = "green";
    walletInput.value = "";
    finish.disabled = true;
    finish.style.backgroundColor = "grey";
}

const setWalletAddress = () => {
    localStorage.setItem("userWallet", walletInput.value);
    walletOutput.textContent = "Wallet set.";
    walletOutput.style.color = "green";
    setTimeout(window.location.reload(true), 0.5)
}

const removeWalletAddress = () => {
    localStorage.removeItem("userWallet");
}

const getWalletAddress = () => {
    return localStorage.getItem("userWallet");
}

const validateWalletAddress = () => {
    if (walletInput.value.match(/^9[A-Za-z0-9]{50}/)) {
        walletOutput.textContent = "Wallet address valid.";
        walletOutput.style.color = "green";
        finish.disabled = false;
        finish.style.backgroundColor = "#258ae8";
    } else {
        walletOutput.textContent = "Invalid wallet address.";
        walletOutput.style.color = "red";
        finish.disabled = true;
        finish.style.backgroundColor = "grey";
    }
}

exit.addEventListener('click', closeWalletMenu);
clear.addEventListener('click', clearWalletAddress);
finish.addEventListener('click', setWalletAddress);
walletInput.addEventListener('input', validateWalletAddress);
