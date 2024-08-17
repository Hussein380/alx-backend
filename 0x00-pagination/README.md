---

# Pagination Project

## Overview

This project focuses on implementing pagination in a dataset of popular baby names. It includes basic pagination, hypermedia pagination, and deletion-resilient pagination techniques.

## Project Timeline

- **Start Date:** Aug 15, 2024, 6:00 AM
- **End Date:** Aug 20, 2024, 6:00 AM
- **Checker Release:** Aug 16, 2024, 12:00 PM
- **Auto Review:** At the project deadline

## Learning Objectives

By the end of this project, you should be able to:

1. **Simple Pagination:** Paginate a dataset using simple page and page_size parameters.
2. **Hypermedia Pagination:** Implement pagination with hypermedia metadata.
3. **Deletion-Resilient Pagination:** Implement pagination that handles dataset deletions gracefully.

## Requirements

- **Environment:** Ubuntu 18.04 LTS
- **Python Version:** 3.7
- **File Naming:** All files should end with a new line and start with `#!/usr/bin/env python3`.
- **Coding Style:** Use `pycodestyle` (version 2.5.*).
- **Documentation:** All modules and functions should have proper documentation.
- **Type Annotation:** All functions and coroutines must be type-annotated.

## Setup

1. **Data File:**
   - `Popular_Baby_Names.csv`: The dataset used for this project.

## Tasks

### 0. Simple Helper Function

Write a function named `index_range` that takes two integer arguments `page` and `page_size`. It should return a tuple containing the start and end indices for the specified page and page size.

**File:** `0-simple_helper_function.py`

**Example Usage:**
```python
index_range = __import__('0-simple_helper_function').index_range

res = index_range(1, 7)
print(res)  # Output: (0, 7)

res = index_range(page=3, page_size=15)
print(res)  # Output: (30, 45)
```

### 1. Simple Pagination

Implement a `Server` class with a method `get_page` to paginate the dataset based on page and page size. Use the `index_range` function from the previous task.

**File:** `1-simple_pagination.py`

**Example Usage:**
```python
Server = __import__('1-simple_pagination').Server

server = Server()
print(server.get_page(1, 3))  # Output: [['2016', 'FEMALE', ...], ...]
print(server.get_page(3000, 100))  # Output: []
```

### 2. Hypermedia Pagination

Extend the `Server` class to include a `get_hyper` method that returns a dictionary with metadata about the page.

**File:** `2-hypermedia_pagination.py`

**Example Usage:**
```python
Server = __import__('2-hypermedia_pagination').Server

server = Server()
print(server.get_hyper(1, 2))  # Output: {'page_size': 2, 'page': 1, ...}
print(server.get_hyper(2, 2))  # Output: {'page_size': 2, 'page': 2, ...}
```

### 3. Deletion-Resilient Hypermedia Pagination

Enhance the `Server` class to handle cases where data is deleted between queries. Implement the `get_hyper_index` method to provide deletion-resilient pagination.

**File:** `3-hypermedia_del_pagination.py`

**Example Usage:**
```python
Server = __import__('3-hypermedia_del_pagination').Server

server = Server()
server.indexed_dataset()
print(server.get_hyper_index(3, 2))  # Output: {'index': 3, 'data': [...], ...}
```

## Contribution

Feel free to fork the repository and submit pull requests with improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
