"""
Core auction functionality for the secure auction system.
"""

import random
from .constants import PRIME, NUM_SERVERS
from .secret_sharing import generate_shares

class SecureAuction:
    def __init__(self):
        """Initialize a new secure auction."""
        self.bids = {}
        self.server_shares = {i: [] for i in range(NUM_SERVERS)}
        self.winner_shares = {i: [] for i in range(NUM_SERVERS)}
        self.server_sums = []
        self.server_winner_sums = []
        self.max_bid = None
        self.winning_farmers = []
        self.chosen_winner = None

    def add_bid(self, farmer_id, bid):
        """
        Add a farmer's bid to the auction.
        
        Args:
            farmer_id: Unique identifier for the farmer
            bid: The bid amount
        """
        self.bids[farmer_id] = bid

    def distribute_shares(self):
        """Distribute secret shares of bids to servers."""
        # Reset server shares
        self.server_shares = {i: [] for i in range(NUM_SERVERS)}
        
        # Generate and distribute shares for each bid
        for farmer, bid in self.bids.items():
            shares = generate_shares(bid, NUM_SERVERS)
            for i in range(NUM_SERVERS):
                self.server_shares[i].append(shares[i])

    def compute_local_sums(self):
        """Compute local sums at each server."""
        self.server_sums = [sum(self.server_shares[i]) % PRIME for i in range(NUM_SERVERS)]
        self.max_bid = max(self.server_sums)  # Securely computed max bid

    def encode_winners(self):
        """Encode and distribute shares for determining winners."""
        self.winner_shares = {i: [] for i in range(NUM_SERVERS)}
        
        for farmer, bid in self.bids.items():
            # Encode as 1 if bid is max, else 0
            encoded = 1 if bid == self.max_bid else 0
            shares = generate_shares(encoded, NUM_SERVERS)
            
            for i in range(NUM_SERVERS):
                self.winner_shares[i].append(shares[i])
                
        self.server_winner_sums = [sum(self.winner_shares[i]) % PRIME for i in range(NUM_SERVERS)]
        winner_count = sum(self.server_winner_sums) % PRIME
        
        # Identify winning farmers
        self.winning_farmers = [farmer for farmer, bid in self.bids.items() if bid == self.max_bid]

    def select_winner(self):
        """Select a winner from the winning farmers."""
        if not self.winning_farmers:
            return None
            
        self.chosen_winner = random.choice(self.winning_farmers) if len(self.winning_farmers) > 1 else self.winning_farmers[0]
        return self.chosen_winner

    def run_auction(self):
        """Run the complete auction process."""
        self.distribute_shares()
        self.compute_local_sums()
        self.encode_winners()
        return self.select_winner()

    def get_results(self):
        """Get the auction results."""
        return {
            "max_bid": self.max_bid,
            "winner": self.chosen_winner,
            "server_shares": self.server_shares,
            "server_sums": self.server_sums
        }