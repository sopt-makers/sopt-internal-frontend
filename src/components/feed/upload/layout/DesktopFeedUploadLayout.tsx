import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode } from 'react';

interface DesktopFeedUploadLayoutProps {
  header: ReactNode;
  body: ReactNode;
  footer: ReactNode;
}

export default function DesktopFeedUploadLayout({ header, body, footer }: DesktopFeedUploadLayoutProps) {
  return (
    <>
      <HeaderWrapper>{header}</HeaderWrapper>
      <BodyContainer>
        <BodyWrapper>{body}</BodyWrapper>
      </BodyContainer>
      <FooterContainer>
        <FooterWrapper>{footer}</FooterWrapper>
      </FooterContainer>
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  position: sticky;
  top: 0;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.gray800};
  padding: 15px 32px;
  width: 100%;
  height: 64px;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 608px;
`;

const BodyContainer = styled.section`
  display: flex;
  justify-content: center;
  padding-top: 24px;
  width: 100%;
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 640px;
`;

const FooterContainer = styled.footer`
  display: flex;
  position: absolute;
  bottom: 0;
  justify-content: center;
  width: 100%;
`;
