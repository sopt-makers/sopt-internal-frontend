import { Slot } from '@radix-ui/react-slot';
import { FC, ReactNode, startTransition, useContext, useEffect, useState } from 'react';

import { ResponsiveContext } from '@/components/common/Responsive/context';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';

interface ResponsiveProps {
  className?: string;
  children: ReactNode;
  only: AvailableSize;
  forceMount?: boolean;
  asChild?: boolean;
}

type AvailableSize = 'mobile' | 'desktop';

const Responsive: FC<ResponsiveProps> = ({ className = '', children, only, asChild, forceMount = false }) => {
  const Comp = asChild ? Slot : 'div';

  const { mobileOnlyClassName, desktopOnlyClassName } = useContext(ResponsiveContext);

  const selectedClassName = (() => {
    if (only === 'desktop') {
      return desktopOnlyClassName;
    } else if (only === 'mobile') {
      return mobileOnlyClassName;
    }
  })();

  const [current, setCurrent] = useState<AvailableSize | null>(null);
  useEffect(() => {
    if (forceMount) {
      return;
    }

    const mobileMedia = window.matchMedia(MOBILE_MEDIA_QUERY);

    const handleChange = (e: MediaQueryListEvent) => {
      setCurrent(e.matches ? 'mobile' : 'desktop');
    };

    mobileMedia.addEventListener('change', handleChange);

    // 초기 렌더링후 비활성 컴포넌트 언마운트는 천천히 해도 되므로 startTransition 으로 렌더링 우선순위 낮추기
    startTransition(() => {
      if (mobileMedia.matches) {
        setCurrent('mobile');
      } else {
        setCurrent('desktop');
      }
    });

    return () => mobileMedia.removeEventListener('change', handleChange);
  }, [forceMount]);

  return forceMount || current === null || only === current ? (
    <Comp className={`${selectedClassName} ${className}`}>{children}</Comp>
  ) : (
    <></>
  );
};

export default Responsive;
