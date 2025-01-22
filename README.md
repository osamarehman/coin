# Coin Project

A sample Hardhat project that demonstrates:

- **An Upgradeable ERC20 Token** (`Coin.sol`) using OpenZeppelin's UUPS pattern.
- **A Presale Contract** (`Presale.sol`) for selling tokens.
- **Proxy Admin** (`CoinProxyAdmin.sol`) if needed for transparent proxy or additional admin logic.
- Tests with Hardhat.

## Requirements

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Hardhat](https://hardhat.org/)
- A Polygon-compatible RPC (e.g., [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/)) if you want to deploy to testnet/mainnet.
- A private key with funds for gas (when deploying to a real network).

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/osamarehman/coin.git
   cd coin
