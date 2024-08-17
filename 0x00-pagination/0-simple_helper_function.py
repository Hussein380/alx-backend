#!/usr/bin/env python3
"""Pagination helper function.
"""
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Retrieves the index range from a given page and page size.

    Args:
        page (int): The current page number.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple containing the start and end
        index of the page.
    """
    # Calculate the starting index for the page
    start = (page - 1) * page_size

    # Calculate the ending index for the page
    end = start + page_size

    # Return the start and end indices as a tuple
    return (start, end)
