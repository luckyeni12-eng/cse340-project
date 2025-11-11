-- ======================================
-- File: database_rebuild.sql
-- Purpose: Rebuild the CSE Motors database
-- ======================================

-- Drop existing tables if they exist
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TYPE IF EXISTS account_type_enum;

-- 1 Create ENUM type for account_type
CREATE TYPE account_type_enum AS ENUM ('Admin', 'Client');

-- 2 Create account table
CREATE TABLE account (
    account_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    account_type account_type_enum DEFAULT 'Client' NOT NULL
);

-- 3 Create classification table
CREATE TABLE classification (
    classification_id SERIAL PRIMARY KEY,
    classification_name VARCHAR(50) UNIQUE NOT NULL
);

-- 4 Create inventory table
CREATE TABLE inventory (
    inv_id SERIAL PRIMARY KEY,
    inv_make VARCHAR(50) NOT NULL,
    inv_model VARCHAR(50) NOT NULL,
    inv_year INT NOT NULL,
    inv_description TEXT,
    inv_image VARCHAR(255),
    inv_thumbnail VARCHAR(255),
    inv_price NUMERIC(10,2),
    inv_miles INT,
    inv_color VARCHAR(50),
    classification_id INT REFERENCES classification(classification_id)
);

-- 5 Populate classification table
INSERT INTO classification (classification_name)
VALUES 
('SUV'),
('Sport'),
('Sedan'),
('Truck'),
('Luxury');

-- 6 Populate inventory table
INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id)
VALUES
('GM', 'Hummer', 2020, 'A rugged off-road SUV with small interiors.', '/images/hummer.jpg', '/images/hummer-thumb.jpg', 55000, 12000, 'Black', 1),
('Ford', 'Mustang', 2021, 'A fast and stylish sport coupe.', '/images/mustang.jpg', '/images/mustang-thumb.jpg', 48000, 8000, 'Red', 2),
('Tesla', 'Model S', 2022, 'A premium electric sedan with advanced technology.', '/images/model-s.jpg', '/images/model-s-thumb.jpg', 79999, 5000, 'White', 3),
('Chevrolet', 'Silverado', 2019, 'A powerful truck with excellent towing capacity.', '/images/silverado.jpg', '/images/silverado-thumb.jpg', 40000, 22000, 'Blue', 4),
('BMW', 'X5', 2023, 'Luxury SUV with exceptional performance.', '/images/x5.jpg', '/images/x5-thumb.jpg', 72000, 3000, 'Gray', 5),
('Porsche', '911', 2023, 'Iconic sport car with incredible handling.', '/images/911.jpg', '/images/911-thumb.jpg', 110000, 1000, 'Yellow', 2);

--  At the end, include copies of queries #4 and #6 from assignment2.sql

-- (From Task One - Query 4)
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'small interiors', 'a huge interior')
WHERE inv_make = 'GM' AND inv_model = 'Hummer';

-- (From Task One - Query 6)
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');