const { ethers, upgrades } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const Coin = await ethers.getContractFactory("Coin");
  // Deploy upgradeable contract
  const coin = await upgrades.deployProxy(
    Coin,
    ["Coin", "COIN", ethers.utils.parseEther("1000000")], // Example: 1,000,000 tokens
    { kind: "uups" }
  );
  await coin.deployed();

  console.log("Coin Proxy deployed to:", coin.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
