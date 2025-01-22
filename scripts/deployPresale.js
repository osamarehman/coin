const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying Presale contract with the account:", deployer.address);

  // Replace this with the deployed Coin address
  const coinAddress = "YOUR_DEPLOYED_COIN_PROXY_ADDRESS";

  // Price per token in wei (example: 0.01 MATIC)
  const pricePerToken = ethers.utils.parseEther("0.01");

  const Presale = await ethers.getContractFactory("Presale");
  const presale = await Presale.deploy(coinAddress, pricePerToken);

  await presale.deployed();
  console.log("Presale deployed to:", presale.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
