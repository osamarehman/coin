const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Coin (UUPS)", function () {
  let Coin;
  let coin;
  let owner;
  let addr1;

  before(async function () {
    [owner, addr1] = await ethers.getSigners();
    Coin = await ethers.getContractFactory("Coin");
  });

  beforeEach(async function () {
    // Deploy the upgradeable contract
    coin = await upgrades.deployProxy(
      Coin,
      ["Coin", "COIN", ethers.utils.parseEther("1000000")],
      { kind: "uups" }
    );
    await coin.deployed();
  });

  it("Should have the correct name, symbol, and total supply", async function () {
    expect(await coin.name()).to.equal("Coin");
    expect(await coin.symbol()).to.equal("COIN");
    expect(await coin.totalSupply()).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Owner should have the initial supply", async function () {
    const ownerBalance = await coin.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow transfers", async function () {
    await coin.transfer(addr1.address, ethers.utils.parseEther("100"));
    const addr1Balance = await coin.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("100"));
  });
});
