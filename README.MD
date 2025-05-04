# Decentralized Supply Chain Management System

A decentralized supply chain management system leveraging blockchain technology for enhanced transparency, traceability, and security across logistics and transactions.

---

## Table of Contents

* [Features](#features)
* [Technology Stack](#technology-stack)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Configuration](#configuration)
* [Usage](#usage)

  * [Deploy Smart Contracts](#deploy-smart-contracts)
  * [Run Backend](#run-backend)
* [Smart Contract Interfaces](#smart-contract-interfaces)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

---

## Features

* **Immutable Ledger**: All supply chain events (manufacturing, shipping, receiving) are recorded as transactions on the blockchain.
* **End-to-End Traceability**: Track the provenance and ownership history of each asset from origin to destination.
* **Role-Based Access Control**: Different user roles (Manufacturer, Transporter, Distributor, Retailer) with scoped permissions.
* **Event Logging**: Record status updates (e.g., `Created`, `InTransit`, `Delivered`) for each asset.
* **Off-Chain Data Storage**: Store large or sensitive documents (e.g., certificates, compliance reports) in a scalable off-chain database (MongoDB) and link them on-chain.
* **Secure Transactions**: Leverages Ethereum-compatible smart contracts and digital signatures to ensure data integrity.

---

1. **Backend**: Node.js + Express API server using Ethers.js to interact with smart contracts, and MongoDB for off-chain data.
2. **Blockchain**: Solidity contracts deployed via Hardhat on an EVM-compatible network (public or private).
3. **Off-Chain Storage**: MongoDB database for large files and user profiles.

---

## Technology Stack

* **Smart Contracts**: Solidity, Hardhat
* **Blockchain Interaction**: Ethers.js
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose)

---

## Prerequisites

* Node.js (v14+)
* npm or Yarn
* MongoDB (local or hosted)
* Hardhat
* Ganache (optional) or any local Ethereum node
* MetaMask (for frontend wallet interactions)

---

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/onoja123/blockchain-scm-system.git

   cd blockchain-scm-system
   ```

2. **Install dependencies**

   ```bash
   # Backend
   npm install

   # Smart contracts & scripts
   cd contracts
   ```

---

## Configuration

Create an `.env` file in the `blockchain-scm-system` directory:

```ini
# .env (backend)
PORT=3000
MONGODB_URI=mongodb://localhost:27017/supplychain
RPC_URL=http://localhost:8545
CONTRACT_ADDRESS=0xYourDeployedContractAddress
MNEMONIC="your twelve word mnemonic"

```

---

## Usage

### Deploy Smart Contracts

1. Start a local blockchain:

   ```bash
   npx hardhat node
   ```

2. Deploy contracts:

   ```bash
   cd contracts
   npx hardhat run scripts/deploy.js --network localhost
   ```

3. Note the deployed contract address and update `blockchain-scm-system/.env:CONTRACT_ADDRESS`.

### Run Backend

```bash
cd backend
npm run dev
```

* The API server will start at `http://localhost:3000`.

---

## Smart Contract Interfaces

* **AssetRegistry.sol**: Core contract for asset lifecycle management.
* **EventLogger.sol**: Secondary contract for event logging per asset.

ABIs are located in `backend/abis/` after deployment.

---


## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/YourFeature`
3. Commit your changes: `git commit -m "feat: Describe your feature"`
4. Push to the branch: `git push origin feature/YourFeature`
5. Open a Pull Request

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

Maintainer: Okpe Onoja ([okpeonoja18@gmail.com](mailto:your.email@example.com))
GitHub: \[[your-org/decentralized-supply](https://github.com/onoja123)
