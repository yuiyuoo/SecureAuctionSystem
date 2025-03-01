# Secure Auction System

A privacy-preserving auction system using secret sharing techniques to determine the highest bid and winner without revealing individual bids.

## Overview

This system implements a secure auction protocol using additive secret sharing in a finite field. The key features include:

- **Bid Privacy**: Individual bids remain private throughout the auction process
- **Secure Computation**: The maximum bid is computed without revealing any individual bid
- **Winner Selection**: A winner is securely selected among those with the highest bid
- **Modular Design**: Clean separation of concerns with reusable components

## Project Structure

```
src/
├── secure_auction/
│   ├── __init__.py
│   ├── auction.py       # Core auction functionality
│   ├── constants.py     # System constants
│   └── secret_sharing.py # Secret sharing utilities
├── main.py              # Command-line example
└── demo_ui.py           # React-based UI demo
```

## How It Works

1. **Secret Sharing**: Each bid is split into shares that sum to the bid (modulo a prime)
2. **Distributed Computation**: Servers compute local sums of their shares
3. **Maximum Determination**: The maximum bid is determined from server sums
4. **Winner Selection**: A winner is selected among farmers with the highest bid

## Mathematical Background

The system uses:
- **Additive Secret Sharing**: Splitting values into shares that sum to the original value
- **Finite Field Arithmetic**: Operations performed modulo a prime number
- **Lagrange Interpolation**: For reconstructing secrets from shares

## Usage

Run the example auction:

```bash
python src/main.py
```

To use the React-based demo UI:

```bash
npm run dev
```

## Security Considerations

- This implementation uses a small prime (7) for educational purposes
- In a production system, use a larger prime for better security
- The system assumes honest-but-curious servers that follow the protocol# SecureAuctionSystem
# SecureAuctionSystem
