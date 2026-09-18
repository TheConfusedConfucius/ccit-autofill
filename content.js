console.log("LAN AUtofill loaded")

let usernameField = document.getElementById("username")
let passwordField = document.getElementById("password")
if (usernameField && passwordField){
    let box = document.createElement("div")
    box.style.backgroundColor = "#9c751a";
    box.style.color = "white";
    box.style.fontFamily = "Arial, sans-serif";
    box.style.borderRadius = "4.20px";
    box.style.top = "67px";
    box.style.right = "69px";
    box.style.position = "fixed";
    box.style.padding="10px";
    box.style.zIndex="9999";
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.gap = "5px";
    box.textContent = "LAN AAutofill Accounts: "

    chrome.storage.local.get("accounts", function(result) {
        let accounts = result.accounts;
        if (!accounts) {
            accounts = [];
            }

        accounts.forEach(function(entry) {
            let acctBtn = document.createElement("button");
            acctBtn.textContent = entry.account;

            acctBtn.addEventListener("click", function() {
                usernameField.value = entry.username;
                passwordField.value = entry.password;
                });

            box.appendChild(acctBtn);
            });
        });
    document.body.appendChild(box)
    }
}
