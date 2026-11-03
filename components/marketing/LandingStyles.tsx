"use client";

import styled from "styled-components";

export const Container = styled.div`
  width: min(1160px, calc(100% - 56px));
  margin-inline: auto;
  @media (max-width: 640px) {
    width: min(100% - 36px, 560px);
  }
`;
export const Announcement = styled.div`
  min-height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 7px 18px;
  color: #e7eeff;
  background: #14223d;
  font-size: 12px;
  letter-spacing: 0.01em;
  svg {
    color: #9fbaff;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;
export const AnnouncementLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  margin-left: 8px;
  color: #b6caff;
  font-weight: 650;
  &:hover {
    color: #fff;
  }
`;
export const NavWrap = styled.header`
  position: sticky;
  top: 0;
  z-index: 30;
  border-bottom: 1px solid #edf1f6;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
`;
export const MainNav = styled(Container)`
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  @media (max-width: 720px) {
    height: 66px;
  }
`;
export const Brand = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  color: #10203d;
  font-size: 20px;
  font-weight: 760;
  letter-spacing: -0.8px;
  span:last-child {
    color: #2861d8;
  }
`;
export const BrandMark = styled.span`
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: white;
  background: linear-gradient(140deg, #3476ef, #7656de);
  box-shadow: 0 5px 12px rgba(52, 118, 239, 0.22);
`;
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  color: #516079;
  font-size: 13px;
  font-weight: 550;

  a {
    transition: color 0.18s ease;

    &:hover {
      color: #2563eb;
    }
  }

  @media (max-width: 720px) {
    display: none;
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .login-link {
    color: #45546c;
    font-size: 13px;
    font-weight: 600;
  }

  @media (max-width: 500px) {
    gap: 10px;

    .login-link {
      display: none;
    }
  }
`;
export const ButtonLink = styled.a<{
  $secondary?: boolean;
  $light?: boolean;
  $onDark?: boolean;
}>`
  min-height: 44px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 9px;
  padding: 0 17px;
  border: 1px solid
    ${({ $secondary, $onDark }) =>
      $secondary
        ? "#dce3ef"
        : $onDark
          ? "rgba(255,255,255,.38)"
          : "transparent"};
  border-radius: 11px;
  color: ${({ $secondary, $light, $onDark }) =>
    $secondary ? "#17243d" : $light ? "#1e4db7" : $onDark ? "#fff" : "#fff"};
  background: ${({ $secondary, $light, $onDark }) =>
    $secondary
      ? "#fff"
      : $light
        ? "#fff"
        : $onDark
          ? "rgba(255,255,255,.08)"
          : "#2563eb"};
  box-shadow: ${({ $secondary, $light, $onDark }) =>
    $secondary || $onDark
      ? "none"
      : $light
        ? "0 8px 20px rgba(0,0,0,.13)"
        : "0 7px 18px rgba(37,99,235,.2)"};
  font-size: 13px;
  font-weight: 650;
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 9px 22px rgba(37, 99, 235, 0.2);
    background: ${({ $secondary, $light, $onDark }) =>
      $secondary
        ? "#f7f9fc"
        : $light
          ? "#edf3ff"
          : $onDark
            ? "rgba(255,255,255,.16)"
            : "#1d4ed8"};
  }
`;
export const HeroSection = styled.section`
  overflow: hidden;
  padding: 84px 0 72px;
  background:
    radial-gradient(
      ellipse at 78% 42%,
      rgba(234, 241, 255, 0.78),
      transparent 39%
    ),
    linear-gradient(180deg, #fff 0%, #fbfcff 100%);
  @media (max-width: 768px) {
    padding: 62px 0 50px;
  }
`;
export const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: 1.02fr 0.98fr;
  align-items: center;
  gap: 56px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;
export const HeroCopy = styled.div`
  max-width: 570px;
  h1 {
    margin: 18px 0 20px;
    color: #101d37;
    font-size: clamp(39px, 5vw, 61px);
    line-height: 1.1;
    letter-spacing: -2.9px;
    font-weight: 760;
  }
  h1 em {
    color: #2862dc;
    font-style: normal;
  }
`;
export const Eyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #4167bc;
  font-size: 10px;
  font-weight: 750;
  letter-spacing: 0.12em;
  > span:first-child {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #3b72ed;
    box-shadow: 0 0 0 4px #e8efff;
  }
`;
export const HeroDescription = styled.p`
  max-width: 495px;
  margin: 0;
  color: #64728a;
  font-size: 16px;
  line-height: 1.85;
`;
export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 28px;
  .play {
    color: #5075c1;
    font-size: 11px;
  }
`;
export const SocialProof = styled.div`
  display: flex;
  gap: 13px;
  align-items: center;
  margin-top: 32px;
  > div:last-child {
    display: grid;
    gap: 4px;
  }
  strong {
    color: #394965;
    font-size: 11px;
    font-weight: 650;
  }
  small {
    color: #8792a4;
    font-size: 10px;
  }
  small span {
    margin-right: 5px;
    color: #f2a93b;
    letter-spacing: 1px;
  }
`;
export const AvatarStack = styled.div`
  display: flex;
  padding-left: 2px;
  > span + span {
    margin-left: -9px;
  }
`;
export const Avatar = styled.span<{ $small?: boolean; $person?: string }>`
  width: ${({ $small }) => ($small ? "25px" : "33px")};
  height: ${({ $small }) => ($small ? "25px" : "33px")};
  display: grid;
  place-items: center;
  flex: 0 0 auto;
  border: ${({ $small }) => ($small ? "2px solid #fff" : "2px solid #fff")};
  border-radius: 50%;
  color: ${({ $person }) => ($person ? "#fff" : "#fff")};
  background: ${({ $person }) =>
    $person === "one"
      ? "linear-gradient(135deg,#bd7857,#f2c4a1)"
      : $person === "two"
        ? "linear-gradient(135deg,#7656ae,#d1b5ec)"
        : $person === "three"
          ? "linear-gradient(135deg,#388a82,#add8bf)"
          : $person === "four"
            ? "linear-gradient(135deg,#d48443,#f3c58e)"
            : "linear-gradient(140deg,#3577ee,#7956dc)"};
  font-size: ${({ $small }) => ($small ? "11px" : "10px")};
  font-weight: 700;
`;
export const HeroVisual = styled.div`
  min-width: 0;
`;
export const HeroArt = styled.div`
  position: relative;
  min-height: 468px;
  display: grid;
  place-items: center;
  isolation: isolate;
  .art-orbit {
    position: absolute;
    z-index: -1;
    border: 1px solid #e3ebfd;
    border-radius: 50%;
  }
  .orbit-one {
    width: 405px;
    height: 405px;
  }
  .orbit-two {
    width: 330px;
    height: 330px;
    border-style: dashed;
  }
  .art-spark {
    position: absolute;
    color: #6589e0;
  }
  .spark-one {
    top: 60px;
    right: 58px;
    font-size: 30px;
  }
  .spark-two {
    bottom: 52px;
    left: 76px;
    font-size: 21px;
    color: #9b74db;
  }
  .art-dot {
    position: absolute;
    width: 8px;
    height: 8px;
    background: #f1b85c;
    border-radius: 50%;
  }
  .dot-one {
    left: 76px;
    top: 110px;
  }
  .dot-two {
    right: 55px;
    bottom: 108px;
    background: #a98be6;
  }
  @media (max-width: 900px) {
    min-height: 450px;
  }
  @media (max-width: 520px) {
    min-height: 395px;
    .orbit-one {
      width: 330px;
      height: 330px;
    }
    .orbit-two {
      width: 270px;
      height: 270px;
    }
  }
`;
export const AssistantCard = styled.div`
  position: relative;
  width: min(370px, 84vw);
  overflow: hidden;
  border: 1px solid #e6ebf3;
  border-radius: 19px;
  background: #fff;
  box-shadow:
    0 28px 75px rgba(36, 61, 111, 0.16),
    0 4px 14px rgba(36, 61, 111, 0.05);
`;
export const AssistantHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 17px;
  border-bottom: 1px solid #f0f2f7;
  color: #17243d;
  > div:nth-child(2) {
    display: grid;
    gap: 5px;
  }
  strong {
    font-size: 12px;
  }
  small {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #8a96a9;
    font-size: 10px;
  }
  .header-dots {
    margin-left: auto;
    color: #8b97a9;
    font-size: 22px;
    line-height: 1;
  }
`;
export const Online = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #25b77a;
  box-shadow: 0 0 0 3px #e7f8f0;
`;
export const ChatBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 19px 17px 13px;
`;
export const ChatTimestamp = styled.div`
  margin-bottom: 3px;
  text-align: center;
  color: #a0a9b7;
  font-size: 8px;
  font-weight: 650;
  letter-spacing: 0.1em;
`;
export const AssistantMessage = styled.div<{ $user?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 7px;
  align-self: ${({ $user }) => ($user ? "flex-end" : "flex-start")};
  max-width: 88%;
  padding: ${({ $user }) => ($user ? "10px 12px" : "8px 0")};
  border-radius: 12px 12px ${({ $user }) => ($user ? "3px 12px" : "12px 12px")};
  color: ${({ $user }) => ($user ? "#fff" : "#536178")};
  background: ${({ $user }) => ($user ? "#2864df" : "transparent")};
  font-size: 10px;
  line-height: 1.65;
  > span:last-child {
    display: block;
    padding: ${({ $user }) => ($user ? "0" : "8px 11px")};
    border-radius: 11px;
    background: ${({ $user }) => ($user ? "transparent" : "#f3f6fb")};
  }
`;
export const ChatInputPreview = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 5px 13px 0;
  padding: 9px 10px 9px 12px;
  border: 1px solid #e8ecf3;
  border-radius: 9px;
  color: #a1aaba;
  font-size: 9px;
  span {
    width: 24px;
    height: 24px;
    display: grid;
    place-items: center;
    border-radius: 7px;
    color: white;
    background: #3169e2;
  }
`;
export const WidgetHint = styled.div`
  position: absolute;
  left: -8px;
  bottom: 57px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  border: 1px solid #e9edf5;
  border-radius: 13px;
  background: #fff;
  box-shadow: 0 10px 30px rgba(38, 60, 103, 0.12);
  > span {
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border-radius: 10px;
    color: #3272df;
    background: #edf3ff;
  }
  div {
    display: grid;
    gap: 4px;
  }
  strong {
    color: #23314b;
    font-size: 10px;
  }
  small {
    color: #8792a3;
    font-size: 9px;
  }
  @media (max-width: 520px) {
    left: 0;
    bottom: 25px;
    padding: 9px 10px;
  }
`;
export const BadgeLabel = styled.div`
  position: absolute;
  right: 1px;
  top: 67px;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 9px 12px;
  border: 1px solid #e9edf5;
  border-radius: 10px;
  color: #456183;
  background: #fff;
  box-shadow: 0 8px 25px rgba(38, 60, 103, 0.1);
  font-size: 9px;
  font-weight: 650;
  svg {
    color: #f2aa40;
  }
  @media (max-width: 520px) {
    right: 0;
    top: 37px;
  }
`;
export const TrustSection = styled.section`
  padding: 24px 0 36px;
  border-bottom: 1px solid #edf1f6;
  text-align: center;
  > div > p {
    margin: 0 0 22px;
    color: #a0a9b6;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.15em;
  }
`;
export const LogoCloud = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  max-width: 900px;
  margin: auto;
  @media (max-width: 680px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 18px 32px;
  }
`;
export const LogoItem = styled.span`
  color: #738098;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.8px;
  opacity: 0.72;
  span {
    font-size: 9px;
    vertical-align: top;
  }
  small {
    font-size: 11px;
    font-weight: 500;
  }
  .bloom & {
    font-family: Georgia, serif;
    font-weight: 700;
  }
  .pixel & {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -1px;
  }
  .pixel span {
    color: #8097cb;
    font-size: 20px;
  }
  .kindred & {
    font-family: Georgia, serif;
    font-style: italic;
  }
  .sunday & {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.4px;
  }
`;
export const FeatureSection = styled.section`
  padding: 100px 0 104px;
  background: #fff;
  @media (max-width: 768px) {
    padding: 72px 0;
  }
`;
export const SectionIntro = styled.div`
  max-width: 660px;
  margin: 0 auto 45px;
  text-align: center;
  > p {
    max-width: 570px;
    margin: 13px auto 0;
    color: #738097;
    font-size: 14px;
    line-height: 1.8;
  }
`;
export const SectionTitle = styled.h2`
  margin: 14px 0 0;
  color: #15223b;
  font-size: clamp(30px, 4vw, 43px);
  line-height: 1.18;
  letter-spacing: -1.8px;
  font-weight: 730;
  em {
    color: #3c6cce;
    font-style: normal;
  }
`;
export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 17px;
  @media (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 540px) {
    grid-template-columns: 1fr;
  }
`;
export const FeatureCard = styled.article`
  min-height: 218px;
  padding: 23px 23px 20px;
  border: 1px solid #ebeff5;
  border-radius: 15px;
  background: linear-gradient(145deg, #fff, #fcfdff);
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  &:hover {
    transform: translateY(-4px);
    border-color: #d8e4fb;
    box-shadow: 0 15px 35px rgba(32, 61, 111, 0.07);
  }
  h3 {
    margin: 16px 0 8px;
    color: #1a2943;
    font-size: 15px;
    letter-spacing: -0.25px;
  }
  p {
    min-height: 52px;
    margin: 0;
    color: #78859a;
    font-size: 12px;
    line-height: 1.75;
  }
`;
export const FeatureIcon = styled.div<{ $index: number }>`
  width: 39px;
  height: 39px;
  display: grid;
  place-items: center;
  border-radius: 12px;
  color: ${({ $index }) =>
    ["#2865df", "#7956d9", "#18a77b", "#e19537", "#347eae", "#d16a84"][$index]};
  background: ${({ $index }) =>
    ["#edf3ff", "#f2eeff", "#e9f8f1", "#fff5e7", "#eaf5fa", "#fff0f3"][$index]};
  svg {
    width: 19px;
    height: 19px;
    stroke-width: 1.8;
  }
`;
export const FeatureLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;
  color: #3066cc;
  font-size: 11px;
  font-weight: 650;
`;
export const StepsSection = styled.section`
  padding: 92px 0 94px;
  background: #f7f9fd;
  @media (max-width: 768px) {
    padding: 70px 0;
  }
`;
export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 100px;
  align-items: center;
  .steps-copy > p {
    max-width: 350px;
    margin: 16px 0 23px;
    color: #758198;
    font-size: 13px;
    line-height: 1.8;
  }
  .steps-copy > .sc-bdnyFh {
    margin-top: 5px;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    gap: 35px;
  }
`;
export const Step = styled.article`
  display: grid;
  grid-template-columns: 42px 1fr 22px;
  gap: 16px;
  align-items: start;
  padding: 20px 0;
  border-bottom: 1px solid #e4e9f1;
  &:first-child {
    border-top: 1px solid #e4e9f1;
  }
  .step-number {
    color: #7a96d5;
    font-size: 12px;
    font-weight: 750;
    letter-spacing: 0.06em;
  }
  h3 {
    margin: 0 0 6px;
    color: #1d2b45;
    font-size: 14px;
  }
  p {
    max-width: 420px;
    margin: 0;
    color: #758198;
    font-size: 12px;
    line-height: 1.7;
  }
  .step-arrow {
    color: #92a5ca;
    transition: transform 0.18s ease;
  }
  &:hover .step-arrow {
    transform: translate(2px, -2px);
    color: #2865df;
  }
`;
export const DashboardMock = styled.div`
  max-width: 950px;
  margin: 0 auto;
  padding: 26px 30px 28px;
  border: 1px solid #e6ebf3;
  border-radius: 18px;
  background: #fff;
  box-shadow: 0 25px 70px rgba(30, 55, 100, 0.1);
  @media (max-width: 640px) {
    padding: 18px 15px;
  }
`;
export const DashboardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  h2 {
    max-width: 450px;
    margin: 9px 0 0;
    color: #1a2943;
    font-size: 20px;
    letter-spacing: -0.7px;
  }
  .sc-bdnyFh {
    font-size: 10px;
  }
`;
export const DashboardNav = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 22px;
  border-bottom: 1px solid #edf0f5;
  color: #8490a2;
  font-size: 10px;
  span {
    padding: 0 0 11px;
  }
  .selected {
    border-bottom: 2px solid #316be4;
    color: #2d5fc0;
    font-weight: 650;
  }
`;
export const DashboardStat = styled.div`
  display: grid;
  gap: 8px;
  padding: 14px 15px;
  border: 1px solid #edf0f5;
  border-radius: 11px;
  > span {
    color: #78859a;
    font-size: 10px;
  }
  strong {
    color: #1a2943;
    font-size: 23px;
    letter-spacing: -0.8px;
  }
  small {
    color: #19a06c;
    font-size: 9px;
    font-weight: 650;
  }
  i {
    color: #9aa4b2;
    font-style: normal;
    font-weight: 450;
  }
`;
export const QuoteSection = styled.section`
  padding: 80px 0;
  background: #fff;
  @media (max-width: 700px) {
    padding: 55px 0;
  }
`;
export const QuoteCard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 55px 1fr 210px;
  gap: 15px;
  align-items: center;
  padding: 38px 43px;
  border: 1px solid #e9edf4;
  border-radius: 17px;
  background:
    radial-gradient(ellipse at 85% 45%, #f1f5ff, transparent 36%), #fff;
  @media (max-width: 800px) {
    grid-template-columns: 38px 1fr;
    padding: 27px 22px;
  }
  .quote-mark {
    align-self: start;
    color: #90adeb;
    font-family: Georgia, serif;
    font-size: 77px;
    line-height: 0.85;
  }
  .quote-stars {
    color: #f0aa38;
    font-size: 13px;
    letter-spacing: 2px;
  }
  @media (max-width: 800px) {
    .quote-side-note {
      display: none;
    }
  }
`;
export const Quote = styled.blockquote`
  max-width: 650px;
  margin: 13px 0 20px;
  color: #2d3c57;
  font-size: clamp(16px, 2vw, 22px);
  font-weight: 520;
  line-height: 1.65;
  letter-spacing: -0.3px;
`;
export const QuoteAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  > span:last-child {
    display: grid;
    gap: 4px;
  }
  strong {
    color: #2e3c55;
    font-size: 10px;
  }
  small {
    color: #8490a2;
    font-size: 9px;
  }
`;
export const CtaSection = styled.section`
  padding: 20px 0 75px;
  background: #fff;
  .cta-inner {
    position: relative;
    overflow: hidden;
    padding: 54px 24px;
    text-align: center;
    border-radius: 20px;
    background: linear-gradient(115deg, #1b3f8b, #315fc2 53%, #5948ac);
    isolation: isolate;
  }
  .cta-inner > p {
    margin: 0;
    color: #dce7ff;
    font-size: 13px;
  }
  .cta-inner .eyebrow {
    color: #d5e2ff;
  }
  .cta-inner .eyebrow svg {
    color: #c5d6ff;
  }
  .cta-orb {
    position: absolute;
    z-index: -1;
    width: 220px;
    height: 220px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
  }
  .orb-left {
    left: -90px;
    top: -120px;
  }
  .orb-right {
    right: -55px;
    bottom: -155px;
    width: 300px;
    height: 300px;
  }
  @media (max-width: 700px) {
    padding: 5px 0 60px;
    .cta-inner {
      padding: 44px 18px;
    }
  }
`;
export const CtaTitle = styled.h2`
  margin: 14px 0 9px;
  color: #fff;
  font-size: clamp(30px, 4vw, 42px);
  letter-spacing: -1.7px;
  em {
    color: #a9c7ff;
    font-style: normal;
  }
`;
export const CtaActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 23px;
  @media (max-width: 430px) {
    flex-direction: column;
    align-items: stretch;
  }
`;
export const PricingSection = styled.section`
  padding: 85px 0 95px;
  background: #f8faff;
  @media (max-width: 700px) {
    padding: 65px 0;
  }
`;
export const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 390px;
  gap: 100px;
  align-items: center;
  max-width: 930px;
  margin: auto;
  .pricing-copy > p {
    max-width: 425px;
    color: #748198;
    font-size: 14px;
    line-height: 1.8;
  }
  .pricing-copy > .sc-bdnyFh {
    margin-top: 17px;
  }
  @media (max-width: 850px) {
    grid-template-columns: 1fr 360px;
    gap: 35px;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr;
    max-width: 440px;
  }
`;
export const PriceCard = styled.div`
  padding: 25px 26px 20px;
  border: 1px solid #e4eaf4;
  border-radius: 17px;
  background: #fff;
  box-shadow: 0 14px 42px rgba(29, 57, 108, 0.08);
  h3 {
    margin: 21px 0 7px;
    color: #1b2942;
    font-size: 17px;
  }
  p {
    margin: 0;
    color: #7b8799;
    font-size: 11px;
    line-height: 1.65;
  }
`;
export const PriceHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const PriceLabel = styled.span`
  color: #687fae;
  font-size: 9px;
  font-weight: 750;
  letter-spacing: 0.12em;
`;
export const PriceNumber = styled.div`
  margin: 18px 0 14px;
  strong {
    color: #1d2c47;
    font-size: 30px;
    letter-spacing: -1.4px;
  }
  span {
    color: #8792a3;
    font-size: 11px;
  }
`;
export const PriceFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 12px 0;
  color: #536178;
  font-size: 11px;
  span {
    width: 17px;
    height: 17px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #188b60;
    background: #e8f7ef;
    font-size: 10px;
    font-weight: 800;
  }
`;
export const CheckLine = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 12px 0;
  color: #5e6d83;
  font-size: 12px;
  > span {
    color: #19a06c;
    font-weight: 800;
  }
`;
export const FaqGrid = styled.section`
  padding: 88px 0 95px;
  background: #fff;
  @media (max-width: 700px) {
    padding: 65px 0;
  }
`;
export const FaqList = styled.div`
  border-top: 1px solid #e8edf4;
`;
export const FaqItem = styled.details`
  border-bottom: 1px solid #e8edf4;
  summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
    padding: 19px 0;
    color: #263650;
    font-size: 13px;
    font-weight: 620;
    cursor: pointer;
    list-style: none;
  }
  summary::-webkit-details-marker {
    display: none;
  }
  summary svg {
    flex-shrink: 0;
    color: #7e8ba1;
    transition: transform 0.18s ease;
  }
  [open] summary svg {
    transform: rotate(180deg);
  }
`;
export const FaqAnswer = styled.p`
  max-width: 620px;
  margin: -3px 30px 19px 0;
  color: #758198;
  font-size: 12px;
  line-height: 1.8;
`;
export const Footer = styled.footer`
  padding: 48px 0 20px;
  background: #f8faff;
  border-top: 1px solid #edf1f6;
`;
export const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: 1.6fr 0.8fr 0.8fr 1.1fr;
  gap: 38px;
  padding-bottom: 38px;
  .footer-brand p {
    max-width: 265px;
    color: #78859a;
    font-size: 11px;
    line-height: 1.8;
  }
  .footer-brand ${Brand} {
    font-size: 18px;
  }
  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr;
    gap: 26px;
  }
  .footer-note {
    display: none;
  }
  @media (max-width: 430px) {
    grid-template-columns: 1fr 1fr;
    gap: 22px;
  }
`;
export const FooterColumn = styled.div`
  display: grid;
  align-content: start;
  gap: 12px;
  color: #718097;
  font-size: 11px;
  strong {
    margin-bottom: 3px;
    color: #263650;
    font-size: 11px;
  }
  a:hover {
    color: #2563eb;
  }
`;
export const FooterNote = styled.div`
  align-self: center;
  color: #6c7a91;
  font-size: 11px;
  line-height: 1.9;
  span {
    color: #3269d5;
    font-size: 19px;
    vertical-align: middle;
  }
`;
export const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  padding-top: 17px;
  border-top: 1px solid #e8edf4;
  color: #97a1b0;
  font-size: 9px;
  > div {
    display: flex;
    gap: 20px;
  }
  a:hover {
    color: #2563eb;
  }
  .heart {
    color: #de7581;
  }
  @media (max-width: 600px) {
    flex-wrap: wrap;
    > span:last-child {
      display: none;
    }
  }
`;
export const CtaSectionDummy = styled.div``;
export const CtaSectionInner = styled.div``;
export const CtaActionsDummy = styled.div``;
export const CtaTitleDummy = styled.div``;
export const CtaSectionContainer = styled.div``;
export const CtaSectionBody = styled.div``;
export const CtaSectionHeading = styled.div``;
export const CtaSectionText = styled.div``;
export const CtaSectionButtons = styled.div``;
export const CtaSectionEyebrow = styled.div``;
export const CtaSectionOrb = styled.div``;
