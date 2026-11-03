"use client";

import { ArrowLeft, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import type { Profile } from "@/types/profile";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Avatar from "@/components/ui/Avatar";
import OnlineDot from "@/components/ui/OnlineDot";

const Header = styled.header`
  display: flex;
  min-height: 76px;
  align-items: center;
  gap: 13px;
  padding: 12px 22px;
  border-bottom: 1px solid #edf0f4;
  background: rgba(255, 255, 255, 0.92);
`;

const BackButton = styled.button`
  display: none;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  place-items: center;
  border: 0;
  border-radius: 10px;
  color: #475569;
  background: transparent;
  cursor: pointer;

  &:hover {
    background: #f1f5f9;
  }

  @media (max-width: 767px) {
    display: grid;
  }
`;

const AvatarWrap = styled.div`
  position: relative;
`;

const Dot = styled.span`
  position: absolute;
  right: -1px;
  bottom: 1px;
`;

const Details = styled.div`
  display: grid;
  flex: 1;
  gap: 4px;

  strong {
    color: #172033;
    font-size: 15px;
    font-weight: 680;
  }

  span {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #8a94a5;
    font-size: 12px;
  }
`;

const MoreButton = styled.button`
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border: 0;
  border-radius: 11px;
  color: #8290a3;
  background: transparent;
`;

export default function ChatHeader({ profile }: { profile: Profile | null }) {
  const router = useRouter();
  const online = useOnlineStatus(
    profile ?? { is_online: false, last_seen_at: new Date(0).toISOString() },
  );
  const displayName = profile?.display_name ?? "Cuộc trò chuyện";
  return (
    <Header>
      <BackButton
        type="button"
        onClick={() => router.push("/chats")}
        aria-label="Quay lại danh sách chat"
      >
        <ArrowLeft size={20} />
      </BackButton>
      <AvatarWrap>
        <Avatar
          name={displayName}
          src={profile?.avatar_url}
          size={44}
        />
        <Dot>
          <OnlineDot online={online} />
        </Dot>
      </AvatarWrap>
      <Details>
        <strong>{displayName}</strong>
        <span>
          <OnlineDot online={online} />
          {!profile
            ? "Đang tải..."
            : online
              ? "Đang hoạt động"
              : "Ngoại tuyến"}
        </span>
      </Details>
      <MoreButton type="button" aria-label="Tùy chọn cuộc trò chuyện">
        <MoreHorizontal size={21} />
      </MoreButton>
    </Header>
  );
}
