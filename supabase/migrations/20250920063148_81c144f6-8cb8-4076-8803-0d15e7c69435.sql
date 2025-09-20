-- Create service accounts for each department
-- These profiles will be linked to auth users that need to be created manually in Supabase dashboard

-- Insert service profiles (these will be linked to auth users created in dashboard)
INSERT INTO public.profiles (id, email, full_name, role, service_id) VALUES
-- Note: The UUIDs below are placeholders - replace with actual user IDs from auth.users after creating users in dashboard
('00000000-0000-0000-0000-000000000001'::uuid, 'geology@kapan.am', 'Երկրաբանական ծառայություն', 'service', (SELECT id FROM services WHERE name = 'Երկրաբանական ծառայություն')),
('00000000-0000-0000-0000-000000000002'::uuid, 'geomech@kapan.am', 'Երկրամեխանիկական ծառայություն', 'service', (SELECT id FROM services WHERE name = 'Երկրամեխանիկական ծառայություն')),
('00000000-0000-0000-0000-000000000003'::uuid, 'survey@kapan.am', 'Մարկշեյդերական ծառայություն', 'service', (SELECT id FROM services WHERE name = 'Մարկշեյդերական ծառայություն')),
('00000000-0000-0000-0000-000000000004'::uuid, 'drilling@kapan.am', 'Բուրական-պայթեցնողական ծառայություն', 'service', (SELECT id FROM services WHERE name = 'Բուրական-պայթեցնողական ծառայություն'))
ON CONFLICT (id) DO NOTHING;

-- Create admin profile
INSERT INTO public.profiles (id, email, full_name, role) VALUES
('00000000-0000-0000-0000-000000000000'::uuid, 'admin@kapan.am', 'Ադմինիստրատոր', 'admin')
ON CONFLICT (id) DO NOTHING;

-- Create a function to easily update profile after creating auth user
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