-- assignment2.sql
-- Task One: six single queries. Run these against the course database.
-- NOTE: some statements use subqueries to locate primary keys (so the WHERE clause uses the PK),
-- which follows the instruction to use the primary key when targeting a single record.

-- 1) Insert a new account record for Tony Stark.
-- account_id is serial (auto-handled) and account_type has a default so we don't include them.
INSERT INTO account (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

-- 2) Modify the Tony Stark record to change the account_type to "Admin".
-- Use the primary key in the WHERE clause by selecting Tony's account_id via subquery.
UPDATE account
SET account_type = 'Admin'
WHERE account_id = (
  SELECT account_id FROM account WHERE account_email = 'tony@starkent.com' LIMIT 1
);

-- 3) Delete the Tony Stark record from the database.
-- Delete by primary key (looked up from the email), so only the intended record is removed.
DELETE FROM account
WHERE account_id = (
  SELECT account_id FROM account WHERE account_email = 'tony@starkent.com' LIMIT 1
);

-- 4) Modify the "GM Hummer" record to replace 'small interiors' with 'a huge interior'
-- Use PostgreSQL replace function inside an UPDATE. Do NOT retype the whole description.
UPDATE inventory
SET inv_description = replace(inv_description, 'small interiors', 'a huge interior')
WHERE inv_id = (
  SELECT inv_id FROM inventory WHERE inv_make = 'GM' AND inv_model = 'Hummer' LIMIT 1
);

-- 5) Inner join to select make and model from inventory and classification_name from classification
-- for inventory items that belong to the "Sport" category.
-- Two records should be returned by this query (we've prepared sample data in the rebuild file).
SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c ON i.classification_id = c.classification_id
WHERE c.classification_name = 'Sport';

-- 6) Update all inventory records to add '/vehicles' into the image paths (inv_image and inv_thumbnail)
-- Example: change '/images/a-car.jpg' to '/images/vehicles/a-car.jpg'
UPDATE inventory
SET
  inv_image = replace(inv_image, '/images/', '/images/vehicles/'),
  inv_thumbnail = replace(inv_thumbnail, '/images/', '/images/vehicles/');