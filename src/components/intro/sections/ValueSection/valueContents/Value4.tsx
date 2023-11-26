import styled from '@emotion/styled';
import { FC } from 'react';

import ValueBase from '@/components/intro/sections/ValueSection/valueContents/ValueBase';

import image from './value4.png';

const Value4Content: FC = () => {
  return (
    <ValueBase
      reverse
      image={<Image src={image.src} alt='' />}
      message={
        <>
          <ValueBase.Highlight>커리어와 성장에 대한 고민</ValueBase.Highlight>을 들어줄 OB 멘토들이 기다리고 있어요
        </>
      }
    />
  );
};

export default Value4Content;

const Image = styled.img`
  object-fit: contain;
  height: 100%;
`;
