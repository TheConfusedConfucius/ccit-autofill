let accountInput = document.getElementById("Account");
let usernameInput = document.getElementById("Username");
let passwordInput = document.getElementById("Password");
let saveButton = document.getElementById("saveBtn");
function renderAccounts() {
    chrome.storage.local.get("accounts", function(result) {
        let accounts = result.accounts;
        if (!accounts) {
            accounts = [];
        }

        let listDiv = document.getElementById("accountList");
        listDiv.textContent = "";

        accounts.forEach(function(entry, index) {
            let row = document.createElement("div");
            row.textContent = entry.account + " ";
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.addEventListener("click", function() {
                accounts.splice(index, 1);
                chrome.storage.local.set({ accounts: accounts });
                renderAccounts();
                });
            row.appendChild(deleteBtn);
            listDiv.appendChild(row);
            });

    });
}
saveButton.addEventListener("click", function(){
    let account = accountInput.value;
    if (account.trim() === "") {
        return;
        }
    let username = usernameInput.value;
    let password = passwordInput.value;

    let newEntry = { account: account, username: username, password: password};

    chrome.storage.local.get("accounts", function(result) {
    let accounts = result.accounts;
    if (!accounts) {
        accounts = [];
    }
    accounts.push(newEntry);
    chrome.storage.local.set({ accounts: accounts });
    accountInput.value = "";
    usernameInput.value = "";
    passwordInput.value="";
    renderAccounts();
});
});
renderAccounts();