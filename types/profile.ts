export type Profile = {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  is_online: boolean;
  last_seen_at: string;
  created_at: string;
};
