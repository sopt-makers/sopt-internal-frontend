import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { ReactNode, startTransition, useEffect, useState } from 'react';

import Carousel from '@/components/common/Carousel';
import Responsive from '@/components/common/Responsive';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';
import { getScreenMaxWidthMediaQuery } from '@/utils';

import { Button } from '@sopt-makers/ui';
import { Flex } from '@toss/emotion-utils';
import { useGetMembersCoffeeChat } from '@/api/endpoint/members/getMembersCoffeeChat';
import CoffeeChatCard from '@/components/coffeechat/CoffeeChatCard';

type ListType = 'carousel-large' | 'carousel-small' | 'scroll' | undefined;

const SCREEN_SIZE = {
  desktopLarge: { size: 1542, className: 'large-desktop-only' },
  desktopSmall: { size: 1200, className: 'small-desktop-only' },
  tablet: { size: 768, className: 'tablet-only' },
  mobile: { size: 375, className: 'mobile-only' },
};

const DESKTOP_LARGE_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopLarge.size}px`);
const DESKTOP_SMALL_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.desktopSmall.size}px`);
const TABLET_MEDIA_QUERY = getScreenMaxWidthMediaQuery(`${SCREEN_SIZE.tablet.size}px`);

export default function CoffeeChatList() {
  const [listType, setListType] = useState<ListType>();

  const { data } = useGetMembersCoffeeChat();
  console.log('data', data);

  const coffeeChatCardList = (data?.coffeeChatList ?? []).map((item) => (
    <CoffeeChatCard
      name={item.name ?? ''}
      profileImage={item.memberProfileImage ?? ''}
      organization={item.organization ?? ''}
      skills={item.careerTitle ?? ''}
      title={item.coffeeChatBio ?? ''}
    />
  ));

  useEffect(() => {
    const desktopLargeMedia = window.matchMedia(DESKTOP_LARGE_MEDIA_QUERY);
    const desktopSmallMedia = window.matchMedia(DESKTOP_SMALL_MEDIA_QUERY);

    const handleChangeDesktopLargeMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'carousel-small' : 'carousel-large');
    };
    const handleChangeDesktopSmallMedia = (e: MediaQueryListEvent) => {
      setListType(e.matches ? 'scroll' : 'carousel-small');
    };

    desktopLargeMedia.addEventListener('change', handleChangeDesktopLargeMedia);
    desktopSmallMedia.addEventListener('change', handleChangeDesktopSmallMedia);

    startTransition(() => {
      if (desktopSmallMedia.matches) {
        setListType('scroll');
      } else if (desktopLargeMedia.matches) {
        setListType('carousel-small');
      } else {
        setListType('carousel-large');
      }
    });

    return () => {
      desktopLargeMedia.removeEventListener('change', handleChangeDesktopLargeMedia);
      desktopSmallMedia.removeEventListener('change', handleChangeDesktopSmallMedia);
    };
  }, []);

  return (
    <Container>
      <Responsive only='desktop'>
        <Header>
          <Title>아래의 커피챗 멘토님들이 여러분을 기다리고 있어요</Title>
          <Flex style={{ gap: 8 }}>
            <Button size='md' theme='black'>
              커피챗 이용 가이드
            </Button>
            <Button size='md' theme='white' style={{ color: colors.black }}>
              커피챗 오픈하기
            </Button>
          </Flex>
        </Header>
      </Responsive>
      <Responsive only='mobile'>
        <Header>
          <Title>{'아래의 커피챗 멘토님들이\n여러분을 기다리고 있어요'}</Title>
          <Flex style={{ gap: 8 }}>
            <Button size='md' theme='black'>
              커피챗 이용 가이드
            </Button>
            <Button size='md' theme='white' style={{ color: colors.black }}>
              커피챗 오픈하기
            </Button>
          </Flex>
        </Header>
      </Responsive>
      {(listType === undefined || listType === 'carousel-large') && (
        <StyledCarousel
          itemList={coffeeChatCardList}
          limit={3}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopLarge.className}
        />
      )}
      {(listType === undefined || listType === 'carousel-small') && (
        <StyledCarousel
          itemList={coffeeChatCardList}
          limit={2}
          renderItemContainer={(children: ReactNode) => <CardContainer>{children}</CardContainer>}
          className={SCREEN_SIZE.desktopSmall.className}
        />
      )}
      {(listType === undefined || listType === 'scroll') && (
        <CoffeeChatScrollWrapper className={SCREEN_SIZE.tablet.className}>
          <CoffeeChatScrollList>{coffeeChatCardList}</CoffeeChatScrollList>
        </CoffeeChatScrollWrapper>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  .${SCREEN_SIZE.desktopSmall.className} {
    display: none;
  }

  .${SCREEN_SIZE.tablet.className} {
    display: none;
  }

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    .${SCREEN_SIZE.desktopLarge.className} {
      display: none;
    }

    .${SCREEN_SIZE.desktopSmall.className} {
      display: grid;
    }

    .${SCREEN_SIZE.tablet.className} {
      display: none;
    }
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    gap: 32px;
    margin-top: 104px;

    .${SCREEN_SIZE.desktopLarge.className} {
      display: none;
    }

    .${SCREEN_SIZE.desktopSmall.className} {
      display: none;
    }

    .${SCREEN_SIZE.tablet.className} {
      display: flex;
    }
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 24px;
    margin-top: 24px;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 0;
    align-items: flex-start;
    justify-content: flex-start;
    margin-top: 32px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1302px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 969px;
  }

  @media ${DESKTOP_SMALL_MEDIA_QUERY} {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
    width: 636px;
  }

  @media ${TABLET_MEDIA_QUERY} {
    gap: 12px;
    padding: 0 20px;
    width: 100%;
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 10px;
  }
`;

const Title = styled.div`
  text-align: start;
  line-height: 100%;
  color: ${colors.white};

  /* Heading/24_B */
  font-size: 24px;
  font-weight: 700;
  line-height: 36px; /* 150% */
  letter-spacing: -0.48px;

  @media ${MOBILE_MEDIA_QUERY} {
    white-space: pre-wrap;

    /* Heading/18_B */
    font-size: 18px;
    line-height: 28px; /* 155.556% */
    letter-spacing: -0.36px;
  }
`;

const StyledCarousel = styled(Carousel)`
  width: 1414px;

  @media ${DESKTOP_LARGE_MEDIA_QUERY} {
    width: 975px;
  }
`;

const CoffeeChatScrollWrapper = styled.div`
  width: 636px;

  @media ${TABLET_MEDIA_QUERY} {
    width: 100%;
    padding: 0 20px;
  }
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 24px;
`;

const CoffeeChatScrollList = styled.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media ${TABLET_MEDIA_QUERY} {
    & > .card:first-child {
      margin-left: 20px;
    }

    & > .card:last-child {
      margin-right: 20px;
    }
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 12px;
    margin-top: 16px;
    overflow-y: hidden;
  }
`;
