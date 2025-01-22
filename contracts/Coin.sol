// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

/**
 * @title Coin (Upgradeable ERC20)
 * @dev Implementation of an ERC20 token using OpenZeppelin upgradeable libraries.
 *      We'll use ERC20Upgradeable, OwnableUpgradeable, and UUPSUpgradeable.
 */

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract Coin is ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {
    /**
     * @dev Only the owner can authorize an upgrade.
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}

    /**
     * @dev Initialize the contract.
     *      Replaces constructor in upgradeable contracts.
     */
    function initialize(string memory name, string memory symbol, uint256 initialSupply) public initializer {
        __ERC20_init(name, symbol);
        __Ownable_init();
        __UUPSUpgradeable_init();

        _mint(msg.sender, initialSupply);
    }
}
