import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { forwardRef, ReactNode } from 'react';

import { useEscapeCallback } from '@/hooks/useEscapeCallback';

interface SidePanelProps {
  isOpen: boolean;
  onClose(): void;
  title: string;
  children?: ReactNode;
}

const SideBar = forwardRef<HTMLDivElement, SidePanelProps>(({ isOpen, onClose, title, children }, ref) => {
  useEscapeCallback({
    callback: onClose,
  });

  return (
    <StyledSidePanel ref={ref} isOpen={isOpen}>
      <Header>
        <HeaderTitle>{title}</HeaderTitle>
        <CloseButton onClick={() => onClose()}>X</CloseButton>
      </Header>
      <Content>{children}</Content>
    </StyledSidePanel>
  );
});

export default SideBar;

const StyledSidePanel = styled.div<{ isOpen: boolean }>`
  box-sizing: border-box;
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  flex-direction: column;
  transition: transform 0.3s ease-in 0s;
  z-index: 99999999;
  border-right: 1px solid gray;
  background-color: #373737;
  width: 500px;
  overflow: visible;
  color: white;

  ${(props) =>
    props.isOpen
      ? css`
          right: 0;
          transform: none;
        `
      : css`
          transform: translateX(100%);
        `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-top: 3px;
`;

const HeaderTitle = styled.h2`
  flex-grow: 1;
  margin-left: 15px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px 0 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 40px;
  height: 40px;
  color: white;

  &:hover {
    background-color: rgb(200 200 200 / 30%);
  }
`;
