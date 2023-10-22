import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import FocusTrap from 'focus-trap-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode, useEffect, useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import Portal from '@/components/common/Portal';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import IconModalCheck from '@/public/icons/icon-modal-check.svg';
import IconModalClose from '@/public/icons/icon-modal-close.svg';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

/**
 * @deprecated MessageModal 만을 위한 임시 모달 입니다. 모바일 화면에 대응하기 위해 임시로 사용돼요.
 */
export interface ModalProps extends PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
  confirmIcon?: boolean;
  title?: string;
  content?: ReactNode;
  isOpen?: boolean;
  width?: number;
  className?: string;
  onClose: () => void;
}
const Modal: FC<ModalProps> = (props) => {
  const { confirmIcon, children, title = '', content, isOpen, onClose, width, ...restProps } = props;
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const keydownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keydownHandler);

    return () => {
      window.removeEventListener('keydown', keydownHandler);
    };
  }, [onClose]);

  useOnClickOutside(modalRef, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <StyledBackground>
        <FocusTrap>
          <RemoveScroll>
            <StyledModal ref={modalRef} role='dialog' width={width} {...restProps}>
              <StyledCloseButton type='button' onClick={onClose}>
                <StyledIconClose />
              </StyledCloseButton>
              <ModalContent>
                {confirmIcon && <StyledIconCheck />}
                {title && <StyledTitle>{title}</StyledTitle>}
                {content && <StyledContent>{content}</StyledContent>}
                {children}
              </ModalContent>
            </StyledModal>
          </RemoveScroll>
        </FocusTrap>
      </StyledBackground>
    </Portal>
  );
};

export default Modal;

const StyledBackground = styled.div<{ visible?: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  background-color: rgb(0 0 0 / 30%);
  width: 100%;
  height: 100%;
`;

const StyledModal = styled.div<{ width?: number }>`
  position: relative;
  z-index: 101;
  border-radius: 22.94px;
  background: ${colors.black80};
  width: ${({ width }) => width ?? 450}px;
  color: ${colors.gray10};
`;

const StyledCloseButton = styled.button`
  display: flex;
  position: absolute;
  top: 22px;
  right: 22px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;

  @media ${MOBILE_MEDIA_QUERY} {
    top: 60px;
    right: 40px;
  }
`;

const StyledIconClose = styled(IconModalClose)``;

const StyledIconCheck = styled(IconModalCheck)`
  margin-bottom: 18px;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 80px;
  }
`;

const StyledTitle = styled.h1`
  ${textStyles.SUIT_24_B}
`;

const StyledContent = styled.div`
  margin-top: 18px;
  color: ${colors.gray40};

  ${textStyles.SUIT_18_M};
`;
