create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 2 and 60),
  email text not null unique,
  avatar_url text,
  is_online boolean not null default false,
  last_seen_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  profile_name text;
begin
  profile_name := trim(coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  if char_length(profile_name) < 2 then
    profile_name := split_part(coalesce(new.email, ''), '@', 1);
  end if;
  if char_length(profile_name) < 2 then
    profile_name := 'Người dùng';
  end if;

  insert into public.profiles (id, display_name, email)
  values (new.id, left(profile_name, 60), lower(new.email));
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
