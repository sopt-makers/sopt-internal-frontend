import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

interface ContentsCardProps {
  thumbnail: string;
  title: string;
  top: string;
  bottom: string;
}

export default function ContentsCard({ thumbnail, title, top, bottom }: ContentsCardProps) {
  return (
    <Card>
      <Thumbnail src={thumbnail} alt={`${title} 이미지`} />
      <Contents>
        <Description>{top}</Description>
        <Title>{title}</Title>
        <Description>{bottom}</Description>
      </Contents>
    </Card>
  );
}

const Card = styled.article`
  display: center;
  gap: 16px;
  align-items: center;
  border-radius: 20px;
  background: ${colors.gray900};
  padding: 16px;
  width: 100%;
  height: 116px;
`;

const Thumbnail = styled.img`
  border-radius: 14px;
  width: 84px;
  height: 84px;
  object-fit: cover;
`;

const Description = styled.p`
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.gray200};

  ${fonts.LABEL_14_SB};
`;

const Title = styled.h1`
  max-width: 227px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
  color: ${colors.white};

  ${fonts.HEADING_18_B};
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
