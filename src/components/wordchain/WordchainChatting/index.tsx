import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { useQueryClient } from '@tanstack/react-query';
import PaperAirplaneIcon from 'public/icons/icon-paper-airplane.svg';
import { FormEvent, useEffect, useRef, useState } from 'react';

import {
  useGetActiveWordchain,
  useGetFinishedWordchainList,
  wordChainQueryKey,
} from '@/api/endpoint/wordchain/getWordchain';
import { usePostWord } from '@/api/endpoint/wordchain/postWord';
import Loading from '@/components/common/Loading';
import Responsive from '@/components/common/Responsive';
import useEventLogger from '@/components/eventLogger/hooks/useEventLogger';
import Wordchain from '@/components/wordchain/WordchainChatting/Wordchain';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { MOBILE_MEDIA_QUERY } from '@/styles/mediaQuery';
import { textStyles } from '@/styles/typography';

const LIMIT = 10;

interface WordchainChattingProps {
  className?: string;
}
export default function WordchainChatting({ className }: WordchainChattingProps) {
  const { logSubmitEvent } = useEventLogger();
  const [scrollHeight, setScrollHeight] = useState<number | undefined>();
  const wordchainListRef = useRef<HTMLDivElement>(null);
  const { data: finishedWordchainListPages, fetchNextPage } = useGetFinishedWordchainList({
    limit: LIMIT,
    queryOptions: {
      onSuccess: (data) => {
        setTimeout(() => {
          if (data.pageParams.length === 1) {
            wordchainListRef.current && setScrollHeight(wordchainListRef.current.scrollHeight);
          } else {
            if (!(wordchainListRef.current && scrollHeight)) {
              return;
            }
            scrollTo(wordchainListRef.current.scrollHeight - scrollHeight);
            setScrollHeight(wordchainListRef.current.scrollHeight);
          }
        }, 0);
      },
    },
  });
  const { data: activeWordchain } = useGetActiveWordchain({
    onSuccess: () => {
      setTimeout(() => {
        scrollToBottom();
      }, 0);
    },
  });
  const [word, setWord] = useState('');
  const queryClient = useQueryClient();
  const { mutate: mutatePostWord } = usePostWord({
    onSuccess: () => {
      setWord('');
      queryClient.invalidateQueries([wordChainQueryKey.getRecentWordchain]);
    },
    onError: (error) => {
      if (typeof error.response?.data !== 'string') {
        return;
      }
      queryClient.invalidateQueries([wordChainQueryKey.getRecentWordchain]);
      const split = error.response.data.split(' : ');
      if (split.length !== 2) {
        return;
      }
      setError({ isError: true, errorMessage: split[1] });
      const timer = setTimeout(() => {
        setError((prev) => ({ ...prev, isError: false }));
        clearTimeout(timer);
      }, 2000);
    },
  });
  const { isVisible, ref: intersectionObserverTargetRef } = useIntersectionObserver({ root: wordchainListRef.current });
  const [{ isError, errorMessage }, setError] = useState({
    isError: false,
    errorMessage: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!finishedWordchainListPages || word.length < 1 || !activeWordchain) {
      return;
    }
    mutatePostWord(
      { wordchainId: activeWordchain.id, word },
      {
        onSuccess: () => {
          logSubmitEvent('postWordchain', {
            word,
          });
        },
      },
    );
  };

  const handleChange = (value: string) => {
    setWord(value);
  };

  const scrollTo = (height: number) => {
    if (wordchainListRef.current) {
      wordchainListRef.current.scrollTop = height;
    }
  };
  const scrollToBottom = () => {
    if (wordchainListRef.current) {
      scrollTo(wordchainListRef.current.scrollHeight);
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchNextPage();
    }
  }, [isVisible, fetchNextPage]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
      setIsLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeWordchain]);

  return (
    <Container className={className}>
      <WordchainList ref={wordchainListRef}>
        <IntersectionObserverTarget
          ref={intersectionObserverTargetRef}
          isActive={finishedWordchainListPages?.pages[0].hasNext ?? true}
        />
        {finishedWordchainListPages?.pages
          .map((page) => page.wordchainList)
          .flat()
          .reverse()
          .map((wordchain) => (
            <Wordchain isProgress={false} {...wordchain} key={wordchain.order} className='wordchain' />
          ))}
        {activeWordchain && (
          <Wordchain isProgress={true} winnerName={null} {...activeWordchain} className='wordchain' />
        )}
      </WordchainList>
      <Form onSubmit={handleSubmit}>
        <Responsive only='desktop' asChild>
          <StyledInput
            value={word}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='단어를 입력해주세요. (단, 표준국어대사전에 있는 단어만 사용할 수 있어요.)'
            isError={isError}
          />
        </Responsive>
        <Responsive only='mobile' asChild>
          <StyledInput
            value={word}
            onChange={(e) => handleChange(e.target.value)}
            placeholder='단어를 입력해주세요.'
            isError={isError}
          />
        </Responsive>
        <SubmitButton>
          <PaperAirplaneIcon />
        </SubmitButton>
        <ErrorMessage isVisible={isError}>
          {WaringIconSvg}
          {errorMessage}
        </ErrorMessage>
        <Triangle isVisible={isError} />
      </Form>
      <LoadingWrapper isVisible={isLoading}>
        <Loading />
      </LoadingWrapper>
    </Container>
  );
}

