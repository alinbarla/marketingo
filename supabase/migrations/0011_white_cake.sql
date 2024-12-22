/*
  # Set initial online motoservices

  Updates 5 motoservice users to be online for testing purposes.
*/

-- Set 5 random motoservices to online
UPDATE motoservices
SET online_status = true
WHERE id IN (
  SELECT id 
  FROM motoservices 
  ORDER BY RANDOM() 
  LIMIT 5
);