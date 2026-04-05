CREATE TABLE smart_watches_sales {
  sale_id SERIAL PRIMARY KEY,
  brand VARCHAR(50),
  model VARCHAR(100),
  city VARCHAR(50),
  units_sold INT,
  price_per_unit DECIMAL(10, 2),
  sale_date DATE,
}

INSERT INTO smart_watches_sales (brand, model, city, units_sold, price_per_unit, sale_date) VALUES ('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),
('Boat', 'Storm Call', 'Mumbai', 10, 1500.00, '2023-10-01'),

SELECT COUNT(*) as total_rows FROM smart_watches_sales;

SELECT SUM(units_sold * price_per_unit) AS total_revenue FROM smart_watches_sales;

SELECT AVG(price_per_unit) AS avg_price_per_unit FROM smart_watches_sales;

SELECT MIN(price_per_unit) AS cheapest FROM smart_watches_sales;

SELECT MAX(price_per_unit) AS costliest FROM smart_watches_sales;

-- ! Group By

SELECT brand, SUM(units_sold) AS total_units_sold
FROM smart_watches_sales
GROUP BY brand
ORDER BY total_units_sold DESC;

SELECT city, SUM(units_sold * price_per_unit) as city_revenue
FROM smart_watches_sales
GROUP BY city
ORDER BY city_revenue DESC;

SELECT brand, city, SUM(units_sold) AS units
FROM smart_watches_sales
GROUP BY city, brand;

-- ! Using having Keyword
