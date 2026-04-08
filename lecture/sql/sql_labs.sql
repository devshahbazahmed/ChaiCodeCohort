--! Querying Data
-- SELECT all Columns
SELECT * FROM users;

-- SELECT specific columns
SELECT name, email FROM users;

-- SELECT with DISTINCT
SELECT DISTINCT country FROM users;

-- LIMIT Results
SELECT * FROM users LIMIT 5;

-- Columns with aliases AS
SELECT name AS customer_name, country AS location FROM users;

--! Sorting Data
-- ORDER BY Ascending
SELECT * FROM products ORDER BY price ASC;

-- ORDER BY Descending
SELECT name, price FROM products ORDER BY price DESC;

-- ORDER BY Multiple Columns
SELECT name, country, age FROM users 
ORDER BY country ASC, age ASC;

--! Filtering Data
-- WHERE Clause
SELECT * FROM users WHERE country = 'USA';

-- Comparison Operators
SELECT name, age FROM users WHERE age > 35;

-- WHERE with AND
SELECT name, country, age FROM users 
WHERE country = 'USA' AND age < 32;

-- WHERE with OR
SELECT name, country FROM users 
WHERE country = 'Canada' OR country = 'UK';

-- IN Operator
SELECT name, country FROM users 
WHERE country IN ('USA', 'Canada', 'UK');

-- NOT IN Operator
SELECT name, country FROM users 
WHERE country NOT IN ('USA', 'Canada');

-- BETWEEN Operator
SELECT name, price FROM products 
WHERE price BETWEEN 20 AND 100;

-- LIKE Pattern Matching
SELECT name, email FROM users WHERE name LIKE 'A%';

-- IS NULL
SELECT name, phone FROM users WHERE phone IS NULL;

-- IS NOT NULL
SELECT name, phone FROM users WHERE phone IS NOT NULL;

--! Joining Tables
-- Table Aliases
SELECT name, email FROM users AS u;

-- INNER JOIN Basics
SELECT orders.id, users.name, orders.quantity 
FROM orders 
INNER JOIN users 
ON orders.user_id = users.id;

-- LEFT JOIN
SELECT products.name, reviews.rating 
FROM products
LEFT JOIN reviews
ON products.id = reviews.product_id;

-- RIGHT JOIN
SELECT products.name, reviews.comment
FROM reviews
RIGHT JOIN products
ON products.id = reviews.product_id;

-- Self JOIN
SELECT e1.name AS employee_name, e2.name AS manager_name
FROM employees e1
JOIN employees e2
ON e1.manager_id = e2.id;

-- JOIN Multiple Tables
SELECT orders.id, users.name, products.name
FROM orders
INNER JOIN users
ON users.id = orders.user_id
INNER JOIN products
ON products.id = orders.product_id

-- JOIN with WHERE
SELECT orders.id, users.name, users.country
FROM orders
INNER JOIN users
ON users.id = orders.user_id
WHERE users.country = 'USA';

--! Grouping Data
-- COUNT Function
SELECT COUNT(*) as count FROM orders;

-- SUM Function
SELECT SUM(stock) as sum FROM products;

-- AVG Function
SELECT AVG(salary) as avg FROM employees;

-- MIN and MAX Functions
SELECT MIN(price) as min, MAX(price) as max FROM products;

-- GROUP BY
SELECT country, COUNT(*) as count
FROM users
GROUP BY country;

-- HAVING Clause
SELECT country, COUNT(*) as count
FROM users
GROUP BY country
HAVING COUNT(*) > 3;

--! Subqueries
-- Subquery in WHERE
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Subquery in FROM
SELECT COUNT(*) 
FROM (SELECT * FROM users WHERE country = 'USA');

-- EXISTS Operator
SELECT name, email
FROM users
WHERE EXISTS(SELECT 1 FROM orders WHERE orders.user_id = users.id);

--! Set Operations
-- UNION
SELECT city FROM users UNION SELECT location FROM departments;

-- UNION ALL
SELECT country FROM users UNION ALL (SELECT country FROM suppliers);

--! Modifying Data
-- INSERT Single Row
INSERT INTO users (name, email, phone, age, country, city) 
VALUES ('Test User', 'test@example.com', '555-9999', 30, 'USA', 'Austin');

