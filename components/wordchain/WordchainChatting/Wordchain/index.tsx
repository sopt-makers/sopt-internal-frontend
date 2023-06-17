import styled from '@emotion/styled';
import TrophyIcon from 'public/icons/icon-trophy.svg';

import StartWordChatMessage from '@/components/wordchain/WordchainChatting/StartWordChatMessage';
import { Word } from '@/components/wordchain/WordchainChatting/types';
import WordChatMessage from '@/components/wordchain/WordchainChatting/WordChatMessage';
import { colors } from '@/styles/colors';
import { textStyles } from '@/styles/typography';

type WordchainProps =
  | {
      isProgress: true;
      count: number;
      start: {
        word: string;
        userName: string;
      };
      wordList: Word[];
      winnerName: null;
      className?: string;
    }
  | {
      isProgress: false;
      count: number;
      start: {
        word: string;
        userName: string;
      };
      wordList: Word[];
      winnerName: string;
      className?: string;
    };

export default function Wordchain({ start, count, wordList, isProgress, winnerName, className }: WordchainProps) {
  return (
    <Container className={className}>
      <InitMessage>
        ‘{start.userName}’님이 {count}번째 끝말잇기를 시작했어요!
      </InitMessage>
      <StartWordChatMessage word='버디버디' />
      <WordChatMessageList>
        {wordList.map(({ user, content }) => (
          <WordChatMessage word={content} user={user} key={`${count}-${content}`} />
        ))}
      </WordChatMessageList>
      {isProgress ? (
        <GiveUpButton> 😅 이어나갈 단어가 떠오르지 않는다면?</GiveUpButton>
      ) : (
        <WinnerMessage>
          <TrophyIconWrapper>
            <TrophyIcon />
          </TrophyIconWrapper>
          {`25번째 우승자는 ‘${winnerName}'님 입니다!`}
        </WinnerMessage>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InitMessage = styled.div`
  margin-top: 10px;
  border-radius: 20px;
  background-color: ${colors.black40};
  padding: 4px 8px;
  width: fit-content;
  line-height: 120%;
  color: ${colors.gray60};

  ${textStyles.SUIT_13_M}
`;

const WordChatMessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
  width: 100%;
`;

const GiveUpButton = styled.button`
  margin-top: 40px;
  text-decoration-line: underline;
  color: ${colors.gray60};

  ${textStyles.SUIT_16_M}
`;

const WinnerMessage = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  line-height: 100%;
  color: ${colors.purple100};

  ${textStyles.SUIT_16_M}
`;

const TrophyIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.purple100};
  width: 20px;
  height: 20px;
`;
