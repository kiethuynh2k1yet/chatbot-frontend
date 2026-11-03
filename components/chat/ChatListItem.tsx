"use client";

import { Check, CheckCheck } from "lucide-react";
import styled from "styled-components";
import type { ConversationSummary } from "@/types/conversation";
import { formatRelativeTime } from "@/lib/utils";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import Avatar from "@/components/ui/Avatar";
import OnlineDot from "@/components/ui/OnlineDot";

const Item = styled.button<{ $active: boolean }>`
  display: flex;
  width: 100%;
  min-height: 76px;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  border: 0;
  border-radius: 14px;
  color: inherit;
  background: ${({ $active }) => ($active ? "#EEF5FF" : "transparent")};
  text-align: left;
  cursor: pointer;
  transition: background 0.16s ease;

  &:hover {
    background: ${({ $active }) => ($active ? "#EEF5FF" : "#F6F8FB")};
  }
`;

const AvatarWrap = styled.div`
  position: relative;
`;

const DotWrap = styled.span`
  position: absolute;
  right: -1px;
  bottom: 1px;
`;

const Details = styled.span`
  display: block;
  min-width: 0;
  flex: 1;
`;

const TopLine = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const Name = styled.span`
  overflow: hidden;
  color: #172033;
  font-size: 14px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Time = styled.span`
  flex: 0 0 auto;
  color: #94a3b8;
  font-size: 11px;
`;

const Preview = styled.span<{ $unread: boolean }>`
  display: flex;
  align-items: center;
  gap: 5px;
  overflow: hidden;
  margin-top: 6px;
  color: ${({ $unread }) => ($unread ? "#334155" : "#8793a5")};
  font-size: 12px;
  font-weight: ${({ $unread }) => ($unread ? 600 : 400)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export default function ChatListItem({
  item,
  active,
  ownUserId,
  onClick,
}: {
  item: ConversationSummary;
  active: boolean;
  ownUserId: string;
  onClick: () => void;
}) {
  const online = useOnlineStatus(item.participant);
  const mine = item.lastMessage?.sender_id === ownUserId;
  return (
    <Item type="button" $active={active} onClick={onClick}>
      <AvatarWrap>
        <Avatar
          name={item.participant.display_name}
          src={item.participant.avatar_url}
          size={48}
        />
        <DotWrap>
          <OnlineDot online={online} />
        </DotWrap>
      </AvatarWrap>
      <Details>
        <TopLine>
          <Name>{item.participant.display_name}</Name>
          <Time>
            {item.lastMessage
              ? formatRelativeTime(item.lastMessage.created_at)
              : formatRelativeTime(item.conversation.created_at)}
          </Time>
        </TopLine>
        <Preview $unread={false}>
          {item.lastMessage ? (
            <>
              {mine ? (
                <CheckCheck size={14} color="#0068ff" aria-label="Đã gửi" />
              ) : (
                <Check size={14} />
              )}
              {item.lastMessage.content}
            </>
          ) : (
            "Bắt đầu trò chuyện"
          )}
        </Preview>
      </Details>
    </Item>
  );
}
