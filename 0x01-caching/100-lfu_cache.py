#!/usr/bin/env python3
""" LFU Caching """

from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """ LFUCache defines a caching system using Least Frequently"""

    def __init__(self):
        """ Initialize LFUCache """
        super().__init__()
        self.freq = {}   # Frequency of access for each key
        self.order = {}  # Order of access for LRU algorithm

    def put(self, key, item):
        """ Assign to the dictionary self.cache_data the item value """
        if key is None or item is None:
            return

        if key in self.cache_data:
            # Update the item and its frequency
            self.cache_data[key] = item
            self.freq[key] += 1
            self.order[key] = len(self.order)  # Update order
        else:
            if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
                # Find the least frequently used item
                min_freq = min(self.freq.values())
                lfu_keys = [k for k, v in self.freq.items() if v == min_freq]
                if len(lfu_keys) > 1:
                    # Apply LRU to tie-breaker
                    lru_key = min(lfu_keys, key=lambda k: self.order[k])
                else:
                    lru_key = lfu_keys[0]
                # Discard the least frequently used (and LRU) item
                del self.cache_data[lru_key]
                del self.freq[lru_key]
                del self.order[lru_key]
                print(f"DISCARD: {lru_key}")
            # Add the new item
            self.cache_data[key] = item
            self.freq[key] = 1
            self.order[key] = len(self.order)

    def get(self, key):
        """ Return the value in self.cache_data linked to key """
        if key is None or key not in self.cache_data:
            return None
        # Update frequency and order
        self.freq[key] += 1
        self.order[key] = len(self.order)
        return self.cache_data[key]
