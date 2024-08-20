#!/usr/bin/env python3
""" Basic caching module
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache class
    This caching system has no size limit and simply stores
    key-value pairs in a dictionary.
    """

    def put(self, key, item):
        """ Add an item to the cache
        If key or item is None, do nothing.

        Args:
            key: The key to store in the cache.
            item: The value to associate with the key.
        """
        if key is None or item is None:
            return
        # Store the item in the cache
        self.cache_data[key] = item

    def get(self, key):
        """ Retrieve an item from the cache
        If key is None or doesn't exist in the cache, return None.

        Args:
            key: The key whose value needs to be retrieved.

        Returns:
            The value associated with the key, or None if the
            key doesn't exist.
        """
        if key is None:
            return None
        return self.cache_data.get(key)
