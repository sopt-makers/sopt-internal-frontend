import styled from '@emotion/styled';
import { AnimatePresence, m } from 'framer-motion';
import { ReactNode } from 'react';

import CarouselBody from '@/components/common/Carousel/Body';
import useCarousel, { CarouselDirection } from '@/components/common/Carousel/useCarousel';
import LeftArrowIcon from '@/public/icons/icon-arrow-purple.svg';
import { colors } from '@/styles/colors';

interface CarouselProps {
  itemList: ReactNode[];
  limit: number;
  className?: string;
  renderItemContainer: (children: ReactNode) => ReactNode;
}

export default function Carousel({ itemList, limit, className, renderItemContainer }: CarouselProps) {
  const { page, direction, moveNext, movePrevious, currentItemList, totalPageSize, move } = useCarousel({
    limit,
    itemList,
  });

  return (
    <Container className={className}>
      <AnimatePresence initial={false} custom={direction}>
        <StyledMotionDiv
          key={page}
          custom={direction}
          variants={variants}
          initial='enter'
          animate='center'
          exit='exit'
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          <CarouselBody currentItemList={currentItemList} renderContainer={renderItemContainer} />
        </StyledMotionDiv>
      </AnimatePresence>
      <LeftControl onClick={movePrevious} isActive={page - 1 >= 1}>
        <LeftArrowIcon />
      </LeftControl>
      <RightControl onClick={moveNext} isActive={page + 1 <= totalPageSize}>
        <RightArrowIcon />
      </RightControl>
      <Indicators>
        {Array(totalPageSize)
          .fill(null)
          .map((_, index) => (
            <Indicator onClick={() => move(index + 1)} isActive={index + 1 === page} key={`${index}`} />
          ))}
      </Indicators>
    </Container>
  );
}

const variants = {
  enter: (direction: CarouselDirection) => {
    return {
      x: direction === 'next' ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: CarouselDirection) => {
    return {
      zIndex: 0,
      x: direction === 'previous' ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Container = styled.div`
  display: grid;
  grid:
    [row1-start] 'left-control list right-control' max-content [row1-end]
    [row2-start] 'indicators indicators indicators' max-content [row2-end]
    / min-content auto min-content;
  column-gap: 16px;
  width: 100%;
  row-gap: 24px;
  overflow: hidden;
`;

const Control = styled.button<{ isActive: boolean }>`
  align-self: center;
  border-radius: 50%;
  background-color: ${colors.purpledim100};
  cursor: ${({ isActive }) => (isActive ? 'pointer' : 'default')};
  width: 40px;
  height: 40px;
`;

const LeftControl = styled(Control)`
  grid-area: left-control;
  padding: 11px 17px 11px 14px;
`;

const RightControl = styled(Control)`
  grid-area: right-control;
  padding: 11px 14px 11px 17px;
`;

const RightArrowIcon = styled(LeftArrowIcon)`
  transform: rotate(180deg);
`;

const Indicators = styled.div`
  display: flex;
  grid-area: indicators;
  gap: 12px;
  justify-self: center;
`;

const Indicator = styled.div<{ isActive?: boolean }>`
  border-radius: 50%;
  background-color: ${({ isActive }) => (isActive ? colors.purple100 : colors.black40)};
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  width: 8px;
  height: 8px;
`;

const StyledMotionDiv = styled(m.div)`
  grid-area: list;
`;
