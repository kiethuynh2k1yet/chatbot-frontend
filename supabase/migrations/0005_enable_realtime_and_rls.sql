alter table public.profiles enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.typing_status enable row level security;

create policy "Authenticated users can find profiles"
  on public.profiles for select to authenticated
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

revoke update on public.profiles from authenticated;
grant update (display_name, avatar_url, is_online, last_seen_at)
  on public.profiles to authenticated;

revoke insert on public.conversations from authenticated;
grant insert (user_a_id, user_b_id)
  on public.conversations to authenticated;

create policy "Participants can read their conversations"
  on public.conversations for select to authenticated
  using (
    user_a_id = (select auth.uid())
    or user_b_id = (select auth.uid())
  );

create policy "Users can create conversations they participate in"
  on public.conversations for insert to authenticated
  with check (
    (user_a_id = (select auth.uid()) or user_b_id = (select auth.uid()))
    and user_a_id < user_b_id
  );

create policy "Participants can read conversation messages"
  on public.messages for select to authenticated
  using (
    exists (
      select 1
      from public.conversations
      where conversations.id = messages.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

create policy "Participants can send messages as themselves"
  on public.messages for insert to authenticated
  with check (
    sender_id = (select auth.uid())
    and exists (
      select 1
      from public.conversations
      where conversations.id = messages.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

revoke insert on public.messages from authenticated;
grant insert (conversation_id, sender_id, content)
  on public.messages to authenticated;

create policy "Participants can read typing status"
  on public.typing_status for select to authenticated
  using (
    exists (
      select 1
      from public.conversations
      where conversations.id = typing_status.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

create policy "Users can create their own typing status"
  on public.typing_status for insert to authenticated
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.conversations
      where conversations.id = typing_status.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

create policy "Users can update their own typing status"
  on public.typing_status for update to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.conversations
      where conversations.id = typing_status.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  )
  with check (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.conversations
      where conversations.id = typing_status.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

create policy "Users can delete their own typing status"
  on public.typing_status for delete to authenticated
  using (
    user_id = (select auth.uid())
    and exists (
      select 1
      from public.conversations
      where conversations.id = typing_status.conversation_id
        and (
          conversations.user_a_id = (select auth.uid())
          or conversations.user_b_id = (select auth.uid())
        )
    )
  );

revoke insert, update on public.typing_status from authenticated;
grant insert (conversation_id, user_id, is_typing)
  on public.typing_status to authenticated;
grant update (conversation_id, user_id, is_typing, updated_at)
  on public.typing_status to authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'avatars',
  'avatars',
  true,
  3145728,
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create policy "Avatar images are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "Users can upload their own avatar"
  on storage.objects for insert to authenticated
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can update their own avatar"
  on storage.objects for update to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  )
  with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "Users can delete their own avatar"
  on storage.objects for delete to authenticated
  using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'messages'
  ) then
    alter publication supabase_realtime add table public.messages;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'profiles'
  ) then
    alter publication supabase_realtime add table public.profiles;
  end if;
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'typing_status'
  ) then
    alter publication supabase_realtime add table public.typing_status;
  end if;
end;
$$;

revoke execute on function public.create_or_get_conversation(uuid) from public;
revoke execute on function public.create_or_get_conversation(uuid) from anon;
grant execute on function public.create_or_get_conversation(uuid) to authenticated;
