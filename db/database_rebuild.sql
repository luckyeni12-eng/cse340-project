-- rebuild_db.sql
-- Full rebuild file for assignment task two
-- Drops objects if they exist, then creates the type, tables, and inserts seed data.
-- At the end are the two queries copied from Task 1 (queries 4 and 6), as required.

-- ---------------------------------------------------------
-- 0) Optional: drop existing tables/type if present (safe when rebuilding)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS classification CASCADE;
DROP TABLE IF EXISTS account CASCADE;
DROP TYPE IF EXISTS full_name CASCADE;

-- ---------------------------------------------------------
-- 1) Create a PostgreSQL composite type (example)
-- ---------------------------------------------------------
-- This demonstrates creation of a custom type. It's not strictly required by other tables
-- but meets the assignment requirement to create a PostgreSQL type.
CREATE TYPE full_name AS (
  first_name text,
  last_name  text
);

-- ---------------------------------------------------------
-- 2) Create the classification table
-- ---------------------------------------------------------
CREATE TABLE classification (
  classification_id SERIAL PRIMARY KEY,
  classification_name TEXT NOT NULL UNIQUE
);

-- ---------------------------------------------------------
-- 3) Create the inventory table
-- ---------------------------------------------------------
CREATE TABLE inventory (
  inv_id SERIAL PRIMARY KEY,
  inv_make TEXT NOT NULL,
  inv_model TEXT NOT NULL,
  inv_description TEXT,
  inv_image TEXT,
  inv_thumbnail TEXT,
  classification_id INTEGER REFERENCES classification(classification_id)
);

-- ---------------------------------------------------------
-- 4) Create the account table
-- ---------------------------------------------------------
-- Using separate firstname/lastname columns because the course examples expect them.
CREATE TABLE account (
  account_id SERIAL PRIMARY KEY,
  account_firstname TEXT NOT NULL,
  account_lastname  TEXT NOT NULL,
  account_email TEXT UNIQUE NOT NULL,
  account_password TEXT NOT NULL,
  account_type TEXT NOT NULL DEFAULT 'Client'
);

-- ---------------------------------------------------------
-- 5) Insert seed data into classification
-- ---------------------------------------------------------
INSERT INTO classification (classification_name) VALUES
  ('Sport'),
  ('Truck'),
  ('SUV'),
  ('Sedan');

-- ---------------------------------------------------------
-- 6) Insert seed data into inventory
--    We include:
--      - Two Sport items (so Task 1 query #5 returns two rows)
--      - A GM Hummer item with description containing 'small interiors' so we can run the replace() update
--    The image paths intentionally start with '/images/' so the "add /vehicles" query will modify them.
-- ---------------------------------------------------------
INSERT INTO inventory (inv_make, inv_model, inv_description, inv_image, inv_thumbnail, classification_id)
VALUES
  -- Sport cars (2 records)
  ('Toyota', 'Supra', 'A fast sport car with tuned suspension and leather seats', '/images/toyota-supra.jpg', '/images/thumbs/toyota-supra-thumb.jpg', (SELECT classification_id FROM classification WHERE classification_name = 'Sport' LIMIT 1)),
  ('Nissan', '370Z', 'Sporty coupe, great handling and sharp looks', '/images/nissan-370z.jpg', '/images/thumbs/nissan-370z-thumb.jpg', (SELECT classification_id FROM classification WHERE classification_name = 'Sport' LIMIT 1)),

  -- GM Hummer (the one we will update using replace to change 'small interiors' to 'a huge interior')
  ('GM', 'Hummer', 'Classic off-roader with small interiors and heavy-duty suspension', '/images/gm-hummer.jpg', '/images/thumbs/gm-hummer-thumb.jpg', (SELECT classification_id FROM classification WHERE classification_name = 'Truck' LIMIT 1)),

  -- Another entries for realism
  ('Ford', 'F-150', 'Reliable pickup truck for work and play', '/images/ford-f150.jpg', '/images/thumbs/ford-f150-thumb.jpg', (SELECT classification_id FROM classification WHERE classification_name = 'Truck' LIMIT 1)),
  ('Honda', 'Civic', 'Compact sedan with good fuel economy', '/images/honda-civic.jpg', '/images/thumbs/honda-civic-thumb.jpg', (SELECT classification_id FROM classification WHERE classification_name = 'Sedan' LIMIT 1));

-- ---------------------------------------------------------
-- 7) Optionally insert a couple of account rows for testing (not required by Task 1)
-- ---------------------------------------------------------
INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type)
VALUES
  ('Bruce', 'Banner', 'bruce@avengers.com', 'hulkSmash123', 'Client'),
  ('Natasha', 'Romanoff', 'nat@shield.org', 'blackWidow!', 'Client');

-- ---------------------------------------------------------
-- 8) Ensure indexes (optional) - classification_name is unique and indexed by the UNIQUE constraint.
-- ---------------------------------------------------------

-- ---------------------------------------------------------
-- 9) Finally: copy queries 4 and 6 from Task One and place them at the end (they should run last)
--    Query 4: replace 'small interiors' -> 'a huge interior' in the GM Hummer record
-- ---------------------------------------------------------
UPDATE inventory
SET inv_description = replace(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = (
  SELECT inv_id FROM inventory WHERE inv_make = 'GM' AND inv_model = 'Hummer' LIMIT 1
);

-- ---------------------------------------------------------
-- 10) Query 6 from Task 1: update all inv_image and inv_thumbnail paths to include '/vehicles'
-- ---------------------------------------------------------
UPDATE inventory
SET
  inv_image = replace(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');

-- End of rebuild_db.sql