#!/usr/bin/env python3
"""Deletion-resilient hypermedia pagination
"""
import csv
from typing import Dict, List


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        """Initializes a new Server instance.
        """
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Caches and retrieves the dataset.
        """
        if self.__dataset is None:
            # Open the CSV file and read its contents
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                # Skip the header row and store the dataset
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Indexes the dataset by sorting position, starting at 0.
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            # Truncate dataset to the first 1000 items
            truncated_dataset = dataset[:1000]
            # Create an indexed dataset where index is the key
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """Retrieves information about a page from a given index and with a
        specified size.
        """
        data = self.indexed_dataset()
        # Ensure the index is within the valid range
        assert index is not None and index >= 0 and index <= max(data.keys())
        page_data = []
        data_count = 0
        next_index = None
        # Set the start index for the page
        start = index if index else 0
        # Iterate over the dataset to collect page data
        for i, item in data.items():
            if i >= start and data_count < page_size:
                page_data.append(item)
                data_count += 1
                continue
            if data_count == page_size:
                next_index = i
                break
        # Prepare the page info dictionary
        page_info = {
            'index': index,
            'next_index': next_index,
            'page_size': len(page_data),
            'data': page_data,
        }
        return page_info
