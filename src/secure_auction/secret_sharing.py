"""
Secret sharing utilities for the secure auction system.
"""

import random
from .constants import PRIME

def generate_shares(secret, num_shares):
    """
    Generate shares that sum to the secret (mod PRIME).
    
    Args:
        secret: The secret value to share
        num_shares: Number of shares to generate
        
    Returns:
        List of shares that sum to the secret in modulo PRIME
    """
    shares = [random.randint(0, PRIME-1) for _ in range(num_shares - 1)]
    final_share = (secret - sum(shares)) % PRIME
    shares.append(final_share)
    return shares

def lagrange_interpolation(x_values, y_values, prime):
    """
    Reconstruct the secret using Lagrange interpolation.
    
    Args:
        x_values: List of x-coordinates (server indices)
        y_values: List of y-coordinates (server sums)
        prime: Prime modulus for finite field arithmetic
        
    Returns:
        Reconstructed secret
    """
    secret = 0
    for i in range(len(y_values)):
        xi, yi = x_values[i], y_values[i]

        # Compute Lagrange basis polynomial λ_i
        numerator, denominator = 1, 1
        for j in range(len(x_values)):
            if i != j:
                xj = x_values[j]
                numerator *= -xj
                denominator *= (xi - xj)

        # Compute modular inverse of denominator
        denominator_inv = pow(denominator, -1, prime)
        
        # Add contribution to secret
        secret += yi * numerator * denominator_inv
        secret %= prime  # Ensure result is in valid field

    return secret