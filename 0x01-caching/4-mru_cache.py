#!/usr/bin/env python3
""" MRU Caching """

from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """ MRUCache defines a caching system using Most Recently Used alg"""

    def __init__(self):
        """ Initialize MRUCache """
        super().__init__()
        # Initialize a list to keep track of the order of keys
        self.order = []

    def put(self, key, item):
        """ Assign to the dictionary self.cache_data the item value"""
        if key is None or item is None:
            return
        # Update or add the item in the cache
        self.cache_data[key] = item
        # If the key is already in the order list, remove it first
        if key in self.order:
            self.order.remove(key)
        # Append the key to the end of the order list
        self.order.append(key)
        # Check if we need to discard the most recently used item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # Remove the most recently used item
            mru_key = self.order.pop(-1)
            del self.cache_data[mru_key]
            print(f"DISCARD: {mru_key}")

    def get(self, key):
        """ Return the value in self.cache_data linked to key """
        if key is None or key not in self.cache_data:
            return None
        # Move the key to the end to mark it as recently used
        self.order.remove(key)
        self.order.append(key)
        return self.cache_data[key]
