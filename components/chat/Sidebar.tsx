"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  LoaderCircle,
  LogOut,
  MessageCircle,
  Search,
  X,
} from "lucide-react";
import styled from "styled-components";
import { useAuth } from "@/hooks/useAuth";
import { useConversations } from "@/hooks/useConversations";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/profile";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Avatar from "@/components/ui/Avatar";
import OnlineDot from "@/components/ui/OnlineDot";
import ChatListItem from "./ChatListItem";

const Panel = styled.aside<{ $hideOnMobile: boolean }>`
  display: flex;
  width: 320px;
  height: 100%;
  flex: 0 0 320px;
  flex-direction: column;
  border-right: 1px solid #e8edf3;
  background: #fff;

  @media (max-width: 767px) {
    display: ${({ $hideOnMobile }) => ($hideOnMobile ? "none" : "flex")};
    width: 100%;
    flex-basis: 100%;
    border-right: 0;
  }
`;

const ClearSearch = styled.button`
  display: grid;
  place-items: center;
  padding: 3px;
  border: 0;
  color: inherit;
  background: transparent;
  cursor: pointer;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 22px 22px 19px;
  color: #14213d;
  font-size: 19px;
  font-weight: 750;
  letter-spacing: -0.04em;
`;

const ResultAvatar = styled.span`
  position: relative;
`;

const ResultDot = styled.span`
  position: absolute;
  right: -1px;
  bottom: 0;
`;

const InlineSpinner = styled(LoaderCircle)`
  display: inline;
  vertical-align: middle;
`;

const BrandIcon = styled.span`
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 12px;
  color: white;
  background: #0068ff;
`;

const SearchArea = styled.div`
  padding: 0 16px 16px;
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  height: 43px;
  align-items: center;
  gap: 9px;
  padding: 0 12px;
  border: 1px solid #edf0f4;
  border-radius: 12px;
  color: #94a3b8;
  background: #f7f8fa;

  input {
    width: 100%;
    min-width: 0;
    border: 0;
    outline: none;
    color: #0f172a;
    background: transparent;
    font-size: 13px;
  }
`;

const SectionHeading = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 21px 9px;
  color: #8a94a5;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Count = styled.span`
  display: grid;
  min-width: 21px;
  height: 21px;
  place-items: center;
  border-radius: 7px;
  color: #64748b;
  background: #f1f5f9;
  font-size: 11px;
  letter-spacing: 0;
`;

const List = styled.div`
  overflow-y: auto;
  flex: 1;
  padding: 2px 9px 14px;
`;

const Hint = styled.div`
  padding: 22px 14px;
  color: #8a94a5;
  font-size: 13px;
  line-height: 1.65;
  text-align: center;
`;

const SearchResult = styled.button`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 11px;
  padding: 11px 12px;
  border: 0;
  border-radius: 12px;
  background: transparent;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: #f6f8fb;
  }
