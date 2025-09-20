-- Add missing columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS role text CHECK (role IN ('admin', 'service', 'user')) DEFAULT 'user',
ADD COLUMN IF NOT EXISTS service_id uuid REFERENCES public.services(id);

-- Create a helper function to link auth users to profiles after creating them in dashboard
CREATE OR REPLACE FUNCTION public.link_auth_user_to_profile(user_email text, profile_email text)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.profiles 
  SET id = (SELECT id FROM auth.users WHERE email = user_email)
  WHERE email = profile_email;
$$;

-- Update the handle_new_user function to include role assignment
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'user')
  );
  RETURN NEW;
END;
$$;