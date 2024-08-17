#!/usr/bin/env python3
"""Hypermedia pagination sample.
"""
import csv
import math
from typing import Dict, List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Retrieves the index range from a given page and page size.

    Args:
        page (int): The current page number.
        page_size (int): The number of items per page.

    Returns:
        Tuple[int, int]: A tuple containing the start and
        end index for the page.
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes a new Server instance.
        """
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Caches and retrieves the dataset.

        Returns:
            List[List]: A list of rows from the dataset, excluding the
            header.
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]  # Exclude the header row

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieves a page of data from the dataset.

        Args:
            page (int): The page number to retrieve.
            page_size (int): The number of items per page.

        Returns:
            List[List]: A list of rows corresponding to the requested page.
        """
        assert isinstance(page, int) and isinstance(page_size, int)
        assert page > 0 and page_size > 0
        start, end = index_range(page, page_size)
        data = self.dataset()
        if start >= len(data):
            return []  # Return empty list if the start index is beyond l
        return data[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """Retrieves information about a page, including pagination metadata.

        Args:
            page (int): The page number to retrieve.
            page_size (int): The number of items per page.

        Returns:
            Dict: A dictionary containing pagination metadata and the page
        """
        page_data = self.get_page(page, page_size)
        start, end = index_range(page, page_size)
        total_pages = math.ceil(len(self.dataset()) / page_size)
        page_info = {
            'page_size': len(page_data),  # Number of items on the current
            'page': page,  # Current page number
            'data': page_data,  # Data for the current page
            'next_page': page + 1 if end < len(self.dataset()) else None,
            'prev_page': page - 1 if start > 0 else None,
            'total_pages': total_pages,  # Total number of pages
        }
        return page_info
