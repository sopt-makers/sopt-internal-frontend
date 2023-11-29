import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { Flex, Stack } from '@toss/emotion-utils';
import { m } from 'framer-motion';
import Link from 'next/link';
import { forwardRef, PropsWithChildren, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

import Checkbox from '@/components/common/Checkbox';
import HorizontalScroller from '@/components/common/HorizontalScroller';
import Loading from '@/components/common/Loading';
import ScrollContainer from '@/components/common/ScrollContainer';
import Text from '@/components/common/Text';
import useBlindWriterPromise from '@/components/feed/common/hooks/useBlindWriterPromise';
import {
  IconChevronLeft,
  IconChevronRight,
  IconMember,
  IconMoreHoriz,
  IconMoreVert,
  IconSendFill,
  IconShare,
} from '@/components/feed/common/Icon';
import { getRelativeTime } from '@/components/feed/common/utils';
import FeedImageSlider from '@/components/feed/detail/slider/FeedImageSlider';
import { playgroundLink } from '@/constants/links';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { SwitchCase } from '@/utils/components/switch-case/SwitchCase';
import { parseTextToLink } from '@/utils/parseTextToLink';

const Base = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledBase direction='column'>{children}</StyledBase>;
};

const StyledBase = styled(Flex)`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
`;

interface HeaderProps {
  categoryId: string;
  category: string;
  tag: string;
  left?: ReactNode;
  right?: ReactNode;
  renderCategoryLink?: (props: { children: ReactNode; categoryId: string }) => ReactNode;
  hasChildren?: boolean;
}

const Header = ({
  categoryId,
  category,
  tag,
  left,
  right,
  renderCategoryLink = (props) => props.children,
  hasChildren,
}: HeaderProps) => {
  return (
    <StyledHeader align='center' justify='space-between' as='header'>
      <Flex.Center css={{ gap: 8 }}>
        {left}

        {renderCategoryLink({
          children: (
            <Chip align='center' as='div'>
              <Text typography='SUIT_13_M'>{category}</Text>
              {hasChildren && (
                <>
                  <IconChevronRight />
                  <Text typography='SUIT_13_M'>{tag}</Text>
                </>
              )}
            </Chip>
          ),
          categoryId,
        })}
      </Flex.Center>
      {right ? <Flex.Center css={{ gap: 8 }}>{right}</Flex.Center> : null}
    </StyledHeader>
  );
};

const StyledHeader = styled(Flex)`
  border-top: 1px solid ${colors.gray800};
  padding: 15px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 10px 16px;
  }
`;

const Chip = styled(Flex)`
  transition: background-color 0.2s ease-in-out;
  border-radius: 21px;
  background-color: ${colors.gray800};
  padding: 7px 12px;
  color: ${colors.gray10};

  :hover {
    background-color: ${colors.gray700};
  }
`;

interface BodyProps {
  className?: string;
}

const Body = forwardRef<HTMLDivElement, PropsWithChildren<BodyProps>>(({ className, children }, ref) => {
  return (
    <StyledBody ref={ref} className={className}>
      <Flex direction='column' css={{ position: 'absolute', inset: 0 }}>
        {children}
      </Flex>
    </StyledBody>
  );
});

const StyledBody = styled(ScrollContainer)`
  position: relative;
  flex: 1;
  padding: 16px 24px;
  overflow: auto;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

const Main = ({ children }: PropsWithChildren<unknown>) => {
  return <StyledMain direction='column'>{children}</StyledMain>;
};

const StyledMain = styled(Flex)`
  gap: 16px;
  padding: 16px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 16px;
  }
`;

type TopProps = { createdAt: string } & (
  | {
      isBlindWriter: true;
      profileImage?: null;
      name?: null;
      info?: null;
      memberId: number | null;
    }
  | {
      isBlindWriter: false;
      profileImage: string | null;
      name: string;
      info: string;
      memberId: number | null;
    }
);

const Top = ({ isBlindWriter, profileImage, name, info, memberId, createdAt }: TopProps) => {
  return (
    <Flex justify='space-between'>
      <Flex css={{ gap: 8 }}>
        {isBlindWriter || profileImage == null || memberId == null ? (
          <IconMember size={40} />
        ) : (
          <Link href={playgroundLink.memberDetail(memberId)}>
            <ProfileImage width={40} height={40} src={profileImage} alt='profileImage' />
          </Link>
        )}
        <Stack.Vertical gutter={4} justify='center'>
          {isBlindWriter || memberId == null ? (
            <Name color={colors.gray10}>익명</Name>
          ) : (
            <Link href={playgroundLink.memberDetail(memberId)}>
              <Name color={colors.gray10}>{name}</Name>
            </Link>
          )}
          {!isBlindWriter && memberId !== null && (
            <Link href={playgroundLink.memberDetail(memberId)}>
              <Text typography='SUIT_13_R' color={colors.gray100}>
                {info}
              </Text>
            </Link>
          )}
        </Stack.Vertical>
      </Flex>
      <Flex align='center'>
        <RelativeTimeText typography='SUIT_14_R' color={colors.gray300}>
          {getRelativeTime(createdAt)}
        </RelativeTimeText>
      </Flex>
    </Flex>
  );
};

const ProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  object-fit: cover;
`;

