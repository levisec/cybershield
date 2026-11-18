-- CyberShield Initial Database Schema & Row Level Security (RLS)
-- Run this in the Supabase SQL Editor to initialize tables, triggers, and policies.

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  display_name text,
  role text not null default 'user' check (role in ('user', 'admin')),
  save_history_consent boolean not null default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  last_login timestamp with time zone default timezone('utc'::text, now())
);

-- 2. SCAM ANALYSES TABLE
create table if not exists public.analyses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  input_type text not null check (input_type in ('text', 'screenshot', 'email', 'sms_whatsapp')),
  content_preview text not null,
  risk_level text not null check (risk_level in ('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK', 'UNABLE_TO_DETERMINE')),
  risk_score integer not null check (risk_score >= 0 and risk_score <= 100),
  scam_category text not null,
  confidence text not null check (confidence in ('High', 'Medium', 'Low')),
  indicators jsonb default '[]'::jsonb not null,
  explanation text not null,
  evidence jsonb default '[]'::jsonb not null,
  recommended_actions jsonb default '[]'::jsonb not null,
  limitations jsonb default '[]'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. URL CHECKS TABLE
create table if not exists public.url_checks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade,
  submitted_url text not null,
  extracted_domain text not null,
  risk_level text not null check (risk_level in ('LOW_RISK', 'MEDIUM_RISK', 'HIGH_RISK', 'UNABLE_TO_DETERMINE')),
  risk_score integer not null check (risk_score >= 0 and risk_score <= 100),
  domain_details jsonb default '{}'::jsonb not null,
  indicators jsonb default '[]'::jsonb not null,
  explanation text not null,
  precautions jsonb default '[]'::jsonb not null,
  provider_coverage text not null default 'Heuristic & Structural Domain Analysis',
  verification_limitations jsonb default '[]'::jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. SCAM REPORTS TABLE
create table if not exists public.scam_reports (
  id uuid default gen_random_uuid() primary key,
  reference_id text unique not null,
  user_id uuid references auth.users on delete set null,
  reporter_email text,
  category text not null,
  title text not null,
  description text not null,
  evidence_url text,
  platform_involved text,
  suspect_contact text,
  status text not null default 'pending' check (status in ('pending', 'under_review', 'verified_scam', 'dismissed', 'resolved')),
  admin_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. FEEDBACK TABLE
create table if not exists public.feedback (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete set null,
  rating integer check (rating >= 1 and rating <= 5),
  comments text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. AWARENESS PROGRESS TABLE
create table if not exists public.awareness_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_id text not null,
  completed boolean not null default false,
  quiz_score integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, module_id)
);

-- 7. AUDIT LOGS TABLE
create table if not exists public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  timestamp timestamp with time zone default timezone('utc'::text, now()) not null,
  actor_id uuid references auth.users on delete set null,
  actor_email text not null,
  action text not null,
  resource_type text not null,
  resource_id text,
  details text,
  ip_address text
);

-- INDEXES FOR PERFORMANCE
create index if not exists idx_analyses_user_id on public.analyses(user_id);
create index if not exists idx_url_checks_user_id on public.url_checks(user_id);
create index if not exists idx_scam_reports_user_id on public.scam_reports(user_id);
create index if not exists idx_scam_reports_reference_id on public.scam_reports(reference_id);
create index if not exists idx_scam_reports_status on public.scam_reports(status);
create index if not exists idx_audit_logs_timestamp on public.audit_logs(timestamp desc);

-- ENABLE ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.analyses enable row level security;
alter table public.url_checks enable row level security;
alter table public.scam_reports enable row level security;
alter table public.feedback enable row level security;
alter table public.awareness_progress enable row level security;
alter table public.audit_logs enable row level security;

-- HELPER FUNCTION: Check if auth user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- RLS POLICIES

-- PROFILES
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id and (role is null or role = (select role from public.profiles where id = auth.uid())));

-- ANALYSES
create policy "Users can view their own analyses"
  on public.analyses for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert their own analyses"
  on public.analyses for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Users can delete their own analyses"
  on public.analyses for delete
  using (auth.uid() = user_id);

-- URL CHECKS
create policy "Users can view their own url checks"
  on public.url_checks for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert url checks"
  on public.url_checks for insert
  with check (auth.uid() = user_id or user_id is null);

create policy "Users can delete their own url checks"
  on public.url_checks for delete
  using (auth.uid() = user_id);

-- SCAM REPORTS
create policy "Users can view their own reports, admins view all"
  on public.scam_reports for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Anyone can submit a scam report"
  on public.scam_reports for insert
  with check (true);

create policy "Only admins can update reports"
  on public.scam_reports for update
  using (public.is_admin());

-- FEEDBACK
create policy "Anyone can insert feedback"
  on public.feedback for insert
  with check (true);

create policy "Only admins can view feedback"
  on public.feedback for select
  using (public.is_admin());

-- AWARENESS PROGRESS
create policy "Users can view and update own awareness progress"
  on public.awareness_progress for all
  using (auth.uid() = user_id);

-- AUDIT LOGS
create policy "Only admins can view audit logs"
  on public.audit_logs for select
  using (public.is_admin());

create policy "System can insert audit logs"
  on public.audit_logs for insert
  with check (true);

-- TRIGGER TO CREATE PROFILE ON USER SIGNUP
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, display_name, role, save_history_consent)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    'user',
    true
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
