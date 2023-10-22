import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { m, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FC, MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ValueCardProps {
  content: ReactNode;
  shineColor: string;
}

const ValueCard: FC<ValueCardProps> = ({ content, shineColor }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardSize, setCardSize] = useState({ height: 0, width: 0 });
  const [mouseEntered, setMouseEntered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const shineX = useTransform(mouseX, (v) => v - 300);
  const shineY = useTransform(mouseY, (v) => v - 300);

  const xRotation = useSpring(
    useTransform(useTransform(mouseX, [0, cardSize.width], [1, -1]), (v) => (mouseEntered ? v : 0)),
    {
      bounce: 0,
      duration: 100,
      stiffness: 50,
    },
  );
  const rotateY = useMotionTemplate`${xRotation}deg`;

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) {
      return;
    }

    const rect = containerRef.current.getClientRects()[0];

    mouseX.set(e.clientX - rect.x);
    mouseY.set(e.clientY - rect.y);

    setMouseEntered(true);
  }

  function handleMouseLeave() {
    setMouseEntered(false);
  }

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        setCardSize({
          height: entry.contentRect.height,
          width: entry.contentRect.width,
        });
      }
    });
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Container ref={containerRef}>
      <Card
        animate={{
          z: mouseEntered ? (Math.sin((1 * Math.PI) / 180) * cardSize.width) / 2 : 0,
          transition: {
            type: 'spring',
            bounce: 0,
            duration: 2,
            stiffness: 50,
          },
        }}
        style={{ rotateY, transformPerspective: '1000px' } as never} // 잘못된 stylelint 오류 무시
        hoverColor={shineColor}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ShineLayer>
          <Shine animate={{ opacity: mouseEntered ? 0.3 : 0 }} style={{ x: shineX, y: shineY }} color={shineColor} />
        </ShineLayer>
        <ContentLayer>{content}</ContentLayer>
      </Card>
    </Container>
  );
};

export default ValueCard;

const Container = styled.div`
  transform: translateZ(0);
  background-color: ${colors.gray900};
`;

const Card = styled(m.div, {
  shouldForwardProp(propName) {
    return propName !== 'hoverColor';
  },
})<{ hoverColor: string }>`
  backface-visibility: hidden;
  perspective: 1000;
  transform: translateZ(0);
  transition: border 0.3s;
  outline: 1px solid transparent;
  border: 1px solid ${colors.gray400};
  border-radius: 20px;
  overflow: hidden;
  will-change: transform;

  &:hover {
    border: 1px solid ${(props) => props.hoverColor};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
  }
`;

const ShineLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
`;

const ContentLayer = styled.div`
  position: static;
  inset: 0;
`;

const Shine = styled(m.div)<{ color: string }>`
  border-radius: 300px;
  mix-blend-mode: soft-light;
  background-color: ${(props) => props.color};
  width: 600px;
  height: 600px;
  will-change: transform;
  filter: blur(180px);
`;
