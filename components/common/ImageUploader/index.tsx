import styled from '@emotion/styled';
import axios from 'axios';
import { FC, useRef, useState } from 'react';

import { getPresignedUrl } from '@/api/image';
import IconImage from '@/public/icons/icon-image.svg';
import { colors } from '@/styles/colors';

interface ImageUploaderProps {
  width?: number | string;
  height?: number | string;
  value?: string | null;
  onChange: (value: string | null) => void;
  className?: string;
  emptyIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  width = 104,
  height = 104,
  onChange,
  value,
  className,
  emptyIcon: EmptyIcon = IconImage,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleClick = () => {
    const inputEl = inputRef.current;
    if (!inputEl) return;
    inputEl.value = '';
    inputEl.onchange = async () => {
      const files = inputEl.files;
      if (files == null || files.length === 0) return;
      const file = files[0];
      try {
        const { filename, signedUrl } = await getPresignedUrl({ filename: file.name });
        if (!signedUrl) {
          throw new Error('presigned-url을 받아오는데 실패하였습니다.');
        }

        await axios.request({
          method: 'PUT',
          url: signedUrl,
          headers: { 'Content-Type': file.type },
          data: file,
        });

        const s3Url = `https://s3.ap-northeast-2.amazonaws.com/sopt-makers-internal/${filename}`;
        setPreviewImage(s3Url);
        onChange(s3Url);
      } catch (error) {
        console.error(error);
      }
    };
    inputEl.click();
  };

  return (
    <Container className={className} width={width} height={height} onClick={handleClick}>
      <StyledInput type='file' accept='image/*' ref={inputRef} />
      {value ? <StyledPreview src={previewImage} alt='preview-image' /> : <EmptyIcon />}
    </Container>
  );
};

export default ImageUploader;

const Container = styled.div<Pick<ImageUploaderProps, 'width' | 'height'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background-color: ${colors.black60};
  cursor: pointer;
  width: ${({ width }) => (typeof width === 'string' ? width : `${width}px`)};
  height: ${({ height }) => (typeof height === 'string' ? height : `${height}px`)};
`;

const StyledInput = styled.input`
  display: none;
`;

const StyledPreview = styled.img`
  border-radius: 6px;
  width: inherit;
  height: inherit;
  object-fit: cover;
`;
