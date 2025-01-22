const { expect } = require("chai");
const { ethers, upgrades } = require("hardhat");

describe("Presale Contract", function () {
  let owner, buyer, anotherAccount;
  let Coin, coin, Presale, presale;

  before(async function () {
    [owner, buyer, anotherAccount] = await ethers.getSigners();
    Coin = await ethers.getContractFactory("Coin");
    Presale = await ethers.getContractFactory("Presale");
  });

  beforeEach(async function () {
    // Deploy the coin upgradeable contract
    coin = await upgrades.deployProxy(
      Coin,
      ["Coin", "COIN", ethers.utils.parseEther("1000000")],
      { kind: "uups" }
    );
    await coin.deployed();

    // Deploy the presale contract
    const pricePerToken = ethers.utils.parseEther("0.01");
    presale = await Presale.deploy(coin.address, pricePerToken);
    await presale.deployed();

    // Transfer some tokens from owner to presale contract so it can sell them
    await coin.transfer(presale.address, ethers.utils.parseEther("100000"));
  });

  it("Should not allow purchases if sale is inactive", async function () {
    await expect(
      presale.connect(buyer).buyTokens(100)
    ).to.be.revertedWith("Sale not active");
  });

  it("Should allow owner to enable the sale", async function () {
    await presale.setSaleActive(true);
    expect(await presale.saleActive()).to.equal(true);
  });

  it("Should allow token purchases when sale
