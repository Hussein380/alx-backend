#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

// Sample product list with item details
const listProducts = [
  {
    itemId: 1,
    itemName: 'Suitcase 250',
    price: 50,
    initialAvailableQuantity: 4
  },
  {
    itemId: 2,
    itemName: 'Suitcase 450',
    price: 100,
    initialAvailableQuantity: 10
  },
  {
    itemId: 3,
    itemName: 'Suitcase 650',
    price: 350,
    initialAvailableQuantity: 2
  },
  {
    itemId: 4,
    itemName: 'Suitcase 1050',
    price: 550,
    initialAvailableQuantity: 5
  },
];

// Function to retrieve an item by its ID
const getItemById = (id) => {
  const item = listProducts.find(obj => obj.itemId === id);
  return item ? Object.fromEntries(Object.entries(item)) : null; // Return the item or null
};

// Initialize Express app and Redis client
const app = express();
const client = createClient();
const PORT = 1245;

/**
 * Modifies the reserved stock for a given item.
 * @param {number} itemId - The id of the item.
 * @param {number} stock - The stock of the item.
 * @returns {Promise} - A promise that resolves when the stock is reserved.
 */
const reserveStockById = async (itemId, stock) => {
  return promisify(client.SET).bind(client)(`item.${itemId}`, stock); // Use Redis SET command to reserve stock
};

/**
 * Retrieves the reserved stock for a given item.
 * @param {number} itemId - The id of the item.
 * @returns {Promise<String>} - A promise that resolves to the reserved stock.
 */
const getCurrentReservedStockById = async (itemId) => {
  return promisify(client.GET).bind(client)(`item.${itemId}`); // Use Redis GET command to retrieve reserved stock
};

// Route to list all products
app.get('/list_products', (_, res) => {
  res.json(listProducts); // Return the product list in JSON format
});

// Route to get details of a specific product by itemId
app.get('/list_products/:itemId(\\d+)', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.json({ status: 'Product not found' }); // Return 404 if product not found
    return;
  }

  // Get current reserved stock and compute available quantity
  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0)) // Parse result as an integer
    .then((reservedStock) => {
      productItem.currentQuantity = productItem.initialAvailableQuantity - reservedStock; // Calculate available stock
      res.json(productItem); // Return product details
    });
});

// Route to reserve a product by itemId
app.get('/reserve_product/:itemId', (req, res) => {
  const itemId = Number.parseInt(req.params.itemId);
  const productItem = getItemById(itemId);

  if (!productItem) {
    res.json({ status: 'Product not found' }); // Return 404 if product not found
    return;
  }

  // Get current reserved stock and check availability
  getCurrentReservedStockById(itemId)
    .then((result) => Number.parseInt(result || 0)) // Parse result as an integer
    .then((reservedStock) => {
      if (reservedStock >= productItem.initialAvailableQuantity) {
        res.json({ status: 'Not enough stock available', itemId }); // Return error if not enough stock
        return;
      }

      // Reserve stock by incrementing the reserved count
      reserveStockById(itemId, reservedStock + 1)
        .then(() => {
          res.json({ status: 'Reservation confirmed', itemId }); // Return success message
        });
    });
});

// Function to reset the stock of all products to zero
const resetProductsStock = () => {
  return Promise.all(
    listProducts.map(
      item => promisify(client.SET).bind(client)(`item.${item.itemId}`, 0), // Set all item stocks to zero
    )
  );
};

// Start the server and reset product stock
app.listen(PORT, () => {
  resetProductsStock()
    .then(() => {
      console.log(`API available on localhost port ${PORT}`); // Log server start
    });
});

export default app; // Export the app for testing