-- INSERT Multiple Rows
INSERT INTO categories (name, description)
VALUES ('Food', 'Food and beverages'),
('Automotive', 'Car parts and accessories');

-- INSERT with Specific Columns
INSERT INTO users (name, email) 
VALUES ('Jane Doe', 'jane@example.com');

-- UPDATE Single Column
UPDATE products SET stock = 75 WHERE id = 1;

-- UPDATE Multiple Columns
UPDATE users SET age = 29, city = 'Boston' WHERE id = 1;

-- UPDATE With Where Condition
UPDATE products SET price = price + 50 WHERE category_id = 1;

-- UPDATE With JOIN
UPDATE orders SET status = 'priority' 
FROM users 
WHERE orders.user_id = users.id 
AND country = 'USA';

-- DELETE With WHERE
DELETE FROM orders WHERE status = NULL;

-- DELETE With JOIN
DELETE FROM reviews 
USING users 
WHERE reviews.user_id = users.id 
AND users.country = 'Australia';

-- INSERT INTO SELECT
INSERT INTO categories (name, description) 
SELECT name, description 
FROM categories 
WHERE name = 'New Category' AND description = 'Imported from products';

--! Common Table Expressions
-- Basic CTE with WITH
WITH usa_users 
AS (SELECT * FROM users WHERE country = 'USA')
SELECT name, city FROM usa_users;

-- Multiple CTE's
WITH high_price AS (
    SELECT id, name
    FROM products
    WHERE price > 100
),
electronics AS (
    SELECT id, name
    FROM products
    WHERE category_id = 1
)
SELECT hp.name
FROM high_price hp
INNER JOIN electronics e
ON hp.id = e.id;

-- CTE For Complex Aggregation
WITH order_totals AS (
    SELECT 
        user_id, 
        SUM(quantity) AS total_quantity
    FROM orders
    GROUP BY user_id
)
SELECT 
    u.name, 
    ot.total_quantity
FROM order_totals ot
JOIN users u 
    ON u.id = ot.user_id
WHERE ot.total_quantity > 2;

-- Recursive CTE
WITH RECURSIVE employee_hierarchy AS (
    -- Base case: start with top manager
    SELECT id, name, manager_id
    FROM employees
    WHERE id = 1

    UNION ALL

    -- Recursive case: find employees who report to previous level
    SELECT e.id, e.name, e.manager_id
    FROM employees e
    INNER JOIN employee_hierarchy eh
        ON e.manager_id = eh.id
)
SELECT id, name
FROM employee_hierarchy;

--! Advanced Topics
-- ROW_NUMBER Window Function
SELECT name, price, ROW_NUMBER() OVER (ORDER BY price DESC) as row_num FROM products;

-- RANK Window Function 
SELECT 
    name,
    country,
    age,
    RANK() OVER (
        PARTITION BY country 
        ORDER BY age
    ) AS rank
FROM users;

-- CASE Expression
SELECT 
    name,
    price,
    CASE 
        WHEN price > 100 THEN 'Expensive'
        WHEN price BETWEEN 20 AND 100 THEN 'Medium'
        ELSE 'Cheap'
    END AS price_category
FROM products;

-- COALESCE Function
SELECT 
    name,
    COALESCE(phone, 'No phone') AS phone
FROM users;

-- GROUP BY with ROLLUP
SELECT 
    country,
    COUNT(*) AS count
FROM users
GROUP BY ROLLUP(country);

-- LAG With Window Function
SELECT 
    name,
    salary,
    LAG(salary) OVER (
        ORDER BY salary DESC
    ) AS previous_salary
FROM employees;

--! Data Types & Constraints
-- Understanding INTEGER Types
SELECT name, age FROM users WHERE age > 30;

-- Understanding VARCHAR vs TEXT
SELECT name, description FROM products;

-- Understanding DECIMAL For Money
SELECT name, price FROM products;

-- Understanding DATE Types
SELECT 
    u.name,
    o.order_date
FROM orders o
JOIN users u 
    ON u.id = o.user_id
WHERE o.order_date >= '2024-01-01'
  AND o.order_date < '2024-02-01';

-- PRIMARY KEY Constraint
SELECT id, name FROM users;

-- FOREIGN KEY Constraint
SELECT orders.id, orders.user_id, users.name
FROM orders
INNER JOIN users
ON users.id = orders.user_id;
