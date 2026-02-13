# 🏛️ Decentralized Autonomous Organization (DAO) Governance

A full-stack DAO governance platform that enables users to create proposals and vote using a custom governance token.

This system leverages OpenZeppelin's **Governor** and **ERC20Votes** standards to implement a secure, on-chain voting mechanism.

---

## 🛠️ Tech Stack

### Smart Contracts

* Solidity
* Hardhat
* OpenZeppelin (Governor + ERC20Votes)

### Frontend

* Next.js
* Wagmi
* ConnectKit
* Tailwind CSS

### Infrastructure

* Docker
* Docker Compose

### Network Options

* Localhost (Hardhat Node)
* Sepolia Testnet

---

# 🚀 Step-by-Step Setup Guide

Follow this guide carefully to get the DAO system running.

---

## 1️⃣ Repository Setup & Environment Configuration

### Clone the Repository

```bash
git clone https://github.com/sai1432-ss/DOG-Voting
cd DOG-Voting
```

---

### Install Dependencies

Run in the project root directory:

```bash
npm install
```

This installs Hardhat and all required dependencies.

---

### Setup Environment Variables

Create your environment file:

```bash
cp .env.example .env
```

Open `.env` and configure the following:

```
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_RPC_URL=your_infura_or_alchemy_url
```

⚠️ Never commit your `.env` file.

---

## 2️⃣ Containerization (Docker)

Docker ensures the blockchain node and frontend stay synchronized.

### Start the System

```bash
docker-compose up --build
```

What happens:

* Hardhat node container starts
* Frontend container waits for blockchain health check
* Both services connect automatically

---

## 3️⃣ Smart Contract Deployment

With Docker containers running, deploy contracts to the local blockchain.

Open a new terminal and run:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

After deployment, you will see contract addresses printed in the terminal:

* GovernanceToken address
* MyGovernor address

---

### Link Contracts to Frontend

Copy the deployed addresses and paste them into:

```
frontend/src/constants/index.js
```

Update:

```javascript
export const GOVERNANCE_TOKEN_ADDRESS = "PASTE_TOKEN_ADDRESS";
export const GOVERNOR_ADDRESS = "PASTE_GOVERNOR_ADDRESS";
```

---

## 4️⃣ MetaMask Configuration

Your MetaMask must connect to your local Hardhat network.

### Add Network

* Network Name: Localhost 8545
* RPC URL: [http://127.0.0.1:8545](http://127.0.0.1:8545)
* Chain ID: 31337
* Currency Symbol: ETH

---

### Reset Network (Important)

If you've used this network before:

MetaMask → Settings → Advanced → Clear activity tab data

This prevents nonce conflicts.

---

## 5️⃣ Activating Your Voting Power

Owning tokens alone does NOT grant voting power.
You must delegate tokens to yourself.

---

### Open Hardhat Console

```bash
npx hardhat console --network localhost
```

---

### Activation Script

Run the following inside the console:

```javascript
const token = await ethers.getContractAt(
  'GovernanceToken',
  'PASTE_YOUR_TOKEN_ADDRESS'
);

// Transfer tokens to your MetaMask wallet
await token.transfer(
  'YOUR_METAMASK_ADDRESS',
  ethers.parseEther('1000')
);

// Delegate voting power to yourself
await token.delegate('YOUR_METAMASK_ADDRESS');
```

Now your wallet has active voting power.

---

# 📝 Usage Guide

## Dashboard

* View your token balance
* View your voting power

---

## Create Proposal

* Enter proposal description
* Submit transaction
* Wait for mining confirmation

---

## Vote on Proposal

* Select proposal
* Cast vote (For / Against / Abstain)
* Confirm via MetaMask

---

# 📂 Project Structure

```
.
├── contracts/
├── scripts/
├── frontend/
├── docker-compose.yml
├── hardhat.config.js
├── .env.example
└── README.md
```




# ⭐ What This Project Demonstrates

* On-chain governance using OpenZeppelin Governor
* ERC20Votes delegation mechanism
* Full-stack Web3 integration
* Dockerized blockchain + frontend sync
* Hardhat local development workflow

---

