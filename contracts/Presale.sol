// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Presale
 * @dev This contract allows users to buy the "Coin" token during a presale phase.
 *      Funds (in MATIC or ETH on other networks) are collected and can be withdrawn by owner.
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Presale is Ownable {
    IERC20 public coin;
    uint256 public pricePerToken; // Price per token in wei
    bool public saleActive;
    uint256 public totalSold;

    event TokensPurchased(address indexed buyer, uint256 amount, uint256 cost);
    event SaleActiveStatusChanged(bool newStatus);
    event Withdrawn(address indexed owner, uint256 amount);

    constructor(IERC20 _coin, uint256 _pricePerToken) {
        coin = _coin;
        pricePerToken = _pricePerToken;
        saleActive = false;
    }

    /**
     * @notice Buys tokens if the presale is active and enough tokens are available
     */
    function buyTokens(uint256 amountToBuy) external payable {
        require(saleActive, "Sale not active");
        require(msg.value == amountToBuy * pricePerToken, "Incorrect payment");

        // Transfer the tokens to the buyer
        coin.transfer(msg.sender, amountToBuy);

        totalSold += amountToBuy;
        emit TokensPurchased(msg.sender, amountToBuy, msg.value);
    }

    /**
     * @notice Owner can toggle the sale activity
     */
    function setSaleActive(bool _saleActive) external onlyOwner {
        saleActive = _saleActive;
        emit SaleActiveStatusChanged(_saleActive);
    }

    /**
     * @notice Withdraw funds from contract
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Withdraw failed");
        emit Withdrawn(owner(), balance);
    }

    /**
     * @notice Allows the owner to set a new token price
     */
    function setPrice(uint256 _newPrice) external onlyOwner {
        pricePerToken = _newPrice;
    }
}
