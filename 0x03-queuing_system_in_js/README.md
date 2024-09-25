This project focuses on implementing a queuing system in JavaScript using Redis, Kue, and Node.js, as well as building Redis clients to handle basic to advanced operations. The project breakdown involves installing Redis, using Redis clients, handling async operations, managing hashes, and implementing a publisher-subscriber model for messaging.

### Overview of Key Concepts:

- **Redis**: An in-memory data structure store, used as a database, cache, and message broker.
- **Node.js**: JavaScript runtime used for server-side scripting.
- **Express.js**: A web application framework for Node.js, used for building APIs and web apps.
- **Kue**: A priority job queue backed by Redis.
- **ES6**: Modern JavaScript syntax for cleaner and modular code.
- **Babel**: A JavaScript compiler used to transpile modern ES6+ syntax for compatibility.

---

### **Steps for the Project:**

#### **0. Install Redis Instance**
- **Goal**: Install Redis and ensure it is running correctly.
- **Commands**:
  ```bash
  $ wget http://download.redis.io/releases/redis-6.0.10.tar.gz
  $ tar xzf redis-6.0.10.tar.gz
  $ cd redis-6.0.10
  $ make
  $ src/redis-server &
  ```
- **Verify Installation**:
  - Start Redis: `src/redis-server &`
  - Use the Redis client to set and get key-value pairs:
    ```bash
    $ src/redis-cli ping # Should return "PONG"
    $ src/redis-cli set Holberton School
    $ src/redis-cli get Holberton # Should return "School"
    ```

#### **1. Node Redis Client**
- **Goal**: Write a script to connect a Node.js client to a Redis server.
- **Tasks**:
  - Install the Redis client library using npm: `npm install redis`
  - Write a script `0-redis_client.js` that handles successful or failed connections to Redis.
- **Key Code Snippet**:
  ```javascript
  import redis from 'redis';

  const client = redis.createClient();

  client.on('connect', () => console.log('Redis client connected to the server'));
  client.on('error', (err) => console.log(`Redis client not connected to the server: ${err.message}`));
  ```

#### **2. Node Redis Client - Basic Operations**
- **Goal**: Implement functions to set and get Redis values using callbacks.
- **Tasks**:
  - Function `setNewSchool`: Sets a value in Redis.
  - Function `displaySchoolValue`: Logs the value of a key.
- **Key Code Snippet**:
  ```javascript
  function setNewSchool(schoolName, value) {
    client.set(schoolName, value, redis.print);
  }

  function displaySchoolValue(schoolName) {
    client.get(schoolName, (err, reply) => {
      console.log(reply);
    });
  }

  displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  displaySchoolValue('HolbertonSanFrancisco');
  ```

#### **3. Async Operations with Redis**
- **Goal**: Refactor `displaySchoolValue` using `async/await`.
- **Tasks**:
  - Use `promisify` to handle async operations more cleanly.
- **Key Code Snippet**:
  ```javascript
  import { promisify } from 'util';
  const getAsync = promisify(client.get).bind(client);

  async function displaySchoolValue(schoolName) {
    const value = await getAsync(schoolName);
    console.log(value);
  }

  displaySchoolValue('Holberton');
  ```

#### **4. Advanced Redis Operations**
- **Goal**: Store and retrieve a hash in Redis.
- **Tasks**:
  - Use `hset` to create a hash with city names as keys and population as values.
  - Use `hgetall` to display all key-value pairs in the hash.
- **Key Code Snippet**:
  ```javascript
  client.hset('HolbertonSchools', 'Portland', '50', redis.print);
  client.hset('HolbertonSchools', 'Seattle', '80', redis.print);

  client.hgetall('HolbertonSchools', (err, obj) => {
    console.log(obj);
  });
  ```

#### **5. Publisher-Subscriber Model**
- **Goal**: Implement a Redis-based publisher and subscriber system.
- **Tasks**:
  - Create two clients for publishing and subscribing to a Redis channel.
  - **Subscriber**: Listens for messages and logs them. Terminates when receiving `KILL_SERVER`.
  - **Publisher**: Sends messages to the channel at timed intervals.
- **Key Code Snippets**:

  **Subscriber (`5-subscriber.js`)**:
  ```javascript
  client.subscribe('holberton school channel');
  client.on('message', (channel, message) => {
    if (message === 'KILL_SERVER') {
      client.unsubscribe();
      client.quit();
    }
    console.log(message);
  });
  ```

  **Publisher (`5-publisher.js`)**:
  ```javascript
  function publishMessage(message, time) {
    setTimeout(() => {
      console.log(`About to send ${message}`);
      client.publish('holberton school channel', message);
    }, time);
  }

  publishMessage("Holberton Student #1 starts course", 100);
  publishMessage("KILL_SERVER", 300);
  ```

---

### **General Setup for Development**:
- Use **Babel** for ES6+ support.
- Use **Nodemon** for hot-reloading:
  - Add to `package.json`:
    ```json
    "scripts": {
      "dev": "nodemon --exec babel-node --presets @babel/preset-env"
    }
    ```
  - Start your project: `npm run dev your_script.js`

This project teaches core concepts of Redis integration with Node.js, which is essential for handling distributed systems, caching, and queuing tasks efficiently in modern web applications.
