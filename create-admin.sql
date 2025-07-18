-- Create Admin User Script
-- Run this in your Supabase SQL Editor after a user has signed up

-- First, check if the user exists in the users table
SELECT id, email, name FROM users WHERE email = 'shakeelabdullahgce@gmail.com';

-- If the user exists, add them to the admins table
-- Replace 'your-admin-email@example.com' with the actual email address
INSERT INTO admins (id, email, name)
SELECT id, email, name 
FROM users 
WHERE email = 'shakeelabdullahgce@gmail.com'
ON CONFLICT (id) DO NOTHING;

-- Verify the admin was created
SELECT * FROM admins WHERE email = 'shakeelabdullahgce@gmail.com';

-- To create multiple admins, you can run this for each email:
-- INSERT INTO admins (id, email, name)
-- SELECT id, email, name 
-- FROM users 
-- WHERE email = 'another-admin@example.com'
-- ON CONFLICT (id) DO NOTHING; 