# Usage instructions

To successfully implement the codes Solidity instructions should be executed first and Instruction on ethers.js second.

# Solidity instructions:

1. Open Remix IDE (http://remix.ethereum.org) in the browser.
2. Add Metamask extension to your browser.
3. Make sure that you have 2 wallets on the BSC testnet.
4. One wallet (Owner's or Government's) account should have a sufficient amount to process the payment. The other wallet (Farmer's) can be empty as it's only used to check if the farmer received the payment.
5. Copy and paste codes from Insurance.sol to the Remix IDE.
6. Run and copy and paste the farmer's wallet address and set the payment amount to the farmer, in our case, we used 1 ether converted to Wei.
7. The same amount should be pasted to the value section in Remix IDE.
8. Deploy the contract

### Optional functions:

1. precipitationCheck function. We added this function to be used to manually input precipitation level if there is a problem with oracle. !!! Should not be used if oracle functions properly.
2. setFarmer function. We added this function to be used if there is a change in the farmer's wallet account.
3. trasferOwnership. We added this function to be used if there is a change in the government's account.

# Instruction on ethers.js

1. Make sure that you have node.js downloaded to your device.
2. Make sure that getWeather.js and package.json are in the same folder.
3. Open getWeather.js in VS Code IDE. In the terminal input "npm install" or "npm i" so that node_modules and dependencies are downloaded.
4. Input the private key of the wallet with sufficient funds (government's account) inside "". We have specified the line where you should add the private key in the getWeather.js.
5. Copy and paste the deployed contract's address which can be found under "Deployed Contracts" in Remix IDE.
6. We hardcoded the precipitation level to 50 for testing purposes. Please comment line 265 to see the real precipitation level (the line numbering may change depending on the IDE's settings. The following code should be commented "res.data.current.precip_mm = 50;").
7. Save the file.
8. Input "node getWeather" in terminal to run the codes.

# Books and sources we used to write codes:

Solidity documentation:
https://docs.soliditylang.org/

Ethers.js documentation:
https://docs.ethers.org

OpenZeppelin Library:
https://github.com/OpenZeppelin/openzeppelin-contracts

Mastering Blockchain Programming with Solidity by Jitendra Chittoda (2019):
https://learning.oreilly.com/library/view/mastering-blockchain-programming/9781839218262/

Solidity by example website:
https://solidity-by-example.org/

Stack Ecxchange Network:
https://ethereum.stackexchange.com/

WeatherAPI documentation:
https://www.weatherapi.com/docs/

### Codes used in Insurance.sol

[1] Poly Network libs -> Ownable.sol:
https://github.com/polynetwork/eth-contracts/blob/master/contracts/libs/ownership/Ownable.sol

[2] OpenZeppelin Library -> SafeMath.sol:
https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/math/SafeMath.sol

### Codes used in getWeather.js

We used Ethers.js documentation to write and adapt codes to our project:
https://docs.ethers.org/v5/getting-started/

### Resources used in getWeather.js

[1] BscScan Public RPC Nodes:
https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes

[2] In Metamask click to account details -> Export private key -> Enter the password -> copy and paste the private key (the account with funds should be used).
