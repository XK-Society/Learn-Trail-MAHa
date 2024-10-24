# Learn Trail - MAHa- Telegram Mini App Hackathon Project

## Overview

Learn Trail is an interactive learning platform built in MAHa- Telegram Mini App Hackathon. It combines blockchain technology with educational content to create an engaging and rewarding learning experience.

## Features

- Interactive quizzes on Web3 and blockchain topics
- Token rewards for completing quizzes
- Progress tracking using smart contracts
- Integration with Base network for low-cost, high-speed transactions

## Smart Contracts
https://github.com/XK-Society/learntrail-base-contract

### EnhancedQuizContract

The core of Learn Trail is the `QuizContract`, which manages quizzes, user attempts, and reward distribution.

Key features:
- Quiz creation and management
- User attempt tracking
- Reward calculation and distribution
- Cooldown period enforcement

### TRAIL Token

TRAIL is an ERC20 token used for rewarding users who complete quizzes successfully.

## Technical Stack

- Solidity: Smart contract development
- React: Frontend framework
- Web3.js: Ethereum JavaScript API
- Hardhat: Development environment
- Base Network: L2 scaling solution

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn
- MetaMask or Coinbase Wallet browser extension

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/XK-Society/Learn-Trail-MAHa.git
   cd learn-trail
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add:
   ```
   REACT_APP_CONTRACT_ADDRESS=your_deployed_contract_address
   REACT_APP_TRAIL_TOKEN_ADDRESS=your_trail_token_address
   ```

4. Start the development server:
   ```
   npm run dev
   ```

### Smart Contract Deployment


1. Configure Hardhat for Base Sepolia:
   Update `hardhat.config.js` with your network settings and private key.

2. Deploy contracts:
   ```
   npx hardhat run scripts/deploy.js --network baseSepolia
   ```

3. Verify contracts:
   ```
   npx hardhat verify --network baseSepolia DEPLOYED_CONTRACT_ADDRESS "TRAIL_TOKEN_ADDRESS" "INITIAL_OWNER_ADDRESS"
   ```

## Usage

1. Connect your wallet (MetaMask or Coinbase Wallet) to the Base Sepolia network.
2. Navigate through the learning modules.
3. Complete quizzes to earn TRAIL tokens.
4. View your progress and rewards in the user dashboard.

## Contributing

We welcome contributions to Learn Trail! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Base team for providing the L2 infrastructure
- OpenZeppelin for secure smart contract libraries
- The entire Base SEA Hackathon community