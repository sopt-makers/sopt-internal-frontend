import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { FC, useEffect, useRef, useState } from 'react';

import ErrorMessage from '@/components/common/Input/ErrorMessage';
import useImageUploader from '@/hooks/useImageUploader';
import IconCancel from '@/public/icons/icon-cancel.svg';
import IconImage from '@/public/icons/icon-image.svg';
import IconPencil from '@/public/icons/icon-pencil.svg';
import { textStyles } from '@/styles/typography';

const DEFAULT_IMAGE_URL = '';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  errorMessage?: string;
  src?: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
  errorMessage,
  src,
}) => {
  const selectorRef = useRef<HTMLDivElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>();
  const [isOpenSelector, setIsOpenSelector] = useState(false);

  const handleChangeImageInput = (s3Url: string[]) => {
    setPreviewImage(s3Url[0]);
    onChange?.(s3Url[0]);
  };
  const { imageInputRef, handleClickImageInput } = useImageUploader({ onSuccess: handleChangeImageInput });

  const previewImageSrc = value || previewImage || src;

  const handleRemove = () => {
    setPreviewImage(undefined);
    onChange?.(DEFAULT_IMAGE_URL);
  };

  const handleClick = () => {
    if (previewImage?.length) {
      openSelector();
    } else {
      handleClickImageInput();
    }
  };

  const openSelector = () => setIsOpenSelector(true);
  const closeSelector = () => setIsOpenSelector(false);

  useEffect(() => {
    closeSelector();
  }, [previewImage]);

  useEffect(() => {
    const handleClickSelectorOutside = (e: MouseEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(e.target as Node)) {
        closeSelector();
      }
    };
    if (isOpenSelector) {
      document.addEventListener('mousedown', handleClickSelectorOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickSelectorOutside);
    };
  }, [selectorRef, isOpenSelector]);

  return (
    <StyledWrapper>
      <Container
        className={className}
        width={width}
        height={height}
        onClick={handleClick}
        error={Boolean(errorMessage)}
      >
        <StyledInput type='file' accept='image/*' ref={imageInputRef} />
        {previewImageSrc ? <StyledPreview src={previewImageSrc} alt='preview-image' /> : <EmptyIcon />}
        <StyledSelectorControlButton type='button'>
          <IconPencil />
        </StyledSelectorControlButton>
        <StyledSelector ref={selectorRef} isOpen={isOpenSelector}>
          <StyledEditButton type='button' onClick={handleClickImageInput}>
            <IconPencil />
            <div>수정</div>
          </StyledEditButton>
          <StyledRemoveButton type='button' onClick={handleRemove}>
            <IconCancel />
            <div>삭제</div>
          </StyledRemoveButton>
        </StyledSelector>
      </Container>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </StyledWrapper>
  );
};

export default ImageUploader;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height'> & { error: boolean }>`
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.gray700};
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) => (typeof height === 'string' ? height : `${height}px`)};

  ${({ error }) =>
    error &&
    css`
      border: 1px solid ${colors.error};
    `}
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: 26px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

const StyledSelectorControlButton = styled.button`
  display: flex;
  position: absolute;
  right: 12px;
  bottom: 12px;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.gray600};
  cursor: pointer;
  width: 22px;
  height: 22px;
`;

const StyledSelector = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  position: absolute;
  right: -40px;
  bottom: 35px;
`;

const editButtonStyle = css`
  display: flex;
  gap: 4px;
  background-color: ${colors.gray600};
  padding: 10px 12px;
  line-height: 100%;
  letter-spacing: -0.01em;

  ${textStyles.SUIT_12_M};
`;

const StyledEditButton = styled.button`
  position: relative;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  cursor: pointer;
  line-height: 0;

  ${editButtonStyle}

  &::after {
    position: absolute;
    top: 10px;
    right: 0;
    background-color: ${colors.gray400};
    width: 1px;
    height: 14px;
    content: '';
  }
`;

const StyledRemoveButton = styled.button`
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  cursor: pointer;

  ${editButtonStyle}
`;
