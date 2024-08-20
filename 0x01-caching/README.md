
---

# 0x01. Caching

## Background Context

In this project, you will explore various caching algorithms to improve data retrieval efficiency. You will implement different caching systems using Python, each utilizing a different caching algorithm.

## Learning Objectives

By the end of this project, you should be able to explain the following concepts without referring to external sources:

- What a caching system is
- FIFO (First-In-First-Out) caching
- LIFO (Last-In-First-Out) caching
- LRU (Least Recently Used) caching
- MRU (Most Recently Used) caching
- LFU (Least Frequently Used) caching
- The purpose and limitations of caching systems

## Resources

- [Cache Replacement Policies - FIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#FIFO)
- [Cache Replacement Policies - LIFO](https://en.wikipedia.org/wiki/Cache_replacement_policies#LIFO)
- [Cache Replacement Policies - LRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU)
- [Cache Replacement Policies - MRU](https://en.wikipedia.org/wiki/Cache_replacement_policies#MRU)
- [Cache Replacement Policies - LFU](https://en.wikipedia.org/wiki/Cache_replacement_policies#LFU)

## Project Requirements

- All scripts should be interpreted/compiled on Ubuntu 18.04 LTS using Python 3.7.
- Files must end with a newline.
- The first line of all files should be exactly `#!/usr/bin/env python3`.
- Follow the [pycodestyle](https://pycodestyle.pycqa.org/) style guide (version 2.5).
- All files must be executable.
- Documentation is required for all modules, classes, and functions.

## Tasks

### 0. Basic Dictionary

Create a class `BasicCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods without limits.
- `put(self, key, item)`: Stores `item` with `key`. Ignores if `key` or `item` is `None`.
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

### 1. FIFO Caching

Create a class `FIFOCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods.
- `put(self, key, item)`: Stores `item` with `key`. Discards the first item if limit is exceeded (FIFO). Prints "DISCARD: key".
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

### 2. LIFO Caching

Create a class `LIFOCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods.
- `put(self, key, item)`: Stores `item` with `key`. Discards the last item if limit is exceeded (LIFO). Prints "DISCARD: key".
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

### 3. LRU Caching

Create a class `LRUCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods.
- `put(self, key, item)`: Stores `item` with `key`. Discards the least recently used item if limit is exceeded (LRU). Prints "DISCARD: key".
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

### 4. MRU Caching

Create a class `MRUCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods.
- `put(self, key, item)`: Stores `item` with `key`. Discards the most recently used item if limit is exceeded (MRU). Prints "DISCARD: key".
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

### 5. LFU Caching (Advanced)

Create a class `LFUCache` that inherits from `BaseCaching`:

- Uses `self.cache_data` dictionary from `BaseCaching`.
- Implements `put` and `get` methods.
- `put(self, key, item)`: Stores `item` with `key`. Discards the least frequently used item if limit is exceeded (LFU). If multiple items have the same frequency, use LRU to discard. Prints "DISCARD: key".
- `get(self, key)`: Returns the item associated with `key`. Returns `None` if `key` is not found.

## Example

For each caching class, example usage is provided in the corresponding `main.py` file.

## Repository

- **GitHub repository**: [alx-backend](https://github.com/Hussein380/alx-backend)
- **Directory**: `0x01-caching`

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
