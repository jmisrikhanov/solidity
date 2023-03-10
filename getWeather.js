const { ethers } = require("ethers");
const axios = require("axios");

// Hosting provider is retrieved from [1]
const provider = new ethers.providers.JsonRpcProvider(
  "https://data-seed-prebsc-1-s1.binance.org:8545"
);

// Should be retrieved from [2]
const private_key = "YOUR WALLET PRIVATE KEY";
const signer = new ethers.Wallet(private_key, provider);
``;
const insuranceAddress = "Deployed Contract Address";
const insuranceABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_paymentAmount",
        type: "uint256",
      },
    ],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_precipitation",
        type: "uint256",
      },
    ],
    name: "acceptedData",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "_paymentTime",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_totalTransferAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_thresholdPrecipitation",
        type: "uint256",
      },
    ],
    name: "transferCompleted",
    type: "event",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractStartDate",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getCurrentPrecipitation",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getFarmer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getPaymentAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getResetValue",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_precipitation",
        type: "uint256",
      },
    ],
    name: "precipitationCheck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "precipitationThreshold",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_farmer",
        type: "address",
      },
    ],
    name: "setFarmer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const insuranceContract = new ethers.Contract(
  insuranceAddress,
  insuranceABI,
  signer
);

async function getWeather() {
  try {
    axios
      .get(
        // getting precipitation
        "https://api.weatherapi.com/v1/current.json?key=22abc6c3561348209e884019231003&q=Dhaka"
      )
      .then(async (res) => {
        // Use the weather data to interact with the Solidity smart contract
        res.data.current.precip_mm = 50;
        console.log("current precipitation: ", res.data.current.precip_mm);
        // if the precipitation level is higher than threshold then data sent to contract
        if (res.data.current.precip_mm >= 50) {
          console.log("current precipitation: ", res.data.current.precip_mm);
          const precipitation = res.data.current.precip_mm.toFixed(0);
          const tx = await insuranceContract.precipitationCheck(precipitation);
          console.log(tx.hash);
        }
      })
      .catch((error) => console.error(error));
  } catch (err) {
    console.log(err);
  }
}

var delay = 60 * 60 * 1000; // one hour delay

getWeather();
setInterval(() => {
  getWeather();
}, delay);
