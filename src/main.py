"""
Main entry point for the secure auction system.
"""

from secure_auction import SecureAuction, lagrange_interpolation, PRIME

def run_example_auction():
    """Run an example auction with user input."""
    # Create a new auction
    auction = SecureAuction()
    
    # Get user input for bids
    print("Welcome to the Secure Auction System")
    print("------------------------------------")
    
    while True:
        try:
            farmer_id = input("\nEnter farmer name (or press Enter to finish): ")
            if not farmer_id:
                break
                
            bid = int(input(f"Enter bid for {farmer_id} (1-6): "))
            if bid < 1 or bid > 6:
                print("Bid must be between 1 and 6. Please try again.")
                continue
                
            auction.add_bid(farmer_id, bid)
            print(f"Bid added for {farmer_id}")
        except ValueError:
            print("Invalid input. Please enter a number for the bid.")
    
    if not auction.bids:
        print("\nNo bids were entered. Exiting.")
        return
    
    # Run the auction
    winner = auction.run_auction()
    results = auction.get_results()
    
    # Display results
    print("\n--- Secret Shares Distributed to Servers ---")
    for i, shares in auction.server_shares.items():
        print(f"Server {i+1} shares: {shares}")

    print("\n--- Local Computations at Servers ---")
    for i, sum_value in enumerate(auction.server_sums):
        print(f"Server {i+1} computed sum: {sum_value}")

    print("\n--- Securely Computed Maximum Bid ---")
    print(f"The highest bid is: {results['max_bid']}")

    print("\n--- Securely Selected Winner ---")
    print(f"The winner is: {results['winner']}")
    
    # Demonstrate reconstruction using Lagrange interpolation
    server_indices = [i+1 for i in range(len(auction.server_sums))]  # Server IDs (1-based)
    recovered_bid = lagrange_interpolation(server_indices, auction.server_sums, PRIME)
    
    print("\n--- Secret Reconstruction using Lagrange Interpolation ---")
    print(f"Reconstructed Maximum Bid: {recovered_bid}")

if __name__ == "__main__":
    run_example_auction()