const ContainerBase = styled.div`
  border-radius: 30px;
  background-color: ${colors.gray800};
  width: 790px;
  height: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 0;
    width: 100%;
    height: calc(100vh - 245px);
  }
`;

const Container = styled(ContainerBase)`
  position: relative;
  padding: 40px;

  @media ${MOBILE_MEDIA_QUERY} {
    padding: 24px 20px 34px;
  }
`;

const WordchainList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-right: 14px;
  width: 100%;
  height: 348px;
  overflow-y: scroll;

  & > .wordchain {
    position: relative;
  }

  & > .wordchain:not(:last-child)::after {
    position: absolute;
    bottom: -34px;
    left: 0;
    background-color: ${colors.gray700};
    width: 100%;
    height: 1px;
    content: '';
  }

  @media ${MOBILE_MEDIA_QUERY} {
    gap: 38px;
    height: calc(100% - 80px);

    & > .wordchain:not(:last-child)::after {
      bottom: -20px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 32px;
  width: 100%;

  @media ${MOBILE_MEDIA_QUERY} {
    margin-top: 16px;
  }
`;

const StyledInput = styled.input<{ isError: boolean }>`
  transition: border-color 0.5s ease-in;
  border: 1px solid ${({ isError }) => (isError ? colors.error : colors.gray800)};
  border-radius: 14px;
  background-color: ${colors.gray900};
  padding: 24px 20px;
  width: 100%;
  line-height: 120%;
  color: ${colors.gray30};

  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus {
    outline: none;
    border-color: ${({ isError }) => (isError ? colors.error : colors.gray200)};
  }

  @media ${MOBILE_MEDIA_QUERY} {
    border-radius: 10px;
    padding: 16px;

    ${textStyles.SUIT_12_M}
  }
`;

const SubmitButton = styled.button`
  position: absolute;
  right: 24px;
  bottom: 24px;

  @media ${MOBILE_MEDIA_QUERY} {
    right: 16px;
    bottom: 10px;
  }
`;

const IntersectionObserverTarget = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? 'block' : 'none')};
  width: 100%;
  height: 10px;
`;

const ErrorMessage = styled.div<{ isVisible: boolean }>`
  display: flex;
  position: absolute;
  right: 0;
  bottom: -54px;
  gap: 6px;
  align-items: center;
  transition: opacity 0.5s ease-in;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  border-radius: 10px;
  background-color: ${colors.error};
  padding: 10px;
  width: fit-content;
  line-height: 130%;
  color: ${colors.gray10};

  ${textStyles.SUIT_14_M}
`;

const Triangle = styled.div<{ isVisible: boolean }>`
  position: absolute;
  right: 26px;
  bottom: -16px;
  transition: opacity 0.5s ease-in;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  border-right: 8px solid transparent;
  border-bottom: calc(8px * 1.6) solid ${colors.error};
  border-left: 8px solid transparent;
  width: 0;
  height: 0;
`;

const LoadingWrapper = styled(ContainerBase)<{ isVisible: boolean }>`
  display: ${({ isVisible }) => (isVisible ? 'flex' : 'none')};
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;
  justify-content: center;
`;

const WaringIconSvg = (
  <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect width='14' height='14' rx='7' fill='#FCFCFC' />
    <path d='M7.00586 4L7.00586 7' stroke='#D33A3A' stroke-linecap='round' stroke-linejoin='round' />
    <path
      d='M7.00586 10L6.99919 10'
      stroke='#D33A3A'
      stroke-width='1.2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);
