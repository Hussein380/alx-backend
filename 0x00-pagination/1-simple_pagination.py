#!/usr/bin/env python3
"""Simple pagination sample.
"""
import csv
from typing import List, Tuple


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

    return (start, end)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes a new Server instance."""
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset.

        Returns:
            List[List]: The dataset as a list of rows,
            where each row is a list of values.
        """
        if self.__dataset is None:
            # Load and cache the dataset if it is not already cached
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]

            # Skip the header row
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Retrieves a page of data.

        Args:
            page (int): The page number to retrieve. Defaults to 1.
            page_size (int): The number of items per page. Defaults to 10.

        Returns:
            List[List]: A list of rows representing the requested page of data.
        """
        # Validate the types and values of page and page_size
        assert type(page) == int and type(page_size) == int
        assert page > 0 and page_size > 0

        # Get the index range for the requested page
        start, end = index_range(page, page_size)

        # Retrieve the dataset
        data = self.dataset()

        # Check if the start index is beyond the length of the data
        if start >= len(data):
            return []

        # Return the data for the requested page
        return data[start:end]
