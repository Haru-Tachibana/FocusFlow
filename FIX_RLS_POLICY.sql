-- Fix RLS policy to allow user creation during signup
-- Run this in your Supabase SQL Editor

-- Drop the existing policy
DROP POLICY IF EXISTS "Users can insert own data" ON users;

-- Create a new policy that allows users to insert their own data
-- This policy allows insertion when the user ID matches the authenticated user
CREATE POLICY "Users can insert own data" ON users 
FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Also ensure the user can update their own data
DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data" ON users 
FOR UPDATE 
USING (auth.uid() = id);

-- And ensure they can view their own data
DROP POLICY IF EXISTS "Users can view own data" ON users;
CREATE POLICY "Users can view own data" ON users 
FOR SELECT 
USING (auth.uid() = id);