const Name = styled(Text)`
  ${textStyles.SUIT_15_SB};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_14_SB};
  }
`;

const RelativeTimeText = styled(Text)`
  ${textStyles.SUIT_14_R};

  @media ${MOBILE_MEDIA_QUERY} {
    ${textStyles.SUIT_13_R};
  }
`;

interface ContentProps {
  isQuestion?: boolean;
  title: string;
  content: string;
  hits: number;
  commentLength: number;
  images: string[];
}

const Content = ({ isQuestion = false, title, content, hits, commentLength, images }: ContentProps) => {
  const [openSlider, setOpenSlider] = useState(false);

  return (
    <>
      <Stack gutter={8}>
        {title && (
          <Text typography='SUIT_20_SB' lineHeight={26}>
            {isQuestion && <QuestionBadge>질문</QuestionBadge>}
            {title}
          </Text>
        )}
        <StyledContent>{parseTextToLink(content)}</StyledContent>
      </Stack>
      {images.length !== 0 ? (
        <HorizontalScroller
          css={{
            marginRight: -24,
            marginLeft: -24,
          }}
        >
          <ImageScrollContainer>
            {images.map((image, index) => (
              <ImageItem key={index} src={image} alt='image' onClick={() => setOpenSlider(true)} />
            ))}
          </ImageScrollContainer>
        </HorizontalScroller>
      ) : null}
      <Text
        typography='SUIT_14_R'
        lineHeight={20}
        color={colors.gray300}
      >{`댓글 ${commentLength}개 ∙ ${hits}명 읽음`}</Text>
      <FeedImageSlider opened={openSlider} images={images} onClose={() => setOpenSlider(false)} />
    </>
  );
};

const ImageScrollContainer = styled(Flex)`
  gap: 8px;
  padding-right: 24px;
  padding-left: 24px;
`;

const StyledContent = styled(Text)`
  line-height: 26px;
  white-space: pre-wrap;
  color: ${colors.gray10};
  ${textStyles.SUIT_16_L};

  a {
    text-decoration: underline;
  }
`;

const QuestionBadge = styled.div`
  display: inline-flex;
  align-self: flex-start;
  transform: translateY(-2.4px);
  margin-right: 4px;
  border-radius: 5px;
  background-color: ${colors.orangeAlpha200};
  padding: 4px 6px;
  line-height: 18px;
  white-space: nowrap;
  color: ${colors.secondary};
  ${textStyles.SUIT_14_SB};
`;

const ImageItem = styled.img`
  flex: 0;
  border: 1px solid rgb(255 255 255 / 10%);
  border-radius: 12px;
  cursor: pointer;
  height: 240px;
  object-fit: cover;
`;

const Divider = styled.hr`
  flex-shrink: 0;
  margin: 0;
  border: none;
  background-color: ${colors.gray800};
  height: 1px;
`;

type CommentProps = {
  comment: string;
  createdAt: string;
  moreIcon?: ReactNode;
} & (
  | {
      isBlindWriter: false;
      profileImage: string | null;
      info: string;
      name: string;
      memberId?: number;
    }
  | {
      isBlindWriter: true;
      profileImage?: null;
      info?: null;
      name?: null;
      memberId?: number;
    }
);

const Comment = ({
  profileImage,
  name,
  info,
  comment,
  isBlindWriter,
  createdAt,
  moreIcon,
  memberId = 0,
}: CommentProps) => {
  return (
    <StyledComment>
      <Flex css={{ gap: 8, minWidth: 0 }}>
        {isBlindWriter || profileImage == null ? (
          <div css={{ flexShrink: 0 }}>
            <IconMember />
          </div>
        ) : (
          <Link href={playgroundLink.memberDetail(memberId)}>
            <CommentProfileImage width={32} height={32} src={profileImage} alt='profileImage' />
          </Link>
        )}
        <Stack css={{ minWidth: 0, width: '100%' }} gutter={2}>
          <Flex justify='space-between'>
            <Stack.Horizontal gutter={2}>
              {!isBlindWriter ? (
                <Link href={playgroundLink.memberDetail(memberId)}>
                  <Text typography='SUIT_13_SB' color={colors.gray10} css={{ whiteSpace: 'nowrap' }}>
                    {name}
                  </Text>
                </Link>
              ) : (
                <Text typography='SUIT_13_SB' color={colors.gray10} css={{ whiteSpace: 'nowrap' }}>
                  익명
                </Text>
              )}
              {!isBlindWriter && (
                <Link href={playgroundLink.memberDetail(memberId)}>
                  <InfoText typography='SUIT_13_R' color={colors.gray100}>
                    {`∙ ${info}`}
                  </InfoText>
                </Link>
              )}
            </Stack.Horizontal>
            <Flex>
              <Text typography='SUIT_13_R' color={colors.gray400} css={{ whiteSpace: 'nowrap' }}>
                {getRelativeTime(createdAt)}
              </Text>
              {moreIcon}
            </Flex>
          </Flex>
          <StyledText typography='SUIT_14_R' lineHeight={22}>
            {parseTextToLink(comment)}
          </StyledText>
        </Stack>
      </Flex>
    </StyledComment>
  );
};

