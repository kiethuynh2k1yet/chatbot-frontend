create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_a_id uuid not null references public.profiles (id) on delete cascade,
  user_b_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint conversations_distinct_users check (user_a_id < user_b_id),
  constraint conversations_unique_pair unique (user_a_id, user_b_id)
);

create index conversations_user_a_idx on public.conversations (user_a_id);
create index conversations_user_b_idx on public.conversations (user_b_id);

create or replace function public.create_or_get_conversation(other_user_id uuid)
returns setof public.conversations
language plpgsql
security invoker
set search_path = ''
as $$
declare
  current_user_id uuid := auth.uid();
  first_user_id uuid;
  second_user_id uuid;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;
  if other_user_id is null or other_user_id = current_user_id then
    raise exception 'Choose another user';
  end if;

  first_user_id := least(current_user_id, other_user_id);
  second_user_id := greatest(current_user_id, other_user_id);

  insert into public.conversations (user_a_id, user_b_id)
  values (first_user_id, second_user_id)
  on conflict (user_a_id, user_b_id) do nothing;

  return query
    select conversation.*
    from public.conversations as conversation
    where conversation.user_a_id = first_user_id
      and conversation.user_b_id = second_user_id;
end;
$$;

grant execute on function public.create_or_get_conversation(uuid) to authenticated;
