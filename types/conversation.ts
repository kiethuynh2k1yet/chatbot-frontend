import type { Profile } from "./profile";
import type { Message } from "./message";

export type Conversation = {
  id: string;
  user_a_id: string;
  user_b_id: string;
  created_at: string;
  updated_at: string;
};

export type ConversationSummary = {
  conversation: Conversation;
  participant: Profile;
  lastMessage: Message | null;
};
