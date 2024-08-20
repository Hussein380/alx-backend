#!/usr/bin/env python3
""" FIFO caching module
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOCache class
    Implements a caching system using the FIFO (First-In, First-Out) strategy.
    """

    def __init__(self):
        """ Initialize the FIFO cache system
        """
        super().__init__()  # Call the parent class's initializer
        self.order = []  # List to track the order of keys for FIFO

    def put(self, key, item):
        """ Add an item to the cache
        If key or item is None, do nothing.

        Args:
            key: The key to store in the cache.
            item: The value to associate with the key.
        """
        if key is None or item is None:
            return

        # If the key is already in the cache, remove it to update its position
        if key in self.cache_data:
            self.order.remove(key)

        # Add the key-value pair to the cache
        self.cache_data[key] = item
        # Track the key insertion order
        self.order.append(key)

        # If the cache exceeds the maximum limit, remove the first added item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # The first key in the order list is the oldest (FIFO)
            first_key = self.order.pop(0)
            del self.cache_data[first_key]
            print(f"DISCARD: {first_key}")

    def get(self, key):
        """ Retrieve an item from the cache
        If key is None or doesn't exist in the cache, return None.

        Args:
            key: The key whose value needs to be retrieved.

        Returns:
            The value associated with the key, or None if the key doesn't xst
        """
        if key is None:
            return None
        return self.cache_data.get(key)
