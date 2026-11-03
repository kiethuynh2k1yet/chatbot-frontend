import type { Conversation } from "./conversation";
import type { Message, TypingStatus } from "./message";
import type { Profile } from "./profile";

type Table<Row> = {
  Row: Row;
  Insert: Partial<Row>;
  Update: Partial<Row>;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      profiles: Table<Profile>;
      conversations: Table<Conversation>;
      messages: Table<Message>;
      typing_status: Table<TypingStatus>;
    };
    Views: Record<string, never>;
    Functions: {
      create_or_get_conversation: {
        Args: { other_user_id: string };
        Returns: Conversation[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
