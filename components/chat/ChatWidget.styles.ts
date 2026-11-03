import styled, { keyframes } from "styled-components";

const appear = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const bounce = keyframes`
 0%,
 60%,
 100% {
    opacity: 0.45;
    transform: translateY(0);
  }

 30% {
    opacity: 1;
    transform: translateY(-4px);
  }
`;

export const WidgetRoot = styled.div`
  position: fixed;
  right: 26px;
  bottom: 25px;
  z-index: 50;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 13px;

  @media (max-width: 500px) {
    right: 14px;
    bottom: 14px;
  }
`;

export const Toggle = styled.button`
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 20px;
  color: #fff;
  background: linear-gradient(140deg, #3476ef, #7054d7);
  box-shadow: 0 12px 28px rgba(37, 99, 235, 0.32);
  cursor: pointer;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px) scale(1.03);
    box-shadow: 0 16px 32px rgba(37, 99, 235, 0.38);
  }

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const ChatWindow = styled.div`
  width: min(360px, calc(100vw - 28px));
  overflow: hidden;
  border: 1px solid #e3e9f2;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 24px 75px rgba(18, 38, 76, 0.2);
  animation: ${appear} 0.2s ease;
`;

export const WindowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 17px;
  color: #fff;
  background: linear-gradient(110deg, #2864dc, #6353ce);
`;

export const BotIcon = styled.span`
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: #fff;
  background: rgba(255, 255, 255, 0.18);
`;

export const HeaderText = styled.div`
  display: grid;
  gap: 4px;

  strong {
    font-size: 13px;
  }
`;

export const StatusText = styled.small`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #dce7ff;
  font-size: 10px;
`;

export const OnlineIndicator = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #68e1ae;
`;

export const CloseButton = styled.button`
  margin-left: auto;
  border: 0;
  color: #fff;
  background: transparent;
  cursor: pointer;
`;

export const Messages = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: auto;
  padding: 17px 14px;
  background: #fbfcfe;
`;

export const Bubble = styled.div<{ $user?: boolean }>`
  max-width: 84%;
  align-self: ${({ $user }) => ($user ? "flex-end" : "flex-start")};
  padding: 10px 12px;
  border: ${({ $user }) => ($user ? "0" : "1px solid #e9edf4")};
  border-radius: ${({ $user }) =>
    $user ? "13px 13px 4px 13px" : "4px 13px 13px 13px"};
  color: ${({ $user }) => ($user ? "#fff" : "#40506a")};
  background: ${({ $user }) => ($user ? "#3169df" : "#fff")};
  box-shadow: ${({ $user }) =>
    $user ? "none" : "0 2px 5px rgba(20, 40, 80, 0.03)"};
  font-size: 12px;
  line-height: 1.65;
`;

export const TypingIndicator = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid #e9edf4;
  border-radius: 4px 13px 13px;
  background: #fff;

  span {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: #8797b1;
    animation: ${bounce} 1s infinite ease-in-out;
  }

  span:nth-child(2) {
    animation-delay: 0.15s;
  }

  span:nth-child(3) {
    animation-delay: 0.3s;
  }
`;

export const QuickReplies = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 10px 14px 12px;
  border-top: 1px solid #eff2f6;
  background: #fbfcfe;

  button {
    padding: 7px 9px;
    border: 1px solid #dce6f7;
    border-radius: 999px;
    color: #3263bc;
    background: #fff;
    font-size: 10px;
    cursor: pointer;

    &:hover {
      background: #f0f5ff;
    }
  }
`;

export const Composer = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px 9px;
  padding: 7px 8px 7px 12px;
  border: 1px solid #e6ebf2;
  border-radius: 12px;
  background: #fff;

  input {
    min-width: 0;
    flex: 1;
    border: 0;
    outline: none;
    color: #34425a;
    font-size: 11px;
  }

  input::placeholder {
    color: #a3adbb;
  }

  button {
    width: 31px;
    height: 31px;
    display: grid;
    place-items: center;
    border: 0;
    border-radius: 9px;
    color: #fff;
    background: #3169df;
    cursor: pointer;

    &:disabled {
      opacity: 0.5;
    }
  }
`;

export const WidgetFooter = styled.div`
  padding: 0 0 10px;
  color: #a0a9b7;
  text-align: center;
  font-size: 9px;

  strong {
    color: #5675b9;
  }
`;
