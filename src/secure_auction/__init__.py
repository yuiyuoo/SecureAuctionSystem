"""
Secure Auction System

A system for conducting secure auctions using secret sharing techniques.
"""

from .auction import SecureAuction
from .secret_sharing import generate_shares, lagrange_interpolation
from .constants import PRIME, NUM_SERVERS

__all__ = [
    'SecureAuction',
    'generate_shares',
    'lagrange_interpolation',
    'PRIME',
    'NUM_SERVERS'
]