#!/usr/bin/env python3
""" LRU Caching System """

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """ LRU Cache class that inherits from BaseCaching """

    def __init__(self):
        """ Initialize the cache """
        super().__init__()
        self.order = []  # To track the order of access (least to most recent)

    def put(self, key, item):
        """ Add an item to the cache """
        if key is None or item is None:
            return

        # If key already exists, remove it to update its position in
        if key in self.cache_data:
            self.order.remove(key)

        # Add key to the end (most recently used)
        self.order.append(key)
        self.cache_data[key] = item

        # If cache exceeds the limit, remove the least recently used item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            # The first item in order is the least recently used
            lru_key = self.order.pop(0)
            del self.cache_data[lru_key]
            print(f"DISCARD: {lru_key}")

    def get(self, key):
        """ Get an item from the cache """
        if key is None or key not in self.cache_data:
            return None

        # Since this key is accessed, move it to the end (most recently used)
        self.order.remove(key)
        self.order.append(key)
        return self.cache_data[key]
