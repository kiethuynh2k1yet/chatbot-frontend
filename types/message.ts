export type Message = {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export type TypingStatus = {
  conversation_id: string;
  user_id: string;
  is_typing: boolean;
  updated_at: string;
};