`;

const ResultDetails = styled.span`
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 4px;

  strong {
    overflow: hidden;
    color: #172033;
    font-size: 13px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    overflow: hidden;
    color: #8a94a5;
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const UserArea = styled.div`
  padding: 13px 15px;
  border-top: 1px solid #edf0f4;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserDetails = styled.div`
  display: grid;
  min-width: 0;
  flex: 1;
  gap: 4px;

  strong,
  small {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  strong {
    color: #1e293b;
    font-size: 12px;
  }

  small {
    color: #94a3b8;
    font-size: 11px;
  }
`;

const IconButton = styled.button`
  display: grid;
  width: 34px;
  height: 34px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 10px;
  color: #64748b;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: #dc2626;
    background: #fef2f2;
  }
`;

const AvatarUpload = styled.label`
  position: relative;
  display: block;
  cursor: pointer;

  input {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    clip-path: inset(50%);
  }
`;

const UploadIcon = styled.span`
  position: absolute;
  right: -2px;
  bottom: -2px;
  display: grid;
  width: 21px;
  height: 21px;
  place-items: center;
  border: 2px solid #fff;
  border-radius: 50%;
  color: #fff;
  background: #0068ff;
`;

const InlineError = styled.p`
  margin: 8px 4px 0;
  color: #dc2626;
  font-size: 11px;
  line-height: 1.5;
`;

function SearchProfileResult({
  profile,
  onClick,
}: {
  profile: Profile;
  onClick: () => void;
}) {
  const isOnline = useOnlineStatus(profile);
  return (
    <SearchResult type="button" onClick={onClick}>
      <ResultAvatar>
        <Avatar name={profile.display_name} src={profile.avatar_url} size={43} />
        <ResultDot>
          <OnlineDot online={isOnline} />
        </ResultDot>
      </ResultAvatar>
      <ResultDetails>
        <strong>{profile.display_name}</strong>
        <small>{profile.email}</small>
      </ResultDetails>
    </SearchResult>
  );
}

export default function Sidebar({
  selectedConversationId,
}: {
  selectedConversationId?: string;
}) {
  const router = useRouter();
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { conversations, loading, error, searchUsers, startConversation } =
    useConversations();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [searching, setSearching] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 1) return;
    let active = true;
    const timeout = window.setTimeout(() => {
      setSearching(true);
      setResults([]);
      void searchUsers(term)
        .then((profiles) => {
          if (active) setResults(profiles);
        })
        .catch((searchError: unknown) => {
          if (active) {
            setActionError(
              searchError instanceof Error
                ? searchError.message
                : "Không thể tìm người dùng.",
            );
          }
        })
        .finally(() => {
          if (active) setSearching(false);
        });
    }, 250);
    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, [query, searchUsers]);

  async function openUser(target: Profile) {
    setActionError(null);
    try {
      const id = await startConversation(target.id);
      setQuery("");
      router.push(`/chats/${id}`);
    } catch (openError) {
      setActionError(
        openError instanceof Error ? openError.message : "Không thể mở trò chuyện.",
      );
    }
  }

  function handleSearchChange(value: string) {
    setQuery(value);
    setSearching(value.trim().length > 0);
    setActionError(null);
  }

  async function uploadAvatar(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !user) return;
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type)) {
      setActionError("Chọn ảnh JPG, PNG, WebP hoặc GIF.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setActionError("Ảnh đại diện không được lớn hơn 3 MB.");
      return;
    }
    setUploading(true);
    setActionError(null);
    try {
      const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${user.id}/avatar.${extension}`;
      const supabase = getSupabaseClient();
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, {
          cacheControl: "3600",
          contentType: file.type,
          upsert: true,
        });
      if (uploadError) throw new Error(`Không thể tải ảnh lên: ${uploadError.message}`);
      const { data } = supabase.storage.from("avatars").getPublicUrl(path);
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          avatar_url: `${data.publicUrl}?v=${Date.now()}`,
        })
        .eq("id", user.id);
      if (profileError) throw new Error(`Không thể lưu ảnh đại diện: ${profileError.message}`);
      await refreshProfile();
    } catch (uploadError) {
      setActionError(
        uploadError instanceof Error ? uploadError.message : "Không thể tải ảnh lên.",
      );
    } finally {
      setUploading(false);
    }
  }

  async function handleSignOut() {
    setActionError(null);
    try {
      await signOut();
      router.replace("/login");
    } catch (signOutError) {
      setActionError(
        signOutError instanceof Error ? signOutError.message : "Không thể đăng xuất.",
      );
    }
  }

  const searchingUsers = query.trim().length >= 1;
  return (
    <Panel
      $hideOnMobile={Boolean(selectedConversationId)}
      aria-label="Danh sách cuộc trò chuyện"
    >
      <Brand>
        <BrandIcon>
          <MessageCircle size={19} fill="currentColor" />
        </BrandIcon>
        MiniChat
      </Brand>
      <SearchArea>
        <SearchBox>
          <Search size={17} />
          <input
            type="search"
            value={query}
            onChange={(event) => handleSearchChange(event.target.value)}
            placeholder="Tìm tên hoặc email..."
            aria-label="Tìm người dùng"
          />
          {query && (
            <ClearSearch
              type="button"
              onClick={() => handleSearchChange("")}
              aria-label="Xóa tìm kiếm"
            >
              <X size={15} />
            </ClearSearch>
          )}
        </SearchBox>
      </SearchArea>
      <SectionHeading>
        <span>{searchingUsers ? "Tìm bạn bè" : "Tin nhắn"}</span>
        {!searchingUsers && <Count>{conversations.length}</Count>}
      </SectionHeading>
      <List>
        {searchingUsers ? (
          searching ? (
            <Hint>Đang tìm người dùng...</Hint>
          ) : results.length ? (
            results.map((result) => (
              <SearchProfileResult
                key={result.id}
                profile={result}
                onClick={() => void openUser(result)}
              />
            ))
          ) : (
            <Hint>Không tìm thấy người dùng phù hợp.</Hint>
          )
        ) : loading ? (
          <Hint>
            <InlineSpinner size={17} />{" "}
            Đang tải cuộc trò chuyện...
          </Hint>
        ) : conversations.length ? (
          conversations.map((item) => (
            <ChatListItem
              key={item.conversation.id}
              item={item}
              active={item.conversation.id === selectedConversationId}
              ownUserId={user?.id ?? ""}
              onClick={() => router.push(`/chats/${item.conversation.id}`)}
            />
          ))
        ) : (
          <Hint>
            Chưa có cuộc trò chuyện nào. Hãy tìm bạn bè để bắt đầu nhắn tin.
          </Hint>
        )}
        {error && <InlineError>{error}</InlineError>}
      </List>
      <UserArea>
        <UserRow>
          <AvatarUpload title="Đổi ảnh đại diện">
            <Avatar
              name={profile?.display_name ?? user?.email ?? "Bạn"}
              src={profile?.avatar_url}
              size={39}
            />
            <UploadIcon>
              {uploading ? <LoaderCircle size={11} /> : <Camera size={11} />}
            </UploadIcon>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => void uploadAvatar(event)}
              aria-label="Tải ảnh đại diện"
            />
          </AvatarUpload>
          <UserDetails>
            <strong>{profile?.display_name ?? "Tài khoản của tôi"}</strong>
            <small>{profile?.email ?? user?.email}</small>
          </UserDetails>
          <IconButton
            type="button"
            onClick={() => void handleSignOut()}
            aria-label="Đăng xuất"
            title="Đăng xuất"
          >
            <LogOut size={17} />
          </IconButton>
        </UserRow>
        {actionError && !searchingUsers && <InlineError>{actionError}</InlineError>}
      </UserArea>
    </Panel>
  );
}