const StyledComment = styled.div`
  padding: 16px 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 14px 16px;
  }
`;

const StyledText = styled(Text)`
  a {
    overflow: hidden;
    text-decoration: underline;
    word-wrap: break-word;
  }
`;

const CommentProfileImage = styled.img`
  flex-shrink: 0;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  object-fit: cover;
`;

const InfoText = styled(Text)`
  white-space: nowrap;

  @media ${'screen and (max-width: 460px)'} {
    max-width: 178px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
  }
`;

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  isBlindChecked: boolean;
  onChangeIsBlindChecked: (checked: boolean) => void;
  isPending?: boolean;
}

const Input = ({ value, onChange, isBlindChecked, onChangeIsBlindChecked, isPending }: InputProps) => {
  const [isFocus, setIsFocus] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { handleShowBlindWriterPromise } = useBlindWriterPromise();

  const is버튼액티브 = isFocus && value.length > 0 && !isPending;

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsFocus(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleCheckBlindWriter = (isBlindWriter: boolean) => {
    isBlindWriter && handleShowBlindWriterPromise();
    onChangeIsBlindChecked(isBlindWriter);
  };

  const showInputAnimateArea = useMemo(() => isFocus || isBlindChecked, [isFocus, isBlindChecked]);

  return (
    <Container ref={containerRef} showInputAnimateArea={showInputAnimateArea}>
      <InputAnimateArea
        initial={{ height: 0 }}
        animate={{ height: isFocus || isBlindChecked ? '28px' : 0 }}
        transition={{ bounce: 0, stiffness: 1000, duration: 0.2 }}
      >
        <InputContent>
          <Checkbox size='small' checked={isBlindChecked} onChange={(e) => handleCheckBlindWriter(e.target.checked)} />
          <Text typography='SUIT_12_M'>익명으로 남기기</Text>
        </InputContent>
      </InputAnimateArea>
      <Flex align='flex-end'>
        <StyledTextArea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocus(true)}
          placeholder='댓글을 남겨주세요.'
        />
        <SendButton
          type='submit'
          initial={{
            backgroundColor: colors.gray800,
          }}
          animate={{
            backgroundColor: is버튼액티브 ? colors.success : colors.gray800,
          }}
          disabled={!is버튼액티브 || isPending}
        >
          {isPending ? <Loading size={4} /> : <IconSendFill />}
        </SendButton>
      </Flex>
    </Container>
  );
};

const Container = styled.div<{ showInputAnimateArea: boolean }>`
  --card-max-width: 560px;

  position: fixed;
  bottom: 0;
  border-top: 1px solid ${colors.gray800};
  border-right: 1px solid ${colors.gray800};
  background-color: ${colors.gray950};
  padding: 12px 16px;
  width: 100%;
  max-width: var(--card-max-width);
  ${({ showInputAnimateArea }) => showInputAnimateArea && `border-radius: 10px;`};

  @media ${MOBILE_MEDIA_QUERY} {
    border-right: none;
    padding: 10px 16px;
    max-width: 100%;
    ${({ showInputAnimateArea }) => showInputAnimateArea && `padding-top: 12px;`};
  }
`;

const InputAnimateArea = styled(m.div)`
  position: relative;
  overflow: hidden;
`;

const InputContent = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  gap: 4px;
  align-items: center;
`;

const StyledTextArea = styled(TextareaAutosize)`
  flex: 1;
  border: none;
  border-width: 0;
  background-color: ${colors.background};
  padding-bottom: 7px;
  max-height: 180px;
  resize: none;
  line-height: 22px;
  line-height: 26px;
  white-space: pre-wrap;
  word-break: break-word;
  overflow-wrap: break-word;

  ${textStyles.SUIT_16_M};

  :focus {
    outline: none;
  }

  ::placeholder {
    color: ${colors.gray500};
  }
`;

const SendButton = styled(m.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  width: 36px;
  height: 36px;
`;

const Icon = ({ name }: { name: 'share' | 'chevronLeft' | 'moreVertical' | 'moreHorizontal' }) => {
  return (
    <SwitchCase
      value={name}
      caseBy={{
        share: <IconShare />,
        chevronLeft: <IconChevronLeft />,
        moreVertical: <IconMoreVert />,
        moreHorizontal: (
          <IconMoreHoriz
            color={colors.gray400}
            size={16}
            css={css`
              &:hover {
                transition: 0.2s;
                color: ${colors.gray30};
              }
            `}
          />
        ),
      }}
      default={null}
    />
  );
};

const DetailFeedCard = Object.assign(Base, {
  Header,
  Body,
  Main,
  Top,
  Content,
  Divider,
  Comment,
  Input,
  Icon,
});

export default DetailFeedCard;
